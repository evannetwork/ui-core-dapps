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

<template>
  <div>
    <evan-loading v-if="loading || initializing"></evan-loading>
    <div class="white-box border-smooth rounded"
      v-else-if="error">
      <div class="header">
        <h3 class="m-0 font-weight-semibold">
          {{ '_datacontainer.no-permissions.title' | translate }}
        </h3>
      </div>
      <p class="content"
        v-html="$t('_datacontainer.no-permissions.desc')">
      </p>
    </div>
    <template v-else>
      <div class="white-box border-smooth rounded">
        <dc-entry
          :address="containerAddress"
          :entry="templateEntry"
          :entryName="entryName"
          :permissions="permissions"
          :schemaEdit="$route.name !== 'entry-values'"
          :mode="$route.name === 'entry-schema' && containerAddress.startsWith('0x') ? 'view' : 'schema'"
          @init="$set(reactiveRefs, 'entryComp', $event)">
        </dc-entry>
        
        <div class="footer text-right"
          v-if="
            reactiveRefs.entryComp && permissions.readWrite.indexOf(entryName) !== -1 && (
              ($route.name === 'entry-values' && containerAddress.startsWith('0x')) ||
              ($route.name === 'entry-schema' && !containerAddress.startsWith('0x'))
            )
          ">
          <button
            class="btn  btn-primary"
            id="schema-save"
            :disabled="!reactiveRefs.entryComp.isValid() || saving"
            @click="saveEntry()">
            {{ `_datacontainer.ajv.save.save` | translate }}
            <div class="spinner-border spinner-border-sm text-light ml-3"
              v-if="saving">
            </div>
            <i class="mdi mdi-arrow-right label ml-3" v-else></i>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import Component from './schema.ts';
  export default Component;
</script>
