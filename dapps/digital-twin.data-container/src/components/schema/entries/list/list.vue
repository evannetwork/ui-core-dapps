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
    <div
      id="entry-schema"
      v-if="itemType === 'object'">
      <dc-ajv-values
        v-if="!schemaEdit"
        :address="address"
        :mode="activeMode"
        :properties="entry.edit.dataSchema.properties"
        :value="entry.edit.value"
        @init="$set(reactiveRefs, 'ajv', $event)">
      </dc-ajv-values>
      <dc-ajv
        v-else
        :address="address"
        :mode="activeMode"
        :properties="entry.edit.dataSchema.items.properties"
        @init="$set(reactiveRefs, 'ajv', $event)">
      </dc-ajv>
    </div>
    <dc-entry-field
      v-else
      ref="entryComp"
      :activeMode="activeMode"
      :address="address"
      :entry="entry"
      :entryName="entryName"
      @init="$set(reactiveRefs, 'ajv', $event)">
    </dc-entry-field>
<!-- <h5 class="font-weight-semibold">
        {{ '_datacontainer.types.array' | translate }} - {{ '_datacontainer.ajv.type.title' | translate }}:
        {{ `_datacontainer.types.${ itemType }` | translate }}
      </h5> -->
  </div>
</template>

<script lang="ts">
  import Component from './list.ts';
  export default Component;
</script>
