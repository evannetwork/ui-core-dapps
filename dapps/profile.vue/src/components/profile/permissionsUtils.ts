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

import { Container } from '@evan.network/api-blockchain-core';

/*
  Helper functions for permission handling.

  TODO:
    - move to class if necessary
    - merge with other permissinos helper functions to one file
    - implement some caching
*/

interface ShareConfigEntry {
  accountId: string;
  readWrite: string[];
  read: string[];
}

/**
 * Simple object clone function.
 *
 * @param obj
 */
const clone = (obj: any) => JSON.parse(JSON.stringify(obj));

/**
 * Get a container from container address.
 *
 * @param runtime
 * @param containerAddress
 * @param accountId
 */
export const getContainer = (runtime, containerAddress, accountId) => {
  return new Container(
    runtime,
    {
      accountId,
      address: containerAddress,
    },
  );
};

/**
 * Extract field names from container properties.
 *
 * @param param0
 * - dataSchema
 * -- properties
 */
const getFields = ({ dataSchema: {properties} }) => {
  if (!properties) {
    return [];
  }

  return Object.keys(properties);
};

/**
 * TODO: docbloc
 *
 * @param param0
 * @param properties
 */
const createPermissionsObject = ({read = [], readWrite = []}, properties: any) => {
  const permissions = {};

  Object.keys(properties).forEach(property => {
    const canWrite = readWrite.includes(property);
    const canRead = canWrite || read.includes(property);
    const fields = getFields(properties[property]);

    permissions[property] = {
      read: canRead,
      readWrite: canWrite,
      fields
    };
  });

  return permissions;
};

/**
 * Get all properties from container.
 *
 * @param Container container
 */
export const getContainerProperties = async (container: Container) => {
  const plugin = await container.toPlugin();

  return plugin.template.properties;
};

/**
 * Converts { permissions } to deny read and readWrite.
 * Keeps the fields values.
 *
 * @param permissions
 * - [property]
 * -- read: boolean
 * -- readWrite: boolean
 * -- fields: string[]
 */
const convertToPristinePermissions = (permissions: any) => {
  Object.keys(permissions).forEach( property => {
    permissions[property].read = false;
    permissions[property].readWrite = false;
  });

  return permissions;
};


/**
 * Clones whole permissions Object and removes all access rights.
 *
 * @param containerPermissionsEntry - Object
 * - permissions
 */
const convertToPristine = (userPermissions) => {
  const pristinePermissions = clone(userPermissions);

  for (const key in pristinePermissions) {
    if (pristinePermissions.hasOwnProperty(key)) {
      if (pristinePermissions[key].hasOwnProperty('permissions')) {
        pristinePermissions[key].permissions = convertToPristinePermissions(pristinePermissions[key].permissions);
      }
    }
  }

  return pristinePermissions;
};

/**
 * Creates permissions mapping based on container properties, sharing configs for each user and the container itself.
 *
 * TODO: caching?
 *
 * @param runtime
 * @param param1
 * @param accountId
 */
const createContainerPermissions = async (runtime, {containerAddress, label}, accountId = runtime.activeAccount) => {
  const container = getContainer(runtime, containerAddress, accountId);
  const properties = await getContainerProperties(container);
  const shareConfigs = await container.getContainerShareConfigs();
  const containerPermissions = {};

  shareConfigs.forEach( (entry: ShareConfigEntry) => {
    containerPermissions[entry.accountId] = {
      [containerAddress]: {
        label,
        permissions: createPermissionsObject(entry, properties)
      }
    };
  });

  // Add pristine permissions map for new users:
  containerPermissions['new'] = convertToPristine(containerPermissions[accountId]);

  return containerPermissions;
};

/**
 * get permissions for own profile
 * @param runtime
 */
export const getProfilePermissionDetails = (runtime, label = 'Profile Data') => {
  const profileAddress = runtime.profile.profileContract.options.address;

  return createContainerPermissions(runtime, { containerAddress: profileAddress, label});
};
