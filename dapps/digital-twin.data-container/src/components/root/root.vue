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
  <div class="evan theme-evan">
    <evan-dapp-wrapper :routes="[ ]"
      v-on:loggedin="initialize()">
      <template v-slot:header
        v-if="
          $route.path.indexOf(`/digitaltwins.${ dapp.domainName }`) === -1 &&
          $route.path.indexOf(`/digitaltwin.${ dapp.domainName }`) === -1
        ">
        <dt-breadcrumbs></dt-breadcrumbs>
      </template>
      <template v-slot:content>
        <evan-loading v-if="loading"></evan-loading>
        <template v-else>
          <evan-dapp-wrapper-level-2 ref="level2Wrapper"
            v-if="!digitalTwinAddress && !isCreate">
            <template v-slot:content>
              <div style="width: 300px">
                <dt-tree-root
                  :url="`${ dapp.fullUrl }/${ containerAddress }`"
                  :topic="isContainer ?
                    `_digitaltwins.breadcrumbs.datacontainer` :
                    `_digitaltwins.breadcrumbs.plugin`"
                  :title="description ? description.name : ''"
                  :icon="isContainer ?
                    `mdi mdi-note-multiple-outline`:
                    `mdi mdi-note-multiple-outline`
                  "
                  @rightClick="$refs.contextMenu.showDropdown($event)">
                  <template v-slot:context-menu>
                    <dc-actions
                      ref="contextMenu"
                      v-if="isContainer"
                      :containerAddress="containerAddress"
                      :digitalTwinAddress="digitalTwinAddress"
                      :displayMode="'dropdownIcon'"
                      :dcActions="true"
                      :setActions="true">
                    </dc-actions>
                    <dc-plugin-actions
                      ref="contextMenu"
                      v-else
                      :pluginName="containerAddress"
                      :pluginActions="true"
                      :setActions="true"
                      :displayMode="'dropdownIcon'">
                    </dc-plugin-actions>
                  </template>
                </dt-tree-root>

                <div class="border-bottom border-sm">
                  <dc-tree
                    :containerAddress="containerAddress"
                    :description="description"
                    :dcUrl="`${ dapp.fullUrl }/${ containerAddress }`"
                    :onlySets="true">
                  </dc-tree>
                </div>
              </div>
            </template>
          </evan-dapp-wrapper-level-2>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </template>
      </template>
    </evan-dapp-wrapper>
  </div>
</template>

<script lang="ts">
  import RootComponent from './root.ts';
  export default RootComponent;
</script>

