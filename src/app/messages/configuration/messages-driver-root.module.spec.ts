import { MessagesDriverRootModule } from './messages-driver-root.module';

describe(MessagesDriverRootModule.name, () => {
  it('guards against being registered in multiple injectors', () => {
    const rootInjectorInstance = new MessagesDriverRootModule();

    expect(() => new MessagesDriverRootModule(rootInjectorInstance)).toThrowError(/multiple injectors/);
  });

  it('does not guard the first injector that registers it', () => {
    expect(() => new MessagesDriverRootModule()).not.toThrow();
  });
});
