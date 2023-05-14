import 'reflect-metadata';
import { createMock } from '@golevelup/ts-jest';
import { WorkflowClient } from './WorkflowClient';
import { ToggleWorkflowResult } from './types';
import { ActionRunner } from './ActionRunner';
import { Inputs, ToggleAction, parseInputs } from './input';
import { faker } from '@faker-js/faker';

const randomString = () => faker.word.noun()

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

describe('parseInputs', () => {
  const missingCases: TestInputs[] = [
    {INPUT_ACTION: 'disable', INPUT_OWNER: randomString(), INPUT_REPO: randomString(), INPUT_TOKEN: randomString(), INPUT_WORKFLOW_ID: ''},
    {INPUT_ACTION: 'disable', INPUT_OWNER: randomString(), INPUT_REPO: randomString(), INPUT_TOKEN: '', INPUT_WORKFLOW_ID: randomString()},
    {INPUT_ACTION: '' as ToggleAction, INPUT_OWNER: randomString(), INPUT_REPO: randomString(), INPUT_TOKEN: randomString(), INPUT_WORKFLOW_ID: randomString()},
  ]
  it.each(missingCases)('fails if required input is missing: ($INPUT_ACTION, $INPUT_TOKEN, $INPUT_WORKFLOW_ID)', (inputs) => {
    setEnv(inputs);
    expect(parseInputs).toThrow()
  })

  const happyCases: TestInputs[] = [
    {INPUT_ACTION: 'disable', INPUT_OWNER: randomString(), INPUT_REPO: randomString(), INPUT_TOKEN: randomString(), INPUT_WORKFLOW_ID: randomString()},
    {INPUT_ACTION: 'enable', INPUT_OWNER: randomString(), INPUT_REPO: randomString(), INPUT_TOKEN: randomString(), INPUT_WORKFLOW_ID: randomString()},
  ]
  it.each(happyCases)('successfully parses inputs: ($INPUT_ACTION, $INPUT_OWNER, $INPUT_REPO, $INPUT_TOKEN, $INPUT_WORKFLOW_ID)', (inputs) => {
    setEnv(inputs);
    const parsedInputs = parseInputs()
    expect(parsedInputs.action).toBe(inputs.INPUT_ACTION)
    expect(parsedInputs.owner).toBe(inputs.INPUT_OWNER)
    expect(parsedInputs.repo).toBe(inputs.INPUT_REPO)
    expect(parsedInputs.token).toBe(inputs.INPUT_TOKEN)
    expect(parsedInputs.workflow_id).toBe(inputs.INPUT_WORKFLOW_ID)
  })
});
