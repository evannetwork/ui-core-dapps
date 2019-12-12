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
import Component, { mixins } from 'vue-class-component';

// evan.network imports
import { EvanComponent } from '@evan.network/ui-vue-core';
import { DigitalTwinService } from './DigitalTwinService';
import { debounce } from 'lodash';

@Component
export default class DigitalTwinsComponent extends mixins(EvanComponent) {
  twinService: DigitalTwinService = new DigitalTwinService();

  isLoading = true;

  data = [];

  columns = [
    { key: 'icon', label: '' },
    'name',
    'owner',
    'updated',
    'created',
    { key: 'actions', label: '' }
  ];

  async mounted() {
    await this.fetchInitial();
  }

  /**
   * Watch if user scrolled down and load more twins when necessary
   */
  scrollHandler = debounce(
    async function(ev) {
      if(!this.isLoading) {
        const offset = 200;
        let bottomOfWindow =
          ev.target.clientHeight + ev.target.scrollTop >= ev.target.scrollHeight - offset;
        if (bottomOfWindow) {
          this.isLoading = true;
          await this.fetchMore();
        }
      }
    },
    100,
    { trailing: true }
  );

  /**
   * Load initial batch of digital twins
   */
  async fetchInitial() {
    this.data = await this.twinService.getTwins();
    this.isLoading = false;
  }

  /**
   * Load more digital twins
   */
  async fetchMore() {
    this.data = [...this.data, ...(await this.twinService.getTwins())];
    this.isLoading = false;
  }
}