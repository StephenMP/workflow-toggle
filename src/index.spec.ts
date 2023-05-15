import { faker } from '@faker-js/faker';
import { main } from './index';
import { ToggleAction } from './lib/input';
import { createMock } from '@golevelup/ts-jest';
import { Octokit } from './lib/types';
import * as github from '@actions/github';

const pass = () => expect(true).toBe(true);
const getKeyValue =
  <U extends keyof T, T extends object>(key: U) =>
  (obj: T) =>
    obj[key];

type TestInputs = {
  INPUT_TOKEN?: string;
  INPUT_WORKFLOW_ID?: string;
  INPUT_ACTION?: ToggleAction;
  INPUT_OWNER?: string;
  INPUT_REPO?: string;
};

function setEnv(inputs: TestInputs) {
  for (const key in inputs) {
    process.env[key] = getKeyValue<keyof TestInputs, TestInputs>(key as keyof TestInputs)(inputs);
  }
}

describe('index', () => {
  let mockGetOctokit: jest.SpyInstance;
  const mockOctokit = createMock<Octokit>({
    rest: {
      actions: {
        disableWorkflow: jest.fn().mockReturnValue({ status: 204 }) as Record<string, any>,
        enableWorkflow: jest.fn().mockReturnValue({ status: 204 }) as Record<string, any>,
        getWorkflow: jest.fn() as Record<string, any>,
      },
    },
  });

  beforeAll(() => {
    mockGetOctokit = jest.spyOn(github, 'getOctokit').mockReturnValue(mockOctokit);
  });

  afterAll(() => {
    mockGetOctokit.mockReset();
  });

  const cases: ToggleAction[] = ['enable', 'disable'];
  it.each(cases)('can run %s', async (action) => {
    setEnv({
      INPUT_TOKEN: faker.word.noun(),
      INPUT_ACTION: action,
      INPUT_WORKFLOW_ID: faker.word.noun(),
      INPUT_OWNER: faker.word.noun(),
      INPUT_REPO: faker.word.noun(),
    });
    await main();
    pass();
  });
});
