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
import { EvanComponent } from '@evan.network/ui-vue-core';
import * as bcc from '@evan.network/api-blockchain-core';
import * as dappBrowser from '@evan.network/ui-dapp-browser';

import { getOrganization } from '../../organizations';

@Component({ })
export default class DetailComponent extends mixins(EvanComponent) {
  /**
   * ui status flags
   */
  loading = true;

  /**
   * all categories for the left panel
   */
  categories = [
    {
      title: '_org.ident.categories.identifications',
      route: 'identifications',
      icon: 'mdi mdi-account-card-details-outline',
      isOpen: true,
      children: [
        {
          title: '_org.ident.categories.notary',
          route: 'notary',
          icon: 'mdi mdi-account-key-outline'
        }
      ]
    }
  ];

  async created() {
    // load the organizations
    const runtime = (<any>this).getRuntime();
    const address = this.$route.params.address;

    // set organization to global scope, the it can be accesd by sub routes components
    this.$store.state.organization = await getOrganization(runtime, address);

    // add custom translation
    const customTranslation = { };
    customTranslation[`_org.breadcrumbs.${ address }`] = this.$store.state.organization.alias;
    (<any>this).$i18n.add((<any>this).$i18n.locale(), customTranslation);

    this.loading = false;
  }

  /**
   * Sends the hide sidebar event.
   */
  hideSidebar2() {
    window.dispatchEvent(new CustomEvent('dapp-wrapper-sidebar-close'));
  }
}
