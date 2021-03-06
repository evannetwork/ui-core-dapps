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
    <evan-dapp-wrapper
      :routes="[ ]"
      v-on:loggedin="loadContacts()">
      <template v-slot:content>
        <evan-loading v-if="loading"></evan-loading>
        <div class="container-wide overflow-y-auto flex-grow-1"
          v-else>
          <contact-add
            ref="contactAddModal">
          </contact-add>
          <contact-detail
            ref="contactDetailModal">
          </contact-detail>
          <div class="d-flex mb-5 align-items-center">
            <div style="width: calc(100% - 200px)">
              <h3 class="font-weight-bold mb-0 force-oneline bg-level-3">
                {{ '_addressbook.addressbook-desc' | translate }}
              </h3>
              <span>
                {{ '_addressbook.addressbook-desc-long' | translate }}
              </span>
            </div>
            <span class="mx-auto"></span>
            <button type="button" class="btn btn-primary "
              @click="$refs.contactAddModal.show();">
              {{ `_addressbook.add` | translate }}
              <i class="mdi mdi-arrow-right label ml-3"></i>
            </button>
          </div>
          <div class="white-box border-smooth rounded"
            v-if="Object.keys(categories).length === 0">
            <div class="header">
              <h3 class="m-0 font-weight-semibold">
                {{ '_addressbook.no-contacts.title' | translate }}
              </h3>
            </div>
            <div class="content">
              <p v-html="$t('_addressbook.no-contacts.desc')"></p>

              <div class="text-center mt-3">
                <button type="button" class="btn btn-primary "
                  @click="$refs.contactAddModal.show();">
                  {{ '_addressbook.contact-form.submit' | translate }}
                  <i class="mdi mdi-arrow-right label ml-3"></i>
                </button>
              </div>
            </div>
          </div>
          <template v-else>
            <div class="white-box border-smooth rounded mt-3"
              v-for="(category, index) in Object.keys(categories).sort()"
              v-bind:key="index"
            >
              <div class="header">
                <h3 class="m-0 font-weight-semibold text-uppercase">
                 {{ category }}
                </h3>
              </div>
              <div class="table-scroll-container">
                <table class="evan-table no-wrap hover w-100">
                  <thead>
                    <tr>
                      <th style="width: 300px">{{ '_addressbook.alias' | translate }}</th>
                      <th>{{ '_addressbook.identifier' | translate }}</th>
                      <th>{{ '_addressbook.tags' | translate }}</th>
                      <th style="width: 50px;"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="clickable"
                      @click="contactClicked(contact)"
                      @mouseover="contactHover = contact.accountId"
                      @mouseleave="contactHover = null"
                      v-bind:key="index"
                      v-for="(contact, index) in categories[category]"
                    >
                      <td class="font-weight-semibold text-primary">{{ contact.alias }}</td>
                      <td class="small text-muted">{{ contact.accountId || contact.email }}</td>
                      <td class="small text-muted">{{ contact.tags.join(', ') }}</td>
                      <td
                        :style="{ 'position': contact.loading || contactHover === contact.accountId ? 'relative': '' }">
                        <evan-button
                          @click="$refs.contactDetailModal.show(contact.accountId); $event.stopPropagation()"
                          icon="mdi mdi-circle-edit-outline"
                          style="position: absolute; top: 4px; right: 10px;"
                          type="icon"
                          v-if="!contact.loading && contactHover === contact.accountId"
                        />
                        <div v-if="contact.loading" class="spinner-border spinner-border-sm text-secondary"></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
        </div>
      </template>
    </evan-dapp-wrapper>
  </div>
</template>

<script lang="ts">
  import addressbookRootComponent from './root';
  export default addressbookRootComponent;
</script>
