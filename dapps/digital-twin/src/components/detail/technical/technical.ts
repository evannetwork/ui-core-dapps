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

import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import * as bcc from '@evan.network/api-blockchain-core';
import * as dappBrowser from '@evan.network/ui-dapp-browser';
import { EvanComponent, EvanForm, EvanFormControl } from '@evan.network/ui-vue-core';
import { EvanUIDigitalTwink, utils } from '@evan.network/digitaltwin.lib'

import * as dispatchers from '../../../dispatchers/registy';


@Component({ })
export default class TechnicalComponent extends mixins(EvanComponent) {
  /**
   * Digital twin that should be used for edition
   */
  uiDT = null;

  /**
   * Url of the explorer for the current environment
   */
  explorerUrl = '';

  /**
   * Setup the form.
   */
  async created() {
    const runtime = utils.getRuntime(this);

    this.uiDT = this.$store.state.uiDT;
    // set environment specific variables
    this.explorerUrl = runtime.environment === 'testcore' ?
      'https://testexplorer.evan.network' :
      'https://explorer.evan.network';
  }
}
