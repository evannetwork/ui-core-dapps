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
  <div class="mx-auto m-0">
    <div class="mt-5 mb-3 text-center">
      <br>
      <h1 class="mt-4 font-weight-semibold">{{ '_dashboard.startup' | translate }}</h1>
      <h3 class="mt-4 font-weight-semibold text-muted">{{ '_evan.welcome-to-evan' | translate }}</h3>
      <div class="bg-primary d-inline-block" style="width: 70px; height: 5px;"></div>
      <br>
    </div>
    <div class="d-md-flex flex-wrap justify-content-center p-0 p-xs-3">
      <a class="
        d-block position-relative
        p-3 col-lg-12 col-xl-3
        m-md-3 mb-3 p-4
        text-center
        bg-level-1 border evan-highlight"
        v-for="(type, index) in dashboardEntries"
        style="min-width: 250px"
        :class="type.class ? type.class : ''"
        :href="type.fullPath ? type.fullPath : `${ dapp.fullUrl }/${ type.path }`">
        <div id="evan-testnet"
          style="position: absolute; top: 0;"
          v-if="type.title === 'testcore'">
          TESTCORE
        </div>
        <img class="my-5" style="height: 120px"
          :src="`${ $store.state.uiBaseUrl }/assets/${ type.img }`"
          v-if="type.img">
        <i
          v-else
          :class="type.icon">
        </i>

        <h3 class="highlight font-weight-semibold mb-3 text-dark"
          style="color: var(--evan-dark) !important">
          {{ `_dashboard.overview.${ type.title }.title` | translate }}
        </h3>
        <span class="text-muted highlight font-weight-semibold d-inline-block"
          style="max-width: 250px;"
          v-html="$t(`_dashboard.overview.${ type.title }.desc`)">
        </span>
      </a>
    </div>
    <evan-modal ref="recoveryModal">
      <template v-slot:header>
        <h5 class="modal-title">
          {{ `_dashboard.overview.recovery.title` | translate }}
        </h5>
      </template>
      <template v-slot:body>
        <p class="text-left m-0"
          v-html="$t(`_dashboard.overview.recovery.desc`, modalParams)">
        </p>
      </template>
      <template v-slot:footer>
        <button type="button" class="btn btn-primary  font-weight-normal"
          @click="recoverUrl()">
          {{ `_dashboard.overview.recovery.action` | translate }}
        </button>
      </template>
    </evan-modal>
  </div>
</template>

<script lang="ts">
  import OverviewComponent from './overview.ts';
  export default OverviewComponent;
</script>
