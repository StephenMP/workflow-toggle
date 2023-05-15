import { setFailed } from '@actions/core';
import { getOctokit } from '@actions/github';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { ActionRunner } from './lib/ActionRunner';
import { WorkflowClient } from './lib/WorkflowClient';
import { parseInputs } from './lib/input';
import { logger } from './lib/logger';
import { Octokit } from './lib/types';

export async function main() {
  logger.info('=========================');
  logger.info('Beginning Workflow Toggle');
  logger.info('=========================\n');

  // Get inputs necessary to register services for DI
  const inputs = parseInputs();

  // Setup DI
  container
    .register<Octokit>(Octokit, { useValue: getOctokit(inputs.token) })
    .register<WorkflowClient>(WorkflowClient, { useClass: WorkflowClient })
    .registerSingleton<ActionRunner>(ActionRunner);

  // Execute action
  const result = await container.resolve(ActionRunner).run(inputs);
  if (!result.success) {
    throw new Error(result.message);
  }
}

main()
  .then(() => {
    logger.info('========================');
    logger.info('Finished Workflow Toggle');
    logger.info('========================');
  })
  .catch((e: Error) => {
    logger.info('======================');
    logger.info('Failed Workflow Toggle');
    logger.info('======================');
    logger.error(e);
    setFailed(e);
  });
