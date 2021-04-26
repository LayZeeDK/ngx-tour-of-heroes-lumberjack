import { Inject, Injectable } from '@angular/core';
import {
  LumberjackLogDriver,
  LumberjackLogDriverConfig,
  LumberjackLogDriverLog,
  LumberjackLogPayload,
} from '@ngworker/lumberjack';

import { messagesDriverConfigToken } from '../configuration/messages-driver-config.token';

/**
 * Document your driver behavior
 *
 */
@Injectable()
export class MessagesDriver<TPayload extends LumberjackLogPayload | void = void>
  implements LumberjackLogDriver<TPayload> {
  static driverIdentifier = 'MessagesDriver';
  constructor(@Inject(messagesDriverConfigToken) readonly config: LumberjackLogDriverConfig) {}

  logCritical({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {
    // implement your driver
  }

  logDebug({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {
    // implement your driver
  }

  logError({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {
    // implement your driver
  }

  logInfo({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {
    // implement your driver
  }

  logTrace({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {
    // implement your driver
  }

  logWarning({ formattedLog, log }: LumberjackLogDriverLog<TPayload>): void {
    // implement your driver
  }
}
