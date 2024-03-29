import { singleton } from 'tsyringe';
import { WorkflowClient } from './WorkflowClient';
import { Inputs } from './input';
import { setFailed } from '@actions/core';

@singleton()
export class ActionRunner {
  public constructor(private readonly workflowClient: WorkflowClient) {}

  public async run(inputs: Inputs) {
    const { action, owner, repo, workflow_id } = inputs;
    return await this.workflowClient.toggleWorkflow(owner, repo, workflow_id, action);
  }
}
