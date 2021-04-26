import { ModuleWithProviders, NgModule } from '@angular/core';

import { messagesDriverConfigToken } from './messages-driver-config.token';
import { MessagesDriverRootModule } from './messages-driver-root.module';
import { MessagesDriverConfig } from './messages-driver.config';

/**
 * Service module for `MessagesDriver`.
 *
 * Use `MessagesDriverModule.forRoot` to import.
 */
@NgModule()
export class MessagesDriverModule {
  static forRoot(config?: MessagesDriverConfig): ModuleWithProviders<MessagesDriverRootModule> {
    return {
      ngModule: MessagesDriverRootModule,
      providers: [
        {
          provide: messagesDriverConfigToken,
          useValue: config || {},
        },
      ],
    };
  }

  constructor() {
    throw new Error('Do not import MessagesDriverModule directly. Use MessagesDriverModule.forRoot.');
  }
}
