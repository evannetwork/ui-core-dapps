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
  <!-- pull it one em to the right, within the buttons view, the last button will have also a mr-3 -->
  <div
    :style="displayMode === 'buttons' ? 'margin-right: -1em' : ''">
    <!-- show dropdown button  -->
    <button class="btn btn-icon"
      v-if="displayMode === 'dropdownButton'"
      id="datacontainer-context-menu-open"
      @click="showDropdown($event)">
      <i class="mdi mdi-dots-vertical clickable text-dark"></i>
    </button>

    <i class="mdi mdi-dots-vertical clickable text-dark"
      id="datacontainer-context-menu-open"
      v-if="displayMode === 'dropdownIcon'"
      @click="showDropdown($event)">
    </i>

    <!-- show dropdown or only dropdown content -->
    <div class="position-relative">
      <evan-dropdown
        id="datacontainer-context-menu"
        ref="dtContextMenu"
        :alignment="'right'"
        :class="{ 'd-flex align-items-center': displayMode === 'buttons' }"
        :width="'300px'"
        :renderOnlyContent="displayMode === 'buttons'">
        <template v-slot:content>
          <div class="text-center p-3" v-if="loading">
            <div class="spinner-border spinner-border-sm text-light mr-3"></div>
          </div>
          <p class="text-center p-3 mb-0" v-else-if="error"
            v-html="$t('_datacontainer.no-permissions.desc')">
          </p>
          <template v-else-if="plugin">
            <template v-if="dcActions">
              <button
                :class="buttonClasses.tertiar"
                v-if="isOwner"
                id="container-dbcp-edit"
                @click="reactiveRefs.dbcpModal.show(); closeDropdown();">
                <div class="spinner-border spinner-border-sm"
                  v-if="saving">
                </div>
                <i class="mdi mdi-pencil" v-else></i>
                <component :is="buttonTextComp" :placement="'bottom'">
                  {{ `_datacontainer.edit-dbcp` | translate }}
                </component>
              </button>
              <button :class="buttonClasses.tertiar"
                id="container-share"
                v-if="displayMode !== 'buttons'"
                @click="evanNavigate(`digitaltwins.${ dapp.domainName }${ digitalTwinAddress ? ('/digitaltwin.' + dapp.domainName + '/' + digitalTwinAddress) : '' }/datacontainer.digitaltwin.evan/${ containerAddress }/dc-permissions`, dapp.rootEns); closeDropdown();">
                <div class="spinner-border spinner-border-sm"
                  v-if="sharing">
                </div>
                <i class="mdi mdi-share-variant" v-else></i>
                <component :is="buttonTextComp" :placement="'bottom'">
                  {{ `_datacontainer.context-menu.share` | translate }}
                </component>
              </button>
              <button :class="buttonClasses.tertiar"
                id="container-container-link"
                @click="reactiveRefs.dtContainerLink.$refs.containerLinkModal.show(); closeDropdown();">
                <i class="mdi mdi-link-variant"></i>
                <component :is="buttonTextComp" :placement="'bottom'">
                  {{ `_datacontainer.context-menu.link` | translate }}
                </component>
              </button>
              <a :class="buttonClasses.tertiar"
                id="container-clone"
                @click="reactiveRefs.dcClone.showModal(); closeDropdown();">
                <i class="mdi mdi-content-copy"></i>
                <component :is="buttonTextComp" :placement="'bottom'">
                  {{ `_datacontainer.context-menu.clone` | translate }}
                </component>
              </a>
              <a :class="buttonClasses.tertiar"
                id="container-plugin-create"
                @click="reactiveRefs.saveAsPlugin.showModal(); closeDropdown();">
                <i class="mdi mdi-content-duplicate"></i>
                <component :is="buttonTextComp" :placement="'bottom'">
                  {{ `_datacontainer.context-menu.plugin-save` | translate }}
                </component>
              </a>
            </template>
            <template v-if="setActions">
              <a
                id="dc-container-add"
                v-if="isOwner && !containerAddress.startsWith('0x')"
                :class="buttonClasses.primary"
                @click="reactiveRefs.dcNewEntry.showModal(); closeDropdown();">
                <i class="mdi mdi-plus"></i>
                <component :is="buttonTextComp" :placement="'bottom'">
                  {{ `_digitaltwins.breadcrumbs.dc-sets-add` | translate }}
                </component>
              </a>
            </template>
          </template>
        </template>
      </evan-dropdown>
    </div>
    <!-------------------------- actions section -------------------------->
    <template v-if="plugin && !loading">
      <evan-modal
        id="container-dbcp-modal"
        @init="$set(reactiveRefs, 'dbcpModal', $event)">
        <template v-slot:header>
          <h5 class="modal-title">
            {{ '_datacontainer.edit-dbcp' | translate }}
          </h5>
        </template>
        <template v-slot:body>
          <dt-dbcp
            :dbcp="plugin.description"
            :disabled="saving"
            @init="$set(reactiveRefs, 'dbcpForm', $event._form)"
            @submit="saveDbcp()">
          </dt-dbcp>
        </template>
        <template v-slot:footer>
          <button type="submit"
            id="container-dbcp-save"
            class="btn  btn-primary"
            v-if="reactiveRefs.dbcpForm"
            :disabled="saving || !reactiveRefs.dbcpForm.isValid"
            @click="saveDbcp()">
            {{ `_datacontainer.save-dbcp` | translate }}
            <div class="spinner-border spinner-border-sm ml-3"
              v-if="saving">
            </div>
            <i class="mdi mdi-arrow-right label" v-else></i>
          </button>
        </template>
      </evan-modal>
      <dc-link
        :containerAddress="containerAddress"
        :digitalTwinAddress="digitalTwinAddress"
        @init="$set(reactiveRefs, 'dtContainerLink', $event)">
      </dc-link>
      <dc-new-entry
        :template="plugin.template"
        @init="$set(reactiveRefs, 'dcNewEntry', $event)"
        @submit="addNewEntry($event)">
      </dc-new-entry>
      <dc-create
        :cloneAddress="containerAddress"
        :digitalTwinAddress="digitalTwinAddress"
        @init="$set(reactiveRefs, 'dcClone', $event)">
      </dc-create>
      <dc-create
        :mode="'plugin'"
        :cloneAddress="containerAddress"
        @init="$set(reactiveRefs, 'saveAsPlugin', $event)">
      </dc-create>
    </template>
  </div>
</template>

<script lang="ts">
  import Component from './container-actions.ts';
  export default Component;
</script>
