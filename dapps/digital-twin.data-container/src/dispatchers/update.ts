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
import { Dispatcher, DispatcherInstance, deepEqual } from '@evan.network/ui';

import * as utils from '../utils';

const dispatcher = new Dispatcher(
  `datacontainer.digitaltwin.${ dappBrowser.getDomainName() }`,
  'updateDispatcher',
  40 * 1000,
  '_datacontainer.dispatcher.update'
);

dispatcher
  .startup(async (instance: DispatcherInstance, data: any) => {
    const runtime = utils.getRuntime(instance.runtime);
    const container = utils.getContainer(runtime, data.address);
    const entryChanges = await utils.getEntryChanges(runtime, data.address, data.template);

    // analyse data and check, which data fields must be saved
    data.saveDescription = entryChanges.saveDescription;
    data.entriesToSave = entryChanges.entriesToSave;
    data.toShare = entryChanges.toShare;
  })

  // update description
  .step(async (instance: DispatcherInstance, data: any) => {
    const runtime = utils.getRuntime(instance.runtime);
    const container = utils.getContainer(runtime, data.address);
    const description = await container.getDescription();

    // check for changed data
    if (data.saveDescription ||
        description.name !== data.name ||
        description.description !== data.description ||
        description.imgSquare !== data.img) {
      // set dbcp values
      description.name = data.name;
      description.description = data.description;
      description.imgSquare = data.img;

      // don't forget to update the template schema
      description.dataSchema = { };
      Object.keys(data.template.properties).forEach(property =>
        description.dataSchema[property] = data.template.properties[property].dataSchema
      );

      await container.setDescription(description);
    }
  })

  // update entries
  .step(async (instance: DispatcherInstance, data: any) => {
    const runtime = utils.getRuntime(instance.runtime);
    const container = utils.getContainer(runtime, data.address);

    // copy the entries to save, so the iteration will not be affected by removing entries to save
    // from the data object => entries will be removed and the data will be persisted, after the
    // synchronization of this entry was saved successfull, so the user won't do this twice
    const entriesToSave = JSON.parse(JSON.stringify(data.entriesToSave));
    await Promise.all(entriesToSave.map(async (entryKey: string, index: number) => {
      if (data.template.properties[entryKey].type === 'list') {
        await container.addListEntries(entryKey, data.template.properties[entryKey].value);
      } else {
        await container.setEntry(entryKey, data.template.properties[entryKey].value);
      }

      // remove the list entry and persist the state into the indexeddb
      data.entriesToSave.splice(index, 1);
      await instance.save();
    }));
  });

export default dispatcher;