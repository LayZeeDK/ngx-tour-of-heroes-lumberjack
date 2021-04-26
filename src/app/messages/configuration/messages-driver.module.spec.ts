import { TestBed } from '@angular/core/testing';
import {
  lumberjackConfigToken,
  LumberjackLevel,
  LumberjackLogDriver,
  LumberjackLogDriverConfig,
  lumberjackLogDriverToken,
  LumberjackModule,
} from '@ngworker/lumberjack';

import { MessagesDriver } from '../log-drivers/messages.driver';
import { MessagesDriverConfig } from './messages-driver.config';
import { MessagesDriverModule } from './messages-driver.module';

const createMessagesDriver = ({
  config,
  isLumberjackModuleImportedFirst = true,
}: {
  config?: MessagesDriverConfig;
  isLumberjackModuleImportedFirst?: boolean;
} = {}) => {
  TestBed.configureTestingModule({
    imports: [
      isLumberjackModuleImportedFirst ? LumberjackModule.forRoot() : [],
      MessagesDriverModule.forRoot(config),
      isLumberjackModuleImportedFirst ? [] : LumberjackModule.forRoot(),
    ],
  });

  const [messagesDriver] = (TestBed.inject(
    lumberjackLogDriverToken
  ) as unknown) as LumberjackLogDriver[];

  return messagesDriver;
};

describe(MessagesDriverModule.name, () => {
  it(`cannot be imported without using the ${MessagesDriverModule.forRoot.name} method`, () => {
    let ngModule: MessagesDriverModule | undefined;

    TestBed.configureTestingModule({
      imports: [MessagesDriverModule],
    });

    expect(() => {
      ngModule = TestBed.inject(MessagesDriverModule);
    }).toThrow();
    expect(ngModule).toBeUndefined();
  });

  describe(MessagesDriverModule.forRoot.name, () => {
    it('provides the messages driver', () => {
      const messagesDriver = createMessagesDriver();

      expect(messagesDriver).toBeInstanceOf(MessagesDriver);
    });

    it('registers the specified log driver configuration given the specified identifier', () => {
      const expectedConfig: LumberjackLogDriverConfig = {
        levels: [LumberjackLevel.Error],
        identifier: 'TestMessagesDriverIdentifier',
      };

      const messagesDriver = createMessagesDriver({ config: expectedConfig });

      const actualConfig = messagesDriver.config;
      expect(actualConfig).toEqual(expectedConfig);
    });

    it('registers the specified log driver configuration given no identifier', () => {
      const config: MessagesDriverConfig = {
        levels: [LumberjackLevel.Error],
      };
      const expectedConfig: LumberjackLogDriverConfig = {
        ...config,
        identifier: MessagesDriver.driverIdentifier,
      };

      const messagesDriver = createMessagesDriver({ config });

      const actualConfig = messagesDriver.config;
      expect(actualConfig).toEqual(expectedConfig);
    });

    it('registers a default configuration if none is specified', () => {
      const messagesDriver = createMessagesDriver();

      const actualConfig = messagesDriver.config;
      const logConfig = TestBed.inject(lumberjackConfigToken);
      const defaultLogDriverConfig: LumberjackLogDriverConfig = {
        levels: logConfig.levels,
        identifier: MessagesDriver.driverIdentifier,
      };
      expect(actualConfig).toEqual(defaultLogDriverConfig);
    });

    it('registers the specified log driver configuration when the Lumberjack module is imported after the messages driver module', () => {
      const expectedConfig: LumberjackLogDriverConfig = {
        levels: [LumberjackLevel.Debug],
        identifier: 'TestMessagesDriver',
      };

      const messagesDriver = createMessagesDriver({
        config: expectedConfig,
        isLumberjackModuleImportedFirst: false,
      });

      const actualConfig = messagesDriver.config;
      expect(actualConfig).toEqual(expectedConfig);
    });
  });
});
