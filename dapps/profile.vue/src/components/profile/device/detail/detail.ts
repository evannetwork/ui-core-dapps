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
*/

// vue imports
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

// evan.network imports
import { EvanComponent, EvanForm, EvanFormControl } from '@evan.network/ui-vue-core';
import * as bcc from '@evan.network/api-blockchain-core';
import * as dappBrowser from '@evan.network/ui-dapp-browser';
import { FileHandler, } from '@evan.network/ui';

// internal
import * as dispatchers from '../../../../dispatchers/registry';
import ProfileMigrationLibrary from '../../../../lib/profileMigration';

interface DeviceDetailFormInterface extends EvanForm {
  dataStreamSettings: EvanFormControl;
  location: EvanFormControl;
  manufacturer: EvanFormControl;
  owner: EvanFormControl;
  serialNumber: EvanFormControl;
  settings: EvanFormControl;
  type: EvanFormControl;
}

@Component({ })
export default class DeviceDetailForm extends mixins(EvanComponent) {
  /**
   * Address for that the data should be loaded
   */
  @Prop() address;

  /**
   * Evan form instance for device details data.
   */
  deviceDetailForm: DeviceDetailFormInterface = null;

  /**
   * Load the mail details
   */
  async created() {
    // load profile data
    await this.loadProfileData();
  }

  /**
   * Load the profile data an specify the registration form.
   */
  async loadProfileData() {
    const deviceData = this.$store.state.profileDApp.data.registration || {};

    // setup registration form
    this.deviceDetailForm = (<DeviceDetailFormInterface>new EvanForm(this, {
      dataStreamSettings: {
        value: deviceData.dataStreamSettings || '',
        validate: function(vueInstance: DeviceDetailForm, form: DeviceDetailFormInterface) {
          return this.value.length !== 0;
        },
      },
      location: {
        value: deviceData.location || '',
        validate: function(vueInstance: DeviceDetailForm, form: DeviceDetailFormInterface) {
          return this.value.length !== 0;
        },
      },
      manufacturer: {
        value: deviceData.manufacturer || '',
        validate: function(vueInstance: DeviceDetailForm, form: DeviceDetailFormInterface) {
          return this.value.length !== 0;
        },
      },
      owner: {
        value: deviceData.owner || '',
        validate: function(vueInstance: DeviceDetailForm, form: DeviceDetailFormInterface) {
          return this.value.length === 0 || EvanForm.validEthAddress(this.value);
        },
      },
      serialNumber: {
        value: deviceData.serialNumber || '',
        validate: function(vueInstance: DeviceDetailForm, form: DeviceDetailFormInterface) {
          return this.value.length !== 0;
        },
      },
      settings: {
        value: deviceData.settings ? deviceData.settings.files || deviceData.settings : [ ],
        uiSpecs: { type: 'files' }
      },
      type: {
        value: deviceData.type ? deviceData.type.files || deviceData.type : [ ],
        uiSpecs: { type: 'files' }
      },
    }));
  }

  async changeProfileData() {
    const formData = this.deviceDetailForm.getFormData();
    // set correct file format
    formData.settings = { files: formData.settings };
    formData.type = { files: formData.type };

    dispatchers.updateProfileDispatcher.start((<any>this).getRuntime(), {
      address: this.$store.state.profileDApp.address,
      formData: formData,
      type: 'deviceDetails'
    });
  }
}
