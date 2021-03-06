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
  <div class="table-scroll-container">
    <table id="ajv-table" class="evan-table no-wrap w-100">
      <thead>
        <tr class="text-muted">
          <th style="min-width: 200px">
            {{ '_datacontainer.ajv.name.title' | translate }}
          </th>
          <th style="min-width: 200px">
            {{ '_datacontainer.ajv.type.title' | translate }}
          </th>
          <th style="min-width: 200px" v-if="!disableValue">
            {{ '_datacontainer.ajv.value.title' | translate }}
          </th>
          <th style="min-width: 200px">
            {{ '_datacontainer.ajv.min.title' | translate }}
          </th>
          <th style="min-width: 200px">
            {{ '_datacontainer.ajv.max.title' | translate }}
          </th>
          <th v-if="mode === 'schema'">
            <i class="mdi mdi-delete clickable opacity-0"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(form, index) in forms">
          <td
            :id="`ajv-name-${ index }`"
            class="fill-content">
            <span class="font-weight-semibold" v-if="mode !== 'schema'">
              {{ form.name.value }}
            </span>
            <span v-else>
              <div class="form-group mb-0">
                <input class="form-control" required
                  ref="name"
                  v-model="form.name.value"
                  :placeholder="`_datacontainer.ajv.name.desc` | translate"
                  :disabled="$store.state.saving || mode !== 'schema'"
                  :class="{ 'is-invalid' : form.name._error }"
                  @blur="form.name.setDirty()">
                <div class="invalid-feedback">
                  {{ form.name.error | translate }}
                </div>
              </div>
            </span>
          </td>
          <td :id="`ajv-type-${ index }`">
            <div class="form-group mb-0">
              <span v-if="mode !== 'schema'">
                {{ `_datacontainer.types.${ form.type.value }` | translate }}
              </span>
              <select class="form-control custom-select"
                v-else
                ref="type"
                v-model="form.type.value"
                :placeholder="`_datacontainer.ajv.type.desc` | translate"
                :disabled="$store.state.saving || mode !== 'schema'"
                :class="{ 'is-invalid' : form.type._error }"
                @blur="form.type.setDirty()">
                <option
                  v-for="(fieldType, index) in fieldTypes"
                  :value="fieldType">
                  {{ `_datacontainer.types.${ fieldType }` | translate }}
                </option>
              </select>
            </div>
          </td>
          <td 
            :id="`ajv-value-${ index }`"
            class="fill-content"
            v-if="!disableValue">
            <div v-if="form.type.value === 'files'">
              {{ `_datacontainer.ajv.files-no-default` | translate }}
            </div>
            <dc-field
              v-else
              :id="`dc-field-${ index }`"
              :type="form.type.value"
              :control="form.value"
              :mode="mode"
              :standalone="false">
            </dc-field>
          </td>

          <template v-if="
            form.type.value === 'files' ||
            form.type.value === 'string' ||
            form.type.value === 'number'
          ">
            <td
              :id="`ajv-min-${ index }`"
              class="fill-content">
              <span v-if="mode !== 'schema'">
                {{ getMinMaxValue(form, 'min') }}
              </span>
              <div class="form-group mb-0" v-else>
                <input class="form-control" type="number"
                  ref="min"
                  v-model="form.min.value"
                  :class="{ 'is-invalid' : form.min._error }"
                  :disabled="$store.state.saving || mode !== 'schema'"
                  :placeholder="`_datacontainer.ajv.min.desc` | translate"
                  @blur="form.min.setDirty()">
                <div class="invalid-feedback">
                  {{ `_datacontainer.ajv.min.error` | translate }}
                </div>
              </div>
            </td>
            <td
              :id="`ajv-max-${ index }`"
              class="fill-content">
              <span v-if="mode !== 'schema'">
                {{ getMinMaxValue(form, 'max') }}
              </span>
              <div class="form-group mb-0" v-else>
                <input class="form-control" type="number"
                  ref="max"
                  v-model="form.max.value"
                  :class="{ 'is-invalid' : form.max.error }"
                  :disabled="$store.state.saving || mode !== 'schema'"
                  :placeholder="`_datacontainer.ajv.max.desc` | translate"
                  @blur="form.max.setDirty()">
                <div class="invalid-feedback">
                  {{ `_datacontainer.ajv.max.error` | translate }}
                </div>
              </div>
            </td>
          </template>
          <template v-else>
            <td class="fill-content"></td>
            <td class="fill-content"></td>
          </template>
          <td v-if="mode === 'schema'">
            <i
              id="ajv-remove-field"
              class="mdi mdi-delete clickable"
              :disabled="$store.state.saving"
              @click="!$store.state.saving && removeProperty(form)">
            </i>
          </td>
        </tr>
        <!-- add empty row that watches on click events for adding new entries -->
        <tr
          id="ajv-add-field"
          class="clickable"
          v-if="mode === 'schema'"
          @click="!$store.state.saving && addProperty('')">
          <td class="fill-content">
            <div class="form-group mb-0 position-relative">
              <div class="ajv-add-overlay"></div>
              <input class="form-control bg-level-1"
                disabled
                :placeholder="`_datacontainer.ajv.name.desc` | translate">
            </div>
          </td>
          <td class="fill-content">
            <div class="form-group mb-0 position-relative">
              <div class="ajv-add-overlay"></div>
              <select class="form-control custom-select bg-level-1" disabled
                :placeholder="`_datacontainer.ajv.type.desc` | translate">
                <option>
                  {{ `_datacontainer.types.string` | translate }}
                </option>
              </select>
            </div>
          </td>
          <td class="fill-content"
            v-if="!disableValue">
            <div class="position-relative">
              <div class="ajv-add-overlay"></div>
              <input class="form-control bg-level-1"
                type="text" disabled
                :placeholder="`_datacontainer.ajv.value.desc` | translate">
            </div>
          </td>
          <td class="fill-content">
            <div class="form-group mb-0 position-relative">
              <div class="ajv-add-overlay"></div>
              <input class="form-control" type="number" ref="max" disabled>
            </div>
          </td>
          <td class="fill-content">
            <div class="form-group mb-0 position-relative">
              <div class="ajv-add-overlay"></div>
              <input class="form-control" type="number" ref="max" disabled>
            </div>
          </td>
          <td>
            <i class="mdi mdi-delete clickable opacity-0"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import Component from './ajv.ts';
  export default Component;
</script>

<style lang="scss" scoped>
  @import './ajv.scss';
</style>
