import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';
import {
  LumberjackLogDriverConfig,
  lumberjackLogDriverConfigToken,
  lumberjackLogDriverToken,
} from '@ngworker/lumberjack';

import { MessagesDriver } from '../log-drivers/messages.driver';
import { messagesDriverConfigToken } from './messages-driver-config.token';
import { MessagesDriverConfig } from './messages-driver.config';

export function messagesDriverFactory(
  logDriverConfig: LumberjackLogDriverConfig,
  messagesDriverConfig: MessagesDriverConfig,
): MessagesDriver {
  const baseConfig = { ...logDriverConfig, identifier: MessagesDriver.driverIdentifier };
  const fullConfig = { ...baseConfig, ...customDriverConfig };

  return new MessagesDriver(fullConfig);
}

@NgModule({
  providers: [
    {
      provide: lumberjackLogDriverToken,
      useFactory: messagesDriverFactory,
      deps: [lumberjackLogDriverConfigToken, messagesDriverConfigToken],
      multi: true,
    },
  ],
})
export class MessagesDriverRootModule {
  constructor(
    @Optional()
    @SkipSelf()
    @Inject(MessagesDriverRootModule)
    maybeNgModuleFromParentInjector: MessagesDriverRootModule = null as any
  ) {
    if (maybeNgModuleFromParentInjector) {
      throw new Error(
        'MessagesDriverModule.forRoot registered in multiple injectors. Only call it from your root injector such as in AppModule.'
      );
    }
  }
}
