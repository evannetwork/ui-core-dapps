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
    <evan-loading v-if="loading"></evan-loading>
    <div class="container-wide"
      v-else-if="error">
      <div class="white-box border-smooth rounded">
        <div class="header">
          <h3 class="m-0 font-weight-semibold">
            {{ '_datacontainer.no-permissions.title' | translate }}
          </h3>
        </div>
        <p class="content"
          v-html="$t('_datacontainer.no-permissions.desc')">
        </p>
      </div>
    </div>
    <template v-else>
      <evan-nav-tabs class="flex-shrink-0"
        :tabs="tabs"
        @init="$set(reactiveRefs, 'navTabs', $event)">
      </evan-nav-tabs>
      <div class="container-wide overflow-y-auto flex-grow-1">
        <div class="d-flex mb-5 align-items-center" height="45px">
          <div style="width: 50%;">
            <h3 class="font-weight-bold mb-0 force-oneline bg-level-3">
              {{ description.description }}
            </h3>
          </div>
          <span class="mx-auto"></span>
          <dc-actions
            v-if="reactiveRefs.navTabs"
            :containerAddress="containerAddress"
            :digitalTwinAddress="digitalTwinAddress"
            :dcActions="true"
            :setActions="reactiveRefs.navTabs.activeTab === 0">
          </dc-actions>
        </div>

        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import Component from './container.ts';
  export default Component;
</script>
