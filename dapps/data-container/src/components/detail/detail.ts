/*
  Copyright (C) 2018-present evan GmbH.

  This program is free software: you can redistribute it and/or modify it
  under the terms of the GNU Affero General Public License, version 3,
  as published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  See the GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program. If not, see http://www.gnu.org/licenses/ or
  write to the Free Software Foundation, Inc., 51 Franklin Street,
  Fifth Floor, Boston, MA, 02110-1301 USA, or download the license from
  the following URL: https://evan.network/license/

  You can be released from the requirements of the GNU Affero General Public
  License by purchasing a commercial license.
  Buying such a license is mandatory as soon as you use this software or parts
  of it on other blockchains than evan.network.

  For more information, please contact evan GmbH at this address:
  https://evan.network/license/
*/

// vue imports
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

// evan.network imports
import { EvanComponent, EvanForm, EvanFormControl } from '@evan.network/ui-vue-core';
import * as bcc from '@evan.network/api-blockchain-core';
import * as dappBrowser from '@evan.network/ui-dapp-browser';
import { Dispatcher, DispatcherInstance } from '@evan.network/ui';

import * as utils from '../../utils';
import * as dispatchers from '../../dispatchers/registry';
import ContainerCache from '../../container-cache';

interface DbcpFormInterface extends EvanForm {
  description: EvanFormControl;
  img: EvanFormControl;
  name: EvanFormControl;
}

@Component({ })
export default class DetailComponent extends mixins(EvanComponent) {
  /**
   * Show loading symbol
   */
  loading = true;

  /**
   * Enable the save button, when anything has changed
   */
  enableSave = false;

  /**
   * show edit for dbcp or schema
   */
  editSchema = true;

  /**
   *   digitalTwin address, where the container should be created for
   */
  digitalTwinAddress = '';

  /**
   * Container instance
   */
  container: bcc.Container;

  /**
   * container description
   */
  description: any;

  /**
   * containers template definition
   */
  template: any;

  /**
   * Watch for updates, so we can enable the save button
   */
  valuesChanged: any;

  /**
   * formular specific variables
   */
  dbcpForm: DbcpFormInterface = null;

  /**
   * Watch for updates and disable current save button
   */
  savingWatcher: Function = null;

  /**
   * Load the container data
   */
  async created() {
    const runtime = utils.getRuntime(this);
    await this.initialize();

    this.valuesChanged = ($event) => this.enableSave = true;
    this.savingWatcher = dispatchers.updateDispatcher.watch(async () => {
      const instances = await dispatchers.updateDispatcher.getInstances(runtime);
      const beforeSaving = this.$store.state.saving;

      this.$store.state.saving = Object.keys(instances)
        .filter(key => instances[key].data.address === (<any>this).dapp.contractAddress)
        .length > 0;

      // reload the data
      if (!this.$store.state.saving && beforeSaving) {
        this.initialize();
      }
    });

    // watch for updates
    window.addEventListener('dt-value-changed', this.valuesChanged);
  }

  /**
   * Clear watchers
   */
  beforeDestroy() {
    window.removeEventListener('dt-value-changed', this.valuesChanged);
  }

  /**
   * Load the container data and setup the dbcp update form.
   */
  async initialize() {
    const runtime = utils.getRuntime(this);
    this.loading = true;

    const splitHash = (<any>this).dapp.baseHash.split('/');
    this.digitalTwinAddress = splitHash
      [splitHash.indexOf(`digitaltwins.${ (<any>this).dapp.domainName }`) + 1];

    this.container = utils.getContainer(<any>runtime, (<any>this).dapp.contractAddress);
    this.description = await this.container.getDescription();
    this.template = await this.container.toTemplate(true);

    // set dbcp form
    this.dbcpForm = (<DbcpFormInterface>new EvanForm(this, {
      name: {
        value: this.description.name,
        validate: function(vueInstance: DetailComponent, form: DbcpFormInterface) {
          vueInstance.enableSave = true;
          return this.value.length !== 0;
        }
      },
      description: {
        value: this.description.description,
        validate: function(vueInstance: DetailComponent, form: DbcpFormInterface) {
          vueInstance.enableSave = true;
          return this.value.length !== 0;
        }
      },
      img: {
        value: '',
      },
    }));

    this.loading = false;
  }

  /**
   * Trigger the digital twin save
   */
  async saveDt() {
    if (!this.$store.state.saving) {
      // hide current schema editor, so the beforeDestroy event is triggered and the data of the
      // opened ajv editor is saved
      this.loading = true;
      this.$store.state.saving = true;

      this.$nextTick(async () => {
        const runtime = utils.getRuntime(this);

        dispatchers.updateDispatcher.start(runtime, {
          address: (<any>this).dapp.contractAddress,
          description: this.dbcpForm.description.value,
          digitalTwinAddress: this.digitalTwinAddress,
          img: this.dbcpForm.img.value,
          name: this.dbcpForm.name.value,
          template: this.template,
        });

        await (new ContainerCache(runtime.activeAccount)).delete((<any>this).dapp.contractAddress);
        this.loading = false;
      });
    }
  }
}
