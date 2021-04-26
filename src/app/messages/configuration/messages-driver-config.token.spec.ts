import { TestBed } from '@angular/core/testing';
import { LumberjackLevel, LumberjackLogDriverConfig, lumberjackLogDriverConfigToken } from '@ngworker/lumberjack';

import { messagesDriverConfigToken } from './messages-driver-config.token';

const debugDriverConfig: LumberjackLogDriverConfig = {
  levels: [LumberjackLevel.Debug],
  identifier: 'TestMessagesDriver',
};
const verboseDriverConfig: Partial<LumberjackLogDriverConfig> = {
  levels: [LumberjackLevel.Verbose],
};

describe('messagesDriverConfigToken', () => {
  describe('given a provided messages log driver config', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: lumberjackLogDriverConfigToken,
            useValue: verboseDriverConfig,
          },
          { provide: messagesDriverConfigToken, useValue: debugDriverConfig },
        ],
      });
    });

    it('then that config is resolved', () => {
      const actualDriverConfig = TestBed.inject(messagesDriverConfigToken);

      expect(actualDriverConfig).toBe(debugDriverConfig);
    });
  });
});
