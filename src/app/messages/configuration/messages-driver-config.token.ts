import { InjectionToken } from '@angular/core';
import { LumberjackLogDriverConfig } from '@ngworker/lumberjack';

export const messagesDriverConfigToken = new InjectionToken<LumberjackLogDriverConfig>(
  '__MESSAGES_DRIVER_CONFIG__'
);
