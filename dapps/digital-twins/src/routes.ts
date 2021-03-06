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
// import evan libs
import { RouteRegistrationInterface } from '@evan.network/ui-vue-core';
import * as dappBrowser from '@evan.network/ui-dapp-browser';

import TwinsComponent from './components/twins/twins.vue';
import PluginsComponent from './components/plugins/plugins.vue';
import ContainersComponent from './components/containers/containers.vue';

import { EnsOpenComponent } from '@evan.network/digitaltwin';

// map them to element names, so they can be used within plugins
/* tslint:disable */
const routeRegistration: Array<RouteRegistrationInterface> = [
  { path: '', redirect: { path: 'my-twins' }  },
  { name: 'base-twins',    component: TwinsComponent,     path: 'my-twins', },
  { name: 'base-plugins',  component: PluginsComponent,   path: 'my-plugins', },
  { name: 'dt-open',       component: EnsOpenComponent,   path: `open`, },
];
/* tslint:enable */

export default routeRegistration;

