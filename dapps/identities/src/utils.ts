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

export const latestIdentitiesKey = 'evan-last-digital-identities';

/**
 * Return the last opened identities that were persited in the localStorage.
 */
export function getLastOpenedIdentities() {
  return JSON.parse(window.localStorage[latestIdentitiesKey] || '[ ]');
}

/**
 * Copies and returns a runtime with the correct nameresolver for payable stuff.
 *
 * @param      {any}  runtime  vue instance or runtime
 */
export function getRuntime(runtime: any): bcc.Runtime {
  runtime = runtime.getRuntime ? runtime.getRuntime() : runtime;

  const nameResolverConfig = JSON.parse(JSON.stringify(dappBrowser.config.nameResolver));
  // set the custom ens contract address
  nameResolverConfig.ensAddress = '0xaeF6Cc6D8048fD1fbb443B32df8F00A07FA55224';
  nameResolverConfig.ensResolver = '0xfC382415126EB7b78C5c600B06f7111a117948F4';

  // copy runtime and set the nameResolver
  const runtimeCopy = Object.assign({ }, runtime);
  runtimeCopy.nameResolver = new bcc.NameResolver({
    config: nameResolverConfig,
    contractLoader: runtime.contractLoader,
    executor: runtime.executor,
    web3: runtime.web3,
  });

  return runtimeCopy;
}

/**
 * Returns the active domain name (currently payable, until the nameresolve is fixed)
 *
 * @return     {string}  domain name (default evan)
 */
export function getDomainName(): string {
  return 'payable' || dappBrowser.getDomainName();
}

/**
 * Returns a minimal dbcp description set.
 */
export async function getIdentityBaseDbcp(): Promise<any> {
  const identityDbcp = await dappBrowser.System
    .import(`identities.${ dappBrowser.getDomainName() }!ens`);

  return {
    author: '',
    dapp: identityDbcp.dapp,
    dbcpVersion: 2,
    description: '',
    name: '',
    version: '1.0.0',
  };
}
