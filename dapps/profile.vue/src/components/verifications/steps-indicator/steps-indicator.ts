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

import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { EvanComponent } from '@evan.network/ui-vue-core';

/**
 * Shape of each step object
 */
interface Step {
  title: string;
  disabled: boolean;
}

/**
 * Steps indicator component shows current step highlighted.
 */
@Component({ })
export default class StepsIndicator extends mixins(EvanComponent) {
  /**
   * activeStep defines the current outlined step
   */
  @Prop({
    type: Number,
    default: 0
  }) activeStep: number

  /**
   * The steps array, with the shape of Step interface:
   *  { title: String, disabled: boolean }
   */
  @Prop({
    type: Array,
    default: []
  }) steps: Step[]

  created() {
    if (this.steps.length === 0) {
      console.warn('no steps ');
    }
  }

  gotoStep(idx: number) {
    const targetStep = this.steps[idx];

    if (!targetStep.disabled) {
      this.activeStep = idx;

      this.$emit('updatestep', idx)
    }
  }
}
