import { LumberjackLogDriverConfig } from '@ngworker/lumberjack';

/**
 * Settings used by the custom driver.
 */
export type MessagesDriverConfig = Omit<LumberjackLogDriverConfig, 'identifier'> &
  Partial<Pick<LumberjackLogDriverConfig, 'identifier'>>;
