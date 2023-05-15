import * as core from '@actions/core';
import { Logger, logger } from './logger';
import { faker } from '@faker-js/faker';

type StdOutMethods = 'debug' | 'info' | 'warning' | 'notice' | 'error';

describe('logger', () => {
  describe('stdout logs', () => {
    process.stdout.write = jest.fn();
    process.stderr.write = jest.fn();

    const stdoutCalls: StdOutMethods[] = ['debug', 'info', 'warning', 'notice', 'error'];
    it.each(stdoutCalls)('can log %s', (method) => {
      logger[method](faker.datatype.string());
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('group logs', () => {
    let groupSpy: jest.SpyInstance;
    let startGroupSpy: jest.SpyInstance;
    let endGroupSpy: jest.SpyInstance;

    beforeAll(() => {
      groupSpy = jest.spyOn(core, 'group');
      startGroupSpy = jest.spyOn(core, 'startGroup');
      endGroupSpy = jest.spyOn(core, 'endGroup');
    });

    afterAll(() => {
      groupSpy.mockReset();
      startGroupSpy.mockReset();
      endGroupSpy.mockReset();
    });

    it('can group', async () => {
      await logger.group('test', async () => {
        return Promise.resolve();
      });

      expect(groupSpy).toHaveBeenCalled();
    });

    it('can groupSync', async () => {
      logger.groupSync('test', () => {
        return Promise.resolve();
      });

      expect(startGroupSpy).toHaveBeenCalled();
      expect(endGroupSpy).toHaveBeenCalled();
    });

    it('can startGroup', async () => {
      logger.startGroup('test');
      expect(startGroupSpy).toHaveBeenCalled();
    });

    it('can endGroup', async () => {
      logger.endGroup();
      expect(endGroupSpy).toHaveBeenCalled();
    });
  });
});
