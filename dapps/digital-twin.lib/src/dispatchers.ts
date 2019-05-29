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

import * as dappBrowser from '@evan.network/ui-dapp-browser';
import * as bcc from '@evan.network/api-blockchain-core';
import { EvanComponent, EvanForm, EvanFormControl } from '@evan.network/ui-vue-core';
import { Dispatcher, DispatcherInstance } from '@evan.network/ui';

/**
 * This dispatchers are only created for watching and not for starting them! They are orignally
 * defined, within the digital-twin / digital-twin.data-container dapp
 */
const dtDomain = `digitaltwin.${ dappBrowser.getDomainName() }`;
const dcDomain = `datacontainer.digitaltwin.${ dappBrowser.getDomainName() }`;
const dispatchers = {
  dt: {
    'digitaltwinCreateDispatcher': new Dispatcher(dtDomain, 'digitaltwinCreateDispatcher', 0),
    'digitaltwinSaveDispatcher': new Dispatcher(dtDomain, 'digitaltwinSaveDispatcher', 0),
    'favoriteAddDispatcher': new Dispatcher(dtDomain, 'favoriteAddDispatcher', 0),
    'favoriteRemoveDispatcher': new Dispatcher(dtDomain, 'favoriteRemoveDispatcher', 0),
  },
  dc: {
    'createDispatcher': new Dispatcher(dcDomain, 'createDispatcher', 0),
    'linkDispatcher': new Dispatcher(dcDomain, 'linkDispatcher', 0),
    'pluginShareDispatcher': new Dispatcher(dcDomain, 'pluginShareDispatcher', 0),
    'pluginDispatcher': new Dispatcher(dcDomain, 'pluginDispatcher', 0),
    'updateDispatcher': new Dispatcher(dcDomain, 'updateDispatcher', 0),
    'shareDispatcher': new Dispatcher(dcDomain, 'shareDispatcher', 0),
  }
};


export default dispatchers;
