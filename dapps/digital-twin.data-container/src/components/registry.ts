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

// import evan libs
import { ComponentRegistrationInterface } from '@evan.network/ui-vue-core';

import AJVComponent from './ajv/ajv.vue';
import EntryComponent from './entries/entry/entry.vue';
import EntryListComponent from './entries/list/list.vue';
import EntryObjectComponent from './entries/object/object.vue';
import FieldComponent from './entries/field/field.vue';
import FieldFilesComponent from './fields/files/files.vue';
import FieldImagesComponent from './fields/images/images.vue';
import FieldNumberComponent from './fields/number/number.vue';
import FieldStringComponent from './fields/string/string.vue';
import TemplateHandlerComponent from './template-handler/template-handler.vue';

// export them all, so other applications can access them
export { }

// map them to element names, so they can be used within templates
const componentRegistration: Array<ComponentRegistrationInterface> = [
  { name: 'dc-ajv', component: AJVComponent },
  { name: 'dc-entry', component: EntryComponent },
  { name: 'dc-entry-list', component: EntryListComponent },
  { name: 'dc-entry-object', component: EntryObjectComponent },
  { name: 'dc-entry-field', component: FieldComponent },
  { name: 'dc-field-files', component: FieldFilesComponent },
  { name: 'dc-field-images', component: FieldImagesComponent },
  { name: 'dc-field-number', component: FieldNumberComponent },
  { name: 'dc-field-string', component: FieldStringComponent },
  { name: 'dc-template-handler', component: TemplateHandlerComponent },
];

export default componentRegistration;
