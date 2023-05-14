import { getOctokit } from '@actions/github';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { ActionRunner } from './lib/ActionRunner';
import { WorkflowClient } from './lib/WorkflowClient';
import { parseInputs } from './lib/input';
import { logger } from './lib/logger';
import { Octokit } from './lib/types';
import { setFailed } from '@actions/core';

async function main() {
  logger.info('========================');
  logger.info('Beginning Rerun Workflow');
  logger.info('========================\n');

  // Get inputs necessary to register services for DI
  const inputs = parseInputs();

  // Setup DI
  container
    .register<Octokit>(Octokit, { useValue: getOctokit(inputs.token) })
    .register<WorkflowClient>(WorkflowClient, { useClass: WorkflowClient })
    .registerSingleton<ActionRunner>(ActionRunner);

  // Execute action
  return await container.resolve(ActionRunner).run(inputs);
}

main()
  .then(() => {
    logger.info('=======================');
    logger.info('Finished Rerun Workflow');
    logger.info('=======================');
  })
  .catch((e: Error) => {
    logger.error(e);
    setFailed(e);
  });
