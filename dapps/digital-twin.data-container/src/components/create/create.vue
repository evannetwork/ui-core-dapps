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
    <evan-modal
      id="container-create-modal"
      ref="createModal"
      :maxWidth="'1200px'"
      :modalClasses="[ 'modal-header', 'modal-footer', ]">
      <template v-slot:header>
        <h5 class="modal-title d-flex align-items-center">
          <template v-if="mode !== 'plugin'">
            <template v-if="digitalTwinAddress">
              {{ `_datacontainer.createForm.add-plugin` | translate }}
            </template>
            <template v-else>
              {{ `_datacontainer.createForm.create-plugin` | translate }}
            </template>
          </template>
          <template v-else>
            {{ `_datacontainer.plugin.create-title` | translate }}
          </template>
        </h5>
      </template>
      <template v-slot:body>
        <evan-loading v-if="loading"></evan-loading>
        <template v-else>
          <template v-if="!creating">
            <!---------------------------------- dbcp metadata ---------------------------------->
            <div
              v-if="!activePlugin">
              <div class="d-flex align-items-center bg-level-3 p-3 border-bottom border-sm"
                style="height: 78px">
                <h5 class="d-flex align-items-center font-weight-semibold mb-0">
                  {{ '_datacontainer.createForm.plugin-select' | translate }}
                </h5>
              </div>
              <div class="row content p-3 m-0"
                :id="`evan-dt-plugins`"
                v-if="plugins.length !== 0">
                <div class="col-md-6 col-lg-4 mb-4"
                  v-for="(plugin, index) in plugins">
                  <button class="d-flex bg-level-1 border-smooth rounded evan-highlight w-100"
                    :id="`evan-dt-plugin-${ plugin.description.name.replace('.', '') }`"
                    @click="activatePlugin(plugin)">
                    <div class="row align-items-center m-0 w-100">
                      <!-- <div class="col-2" style="overflow: visible">
                        <img class="img-fluid p-3"
                          v-if="plugin.imgSquare"
                          :src="plugin.imgSquare">
                        <i
                          class="mdi mdi-circle-edit-outline text-muted"
                          style="font-size:50px;">
                        </i>
                      </div> -->
                      <div class="col-12">
                        <div class="d-flex p-3 align-items-center">
                          <div class="w-100 text-left">
                            <h4 class="font-weight-semibold mb-0 force-oneline">
                              {{ plugin.description.name }}
                            </h4>
                            <span class="text-justify d-block font-weight-semibold text-muted overflow-multiline line-3">
                              {{ plugin.description.description }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <div class="text-center p-5" v-else>
                <h5 class="m-0"
                  v-html="$t(`_datacontainer.createForm.empty-plugins`)">
                </h5>
                <a class="btn btn-primary font-weight-normal mt-3"
                  id="go-to-plugins"
                  :href="`${ dapp.baseUrl }/${ dapp.rootEns }/digitaltwins.${ dapp.domainName }/my-plugins`">
                  {{ `_datacontainer.createForm.to-plugins` | translate }}
                  <i class="mdi mdi-arrow-right label ml-3"></i>
                </a>
              </div>
              <div class="px-4 pb-4">
                <evan-file-input
                  id="plugin-import" ref="value"
                  v-model="importPlugins"
                  :placeholder="'_datacontainer.createForm.import-plugin-2'"
                  :emptyText="'_datacontainer.createForm.import-plugin-1'"
                  @input="importPlugin()">
                </evan-file-input>
                <div class="text-danger text-center pb-3"
                  v-if="importPluginError">
                  {{ '_datacontainer.createForm.import-error' | translate }}
                </div>
              </div>
            </div>

            <!---------------------------------- fill the schema ---------------------------------->
            <template v-else>
              <div class="d-flex align-items-center bg-level-3 p-3 border-bottom border-sm"
                style="height: 78px">
                <h5 class="d-flex align-items-center font-weight-semibold mb-0">
                  {{ '_datacontainer.createForm.container-configuration' | translate }}

                  <button class="btn btn-icon ml-3"
                    v-if="!creating && activePlugin"
                    id="dc-edit"
                    @click="activePlugin = null; activateStep(0)">
                    <i class="mdi mdi-pencil"></i>
                    <evan-tooltip
                      ref="editDbcphint"
                      :placement="'right'">
                      {{ `_datacontainer.createForm.edit-dbcp-hint` | translate }}
                    </evan-tooltip>
                  </button>
                </h5>
                <span class="mx-auto"></span>
                <div>
                  <button type="submit"
                    v-if="steps.length !== 0 && mode === 'plugin'"
                    class="btn btn-icon btn-primary"
                    id="th-add-entry"
                    @click="$refs.dcNewEntry.showModal();">
                    <i class="mdi mdi-plus"></i>
                    <evan-tooltip :placement="'bottom'">
                      {{ `_datacontainer.entry.add` | translate }}
                    </evan-tooltip>
                  </button>
                </div>
              </div>

              <div class="evan-steps" v-if="steps.length !== 0">
                <div class="evan-step-header mt-3">
                  <!-- step button is disabled when a previous step was reactived and is currently invalid -->
                  <button class="btn"
                    v-for="(step, index) of steps"
                    :class="{ 'active': activeStep === index, }"
                    :disabled="step.disabled(index)"
                    :id="`evan-container-create-step-${ index }`"
                    @click="activateStep(index)">
                    <span class="stepper-circle">{{ index + 1}}</span>
                    <span>{{ step.title | translate }}</span>
                  </button>
                </div>
                <div class="m-3 border border-sm rounded"
                  v-for="(step, index) of steps"
                  v-if="index === activeStep">
                  <dt-dbcp
                    class="p-3"
                    v-if="index === 0"
                    :form="createForm"
                    :disableSpacing="true"
                    @submit="nextStep();"
                    @init="$set(steps[activeStep], 'entryComp', $event)">
                  </dt-dbcp>
                  <dc-entry
                    v-else
                    :address="mode !== 'plugin' ? 'dc-create' : 'plugin-create'"
                    :entry="activePlugin.template.properties[steps[activeStep].entryName]"
                    :entryName="steps[activeStep].entryName"
                    :schemaEdit="mode === 'plugin'"
                    :permissions="permissions"
                    @init="$set(steps[activeStep], 'entryComp', $event)">
                  </dc-entry>
                </div>
              </div>
              <div class="text-center p-5" v-else>
                <h3 class="mt-4 font-weight-semibold">
                  {{ '_datacontainer.no-entries.title' | translate }}
                </h3>
                <h5 class="font-weight-semibold text-muted">
                  {{ '_datacontainer.no-entries.desc' | translate }}
                </h5>

                <button
                  class="btn btn-outline-primary mt-3"
                  id="th-add-entry"
                  @click="$refs.dcNewEntry.showModal();">
                  {{ `_datacontainer.entry.add` | translate }}
                </button>
              </div>

              <!---------------------------------- modals ---------------------------------->
              <dc-new-entry
                ref="dcNewEntry"
                :template="activePlugin.template"
                @submit="addNewEntry($event)">
              </dc-new-entry>

              <evan-modal
                id="container-create-submit"
                ref="createModalSubmit">
                <template v-slot:header>
                  <h5 class="modal-title" v-if="mode !== 'plugin'">
                    {{ `_datacontainer.create-question.title` | translate }}
                  </h5>
                  <h5 class="modal-title" v-else>
                    {{ `_datacontainer.plugin.create-title` | translate }}
                  </h5>
                </template>
                <template v-slot:body>
                  <p class="text-left m-0"
                    v-html="$t(`_datacontainer.create-question.desc`, modalParams)">
                  </p>
                </template>
                <template v-slot:footer>
                  <button type="button" class="btn btn-primary font-weight-normal"
                    id="container-create"
                    @click="create()">
                    {{ `_datacontainer.create-question.action` | translate }}
                    <i class="mdi mdi-arrow-right label ml-3"></i>
                  </button>
                </template>
              </evan-modal>
            </template>
          </template>
          <div class="text-center" v-else>
            <h3 class="mt-5 mb-3"
              v-if="mode !== 'plugin'"
              v-html="$t('_datacontainer.in-creation')">
            </h3>
            <h3 class="mt-5 mb-3"
              v-else
              v-html="$t('_datacontainer.plugin.in-saving')">
            </h3>
            <evan-loading></evan-loading>
          </div>
        </template>
      </template>
      <template v-slot:footer v-if="!creating">
        <button
          v-if="activePlugin && (steps.length === 0 || (steps[activeStep] && steps[activeStep].entryComp))"
          class="btn  btn-primary"
          id="container-save"
          :disabled="steps.length !== 0 && !steps[activeStep].entryComp.isValid()"
          @click="nextStep()">
          <template v-if="steps.length === 0 || activeStep === (steps.length - 1)">
            {{ `_datacontainer.createForm.finish` | translate }}
          </template>
          <template v-else>
            {{ `_datacontainer.createForm.continue` | translate }}
          </template>
          <i class="mdi mdi-arrow-right label ml-3"></i>
          <div class="spinner-border spinner-border-sm text-light mr-3"
            v-if="checking">
          </div>
        </button>
      </template>
    </evan-modal>
  </div>
</template>

<script lang="ts">
  import Component from './create.ts';
  export default Component;
</script>
