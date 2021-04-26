import { Inject, Injectable } from '@angular/core';
import {
  LumberjackLogDriver,
  LumberjackLogDriverConfig,
  LumberjackLogDriverLog,
  LumberjackLogPayload,
} from '@ngworker/lumberjack';

import { MessageService } from '../../message.service';
import { messagesDriverConfigToken } from '../configuration/messages-driver-config.token';

/**
 * Adds formatted logs to the message service.
 */
@Injectable()
export class MessagesDriver<TPayload extends LumberjackLogPayload | void = void>
  implements LumberjackLogDriver<TPayload> {
  static driverIdentifier = 'MessagesDriver';
  constructor(
    @Inject(messagesDriverConfigToken)
    readonly config: LumberjackLogDriverConfig,
    private messageService: MessageService
  ) {}

  logCritical({ formattedLog }: LumberjackLogDriverLog<TPayload>): void {
    this.messageService.add(formattedLog);
  }

  logDebug({ formattedLog }: LumberjackLogDriverLog<TPayload>): void {
    this.messageService.add(formattedLog);
  }

  logError({ formattedLog }: LumberjackLogDriverLog<TPayload>): void {
    this.messageService.add(formattedLog);
  }

  logInfo({ formattedLog }: LumberjackLogDriverLog<TPayload>): void {
    this.messageService.add(formattedLog);
  }

  logTrace({ formattedLog }: LumberjackLogDriverLog<TPayload>): void {
    this.messageService.add(formattedLog);
  }

  logWarning({ formattedLog }: LumberjackLogDriverLog<TPayload>): void {
    this.messageService.add(formattedLog);
  }
}
