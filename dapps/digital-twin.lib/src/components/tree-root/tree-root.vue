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
  <div class="bg-level-1 border-bottom border-sm"
    v-if="!loading"
    :class="{
      'evan-triangle left': isTreeOpen,
    }">
    <div class="px-3 pt-3">
      <small class="text-muted text-uppercase font-weight-semibold">
        {{ topic | translate }}
      </small>
    </div>

    <div class="d-flex align-items-center px-3 py-4">
      <a
        class="d-flex align-items-center dark-link"
        :class="{ 'active': `${ windowLocation }#${ $route.path }`.indexOf(url) !== -1 }"
        :href="url"
        @click="hideSidebar2()">
        <i
          :class="`${ icon } text-muted mr-2`"
          style="font-size: 17px">
        </i>
        <h6 class="m-0 font-weight-semibold">{{ title }}</h6>
      </a>
      <span class="mx-auto"></span>
      <div class="position-relative d-flex align-items-center">
        <slot name="context-menu"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import DtTreeRootComponent from './tree-root.ts';
  export default DtTreeRootComponent;
</script>
