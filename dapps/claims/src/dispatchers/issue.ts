/*
  Copyright (c) 2018-present evan GmbH.
 
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
 
      http://www.apache.org/licenses/LICENSE-2.0
 
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import {
  bccHelper,
  getDomainName,
} from 'dapp-browser';

import {
  Injectable,
  Component, OnInit, Input,            // @angular/core
  Validators, FormBuilder, FormGroup,  // @angular/forms
  DomSanitizer
} from 'angular-libs';

import {
  AngularCore,
  QueueSequence,
  QueueDispatcher,
  SingletonService
} from 'angular-core';

import {
  translations
} from '../i18n/registry';

import {
  ClaimService
} from '../services/service';

/**************************************************************************************************/

export const issueDispatcher = new QueueDispatcher(
  [
    new QueueSequence(
      '_claims.issue-dispatcher.title',
      '_claims.issue-dispatcher.description',
      async (service: ClaimService, queueEntry: any) => {
        const results = [ ];
        const activeAccount = service.core.activeAccount();

        // issue a new claim with the current user with a given address and a given topic
        for (let entry of queueEntry.data) {
          let expirationDate: any = new Date(entry.expirationDate);

          // if expiration date is applied, parse it into an unix timestamp and apply it to the service
          if (expirationDate) {
            expirationDate = Math.floor(new Date(expirationDate).getTime() / 1000);
          }

          await service.bcc.claims.setClaim(
            service.core.activeAccount(),
            entry.address,
            entry.topic,
            expirationDate
          );
        }
      }
    )
  ],
  translations,
  'ClaimService'
);