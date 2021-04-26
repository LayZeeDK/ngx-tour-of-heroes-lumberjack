import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { LumberjackLogDriverConfig, lumberjackLogDriverConfigToken, lumberjackLogDriverToken } from '@ngworker/lumberjack';
import { MessageService } from 'src/app/message.service';

import { MessagesDriver } from '../log-drivers/messages.driver';
import { messagesDriverConfigToken } from './messages-driver-config.token';
import { MessagesDriverConfig } from './messages-driver.config';

export function messagesDriverFactory(
  logDriverConfig: LumberjackLogDriverConfig,
  messagesDriverConfig: MessagesDriverConfig,
  messageService: MessageService
): MessagesDriver {
  const baseConfig = {
    ...logDriverConfig,
    identifier: MessagesDriver.driverIdentifier,
  };
  const fullConfig = { ...baseConfig, ...messagesDriverConfig };

  return new MessagesDriver(fullConfig, messageService);
}

@NgModule({
  providers: [
    {
      provide: lumberjackLogDriverToken,
      useFactory: messagesDriverFactory,
      deps: [
        lumberjackLogDriverConfigToken,
        messagesDriverConfigToken,
        MessageService,
      ],
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
