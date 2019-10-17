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

// vue imports
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

// evan.network imports
import * as bcc from '@evan.network/api-blockchain-core';
import * as dappBrowser from '@evan.network/ui-dapp-browser';
import { countries } from '@evan.network/ui-countries';
import { EvanComponent, EvanForm, EvanFormControl } from '@evan.network/ui-vue-core';

// internal
import * as dispatchers from '../../../../dispatchers/registry';
import ProfileMigrationLibrary from '../../../../lib/profileMigration';

interface ContactFormInterface extends EvanForm {
  city: EvanFormControl;
  country: EvanFormControl;
  postalCode: EvanFormControl;
  streetAndNumber: EvanFormControl;
  website: EvanFormControl;
}

interface OptionInterface {
  value: string,
  label: string
}

@Component({})
export default class CompanyRegistrationForm extends mixins(EvanComponent) {
  /**
   * Address for that the data should be loaded
   */
  @Prop() address;

  /**
   * Evan form instance for registration data.
   */
  contactForm: ContactFormInterface = null;

  /**
   * Watch for dispatcher updates
   */
  listeners: Array<any> = [];

  countryOptions: OptionInterface[];

  /**
   * Load the mail details
   */
  async created() {
    // watch for save updates
    this.listeners.push(dispatchers.updateProfileDispatcher.watch(($event: any) => {
      if ($event.detail.status === 'finished' || $event.detail.status === 'deleted') {
        this.loadProfileData();
      }
    }));

    // load country options
    this.countryOptions = this.getCountriesOption();

    // load profile data
    await this.loadProfileData();
  }

  /**
   * Clear dispatcher listeners
   */
  beforeDestroy() {
    this.listeners.forEach(listener => listener());
  }

  /**
   * Load the mail details
   */
  async loadProfileData() {
    const runtime = (<any>this).getRuntime();
    let contactData = await ProfileMigrationLibrary.loadProfileData(runtime, 'contact');

    // setup registration form
    this.contactForm = (<ContactFormInterface>new EvanForm(this, {
      country: {
        value: contactData.country || this.countryOptions.filter(({ value }) => value === 'DE'),
        validate: function (vueInstance: CompanyRegistrationForm, form: ContactFormInterface) {
          return this.value && this.value.length !== 0;
        },
        uiSpecs: {
          type: 'v-select',
          attr: {
            options: this.countryOptions,
          }
        }
      },
      city: {
        value: contactData.city || '',
        validate: function (vueInstance: CompanyRegistrationForm, form: ContactFormInterface) {
          return this.value.length !== 0;
        },
      },
      postalCode: {
        value: contactData.postalCode || '',
        validate: function (vueInstance: CompanyRegistrationForm, form: ContactFormInterface) {
          return /^\d{5}$/.test(this.value);
        },
      },
      streetAndNumber: {
        value: contactData.streetAndNumber || '',
        validate: function (vueInstance: CompanyRegistrationForm, form: ContactFormInterface) {
          return this.value.length !== 0;
        },
      },
      website: {
        value: contactData.website || '',
        validate: function (vueInstance: CompanyRegistrationForm, form: ContactFormInterface) {
          return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(this.value);
        },
      },
    }));
  }

  async changeProfileData() {
    dispatchers.updateProfileDispatcher.start((<any>this).getRuntime(), {
      formData: this.contactForm.getFormData(),
      type: 'contact'
    });
  }

  getCountriesOption(): OptionInterface[] {
    return countries
      .map(isoCode => {
        return { value: isoCode, label: (this as any).$t(`_countries.${isoCode}`), }
      })
      .sort((countryA, countryB) => {
          return countryA.label - countryB.label
      });
  }
}
