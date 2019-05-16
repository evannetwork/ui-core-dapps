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

  You can be released from the requirements of the GNU Affero General Public
  License by purchasing a commercial license.
  Buying such a license is mandatory as soon as you use this software or parts
  of it on other blockchains than evan.network.

  For more information, please contact evan GmbH at this address:
  https://evan.network/license/
*/

// vue imports
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

// evan.network imports
import { EvanComponent, EvanForm, EvanFormControl } from '@evan.network/ui-vue-core';
import { deepEqual } from '@evan.network/ui';
import * as bcc from '@evan.network/api-blockchain-core';
import * as dappBrowser from '@evan.network/ui-dapp-browser';
import ContainerCache from '../../container-cache';
import * as utils from '../../utils';
import * as entryUtils from '../../entries';

interface EntryFormInterface extends EvanForm {
  name: EvanFormControl;
  type: EvanFormControl;
  arrayType: EvanFormControl;
}

@Component({ })
export default class TemplateHandlerComponent extends mixins(EvanComponent) {
  /**
   * Id for the template that is edited (e.g.: create, container address, template type, ...)
   */
  @Prop() address: string;

  /**
   * The full data container template
   */
  @Prop() template: bcc.ContainerTemplate;

  /**
   * Permissions for the current account
   *
   * @class      Prop (name)
   */
  @Prop() permissions: any;

  /**
   * Container cache, so we can check, if the user left some unsaved work
   */
  containerCache: ContainerCache;

  /**
   * Template that was cached into the indexeddb
   */
  cachedTemplate: any = null;

  /**
   * current displayed active template
   */
  activeTab = 0;

  /**
   * Active dataset, that should be displayed
   */
  activeEntryName = '';
  activeEntry: any = { };

  /**
   * formular specific variables
   */
  entryForm: EntryFormInterface = null;

  /**
   * Enable the save button, when anything has changed
   */
  cacheChanges = false;

  /**
   * Watch for updates, so we can enable the save button
   */
  valuesChanged: any;

  /**
   * all available entry types
   */
  entryTypes: Array<string> = [
    'object',
    'array',
    'string',
    'number',
    'files',
  ];

  /**
   * all available array types
   */
  arrayTypes: Array<string> = [
    'object',
    'string',
    'number',
    'files',
  ];

  /**
   * show loading symbol
   */
  loading = false;

  /**
   * Initialize and try to restore latest cached template
   */
  async created() {
    this.entryForm = (<EntryFormInterface>new EvanForm(this, {
      name: {
        value: '',
        validate: function(vueInstance: TemplateHandlerComponent, form: EntryFormInterface) {
          const trimmed = this.value.trim();

          if (trimmed.length === 0) {
            return `_datacontainer.entry.name.error.length`;
          } else if (vueInstance.template.properties[trimmed]) {
            return `_datacontainer.entry.name.error.already`;
          } else if (trimmed === 'type') {
            return `_datacontainer.entry.name.error.reserved`;
          } else {
            return true;
          }
        }
      },
      type: {
        value: this.entryTypes[0]
      },
      arrayType: {
        value: this.arrayTypes[0]
      },
    }));

    // auto focus property name input
    if (Object.keys(this.template.properties).length === 0) {
      this.activateTab(-1, false);

      this.$nextTick(() => this.entryForm.name.$ref.focus());
    } else {
      let openedEntry = 0;
      if ((<any>this).$route.params.entry) {
        openedEntry = Object.keys(this.template.properties)
          .indexOf((<any>this).$route.params.entry);
      }

      this.activateTab(openedEntry === -1 ? 0 : openedEntry, false);
    }

    // watch for changes, so the internal values can be cached
    this.valuesChanged = (($event) => this.cacheChanges = true).bind(this);
    window.addEventListener('dc-value-changed', this.valuesChanged);
  }

  /**
   * Watch for container caches and ask to restore them.
   */
  async mounted() {
    // try to restore previous left work
    this.containerCache = new ContainerCache((<any>this).getRuntime().activeAccount);
    this.cachedTemplate = await this.containerCache.get(this.address);
  }

  /**
   * Cache latest configuration for this type, so the data wont be lost, when the users leaves
   */
  async beforeDestroy() {
    window.removeEventListener('dc-value-changed', this.valuesChanged);

    // save latest change for the current active entry to the template so the correct values will be
    // cached
    this.updateTemplateProperty();

    // wait for opened containers to saved the work
    if (this.cacheChanges) {
      // check for changes
      const integrity = await utils.getEntryChanges(
        utils.getRuntime(this),
        this.address,
        this.template
      );

      // if something has changed, cache it!
      if (integrity.changed) {
        // wait for all editors (ajv / field components to save the work and persist them)
        setTimeout(() =>  this.containerCache.put(this.address, this.template));
      } else {
        this.containerCache.delete(this.address);
      }
    }
  }

  /**
   * save the latest active entry values to the template properties
   */
  updateTemplateProperty() {
    // save the latest value
    if (this.activeEntry && this.activeEntryName) {
      this.template.properties[this.activeEntryName] = this.activeEntry;
    }
  }

  /**
   * Set the active tab and apply the current data set, so it can be accessed easily.
   *
   * @param      {number}   activeTab  index of active data set
   * @param      {boolean}  rerender   trigger content rerender on tab switch
   */
  activateTab(activeTab: number, rerender = true) {
    const beforeTab = this.activeTab;
    const updateActiveEntry = () => {
      // save the latest value
      beforeTab !== -1 && this.updateTemplateProperty();

      if (activeTab !== -1) {
        this.activeEntryName = Object.keys(this.template.properties)[activeTab];
        this.activeEntry = this.template.properties[this.activeEntryName];

        // ensure correct breadcrumb translations
        const customTranslation = { };
        customTranslation[ `_datacontainer.breadcrumbs.${ this.activeEntryName }`] =
          this.activeEntryName;

        (<any>this).$i18n.add((<any>this).$i18n.locale(), customTranslation);

        // be sure, that value and addValue params are added
        this.ensureEntryValues();
      }
    };

    if (rerender) {
      // force rerendering of ajv and field components and set the specified tab
      this.activeTab = -2;
      this.$nextTick(() => {
        updateActiveEntry();
        this.activeTab = activeTab;
      });
    } else {
      updateActiveEntry();
      this.activeTab = activeTab;
    }
  }

  /**
   * Add a new, empty property to the metadata
   */
  addEntry() {
    const trimmedName = this.entryForm.name.value;

    if (!this.template.properties[trimmedName]) {
      // create a new empty data set
      const entryType = this.entryForm.type.value === 'array' ? 'List' : 'Entry';
      const entry: any = {
        mode: 'schema',
        permissions: { 0: ['set'] },
        type: entryType.toLowerCase(),
      };

      if (this.entryForm.type.value === 'array') {
        // set the default schema for arrayType
        entry.dataSchema = bcc.Container
          .defaultSchemas[`${ this.entryForm.arrayType.value }${ entryType }`];

        // add the items schema, including the array type, will be defined only ontime, at entry
        // creation
        if (this.entryForm.arrayType.value === 'object') {
          entry.dataSchema.items.properties = { };
        } else {
         // do not enter schema mode on normal field lists
          entry.mode = 'view';
        }
      } else {
        // set the default schema
        entry.dataSchema = bcc.Container
          .defaultSchemas[`${ this.entryForm.type.value }${ entryType }`];
      }

      // add properties and empty value object directly, so the vue listeners will work correctly in
      // nested components
      if (this.entryForm.type.value === 'object') {
        entry.dataSchema.properties = { };
      }

      this.template.properties[trimmedName] = entry;

      // navigate to the new data set
      this.activateTab(Object.keys(this.template.properties).indexOf(trimmedName));

      // reset add form
      this.entryForm.name.value = '';
      utils.enableDTSave();
    }
  }

  /**
   * Restore latest template from cache
   */
  async restoreTemplate() {
    // submit the cached templated, update the parent components
    this.template = { ...this.cachedTemplate };
    this.$emit('update:template', this.template);
    utils.enableDTSave();

    // clear the cached templated
    this.cachedTemplate = null;
    await this.containerCache.delete(this.address);

    // trigger a rerender, so the current formular will be up to date
    const activeTab = this.activeTab;
    this.activeTab = -2;
    this.$nextTick(() => this.activateTab(activeTab));

    (<any>this.$refs.cacheModal).hide();
  }

  /**
   * Clear the current template cache.
   */
  async clearCachedTemplate() {
    this.cachedTemplate = null;
    await this.containerCache.delete(this.address);

    (<any>this.$refs.cacheModal).hide();
  }

  /**
   * Takes an entry and checks for type array. If it's an array, ensure, that the value array and an
   * addValue object is added. Per default, this values are not returned by the API, templates does
   * not support list entries export and must be load dynamically. The value array is used to handle
   * new arrays, that will be persisted for caching to the indexeddb like the normal entries
   *
   * @param      {any}  entry   the entry that should be checked
   */
  ensureEntryValues() {
    entryUtils.ensureValues(this.activeEntry);

    // redefine the object and bind new watchers
    this.activeEntry = { ...this.activeEntry };
  }

  /**
   * Is currently an entry a edit mode?
   *
   * @param      {boolean}  showWarning  Open the next entry in edit mode and show a warning.
   */
  getUnsavedChanges(showWarning: boolean): Array<any> {
    const mappedProperties = Object
      .keys(this.template.properties)
      .map((name: string, index: number) => ({
        index: index,
        // activeEntry is a copy of the original entry and does not contain the correct mode
        // status ==> use the activeEntry object for activated tabs
        mode: this.activeEntryName === name ? this.activeEntry.mode :
          (<any>this.template.properties[name]).mode,
        name: name,
      }));

    // open the entry in edit mode an show an popup, that everything should be saved
    const editProperties = mappedProperties.filter(mappedProp => mappedProp.mode !== 'view');
    if (editProperties.length > 0) {
      this.activateTab(editProperties[0].index, true);
      (<any>this.$refs.editModes).show();
    }

    return editProperties;
  }
}

