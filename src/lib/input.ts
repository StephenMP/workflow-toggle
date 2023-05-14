import { logger } from './logger';
import { getInput } from '@actions/core';
import { context } from '@actions/github';

export type ToggleAction = 'enable' | 'disable';

export interface Inputs {
  token: string;
  workflow_id: string;
  action: ToggleAction;
  owner: string;
  repo: string;
}

const keys = {
  token: 'token',
  workflow_id: 'workflow_id',
  action: 'action',
  owner: 'owner',
  repo: 'repo',
};

export function parseInputs(): Inputs {
  return logger.groupSync('Parsing inputs', () => {
    const inputs: Inputs = {
      token: getInput(keys.token, { required: true }),
      workflow_id: getInput(keys.workflow_id, { required: true }),
      action: getInput(keys.action, { required: true }) as ToggleAction,
      owner: getInput(keys.owner, { required: false }) || context.repo.owner,
      repo: getInput(keys.repo, { required: false }) || context.repo.repo,
    };

    logger.info('Inputs:');
    logger.info(JSON.stringify(inputs, null, 2));

    return inputs;
  });
}
