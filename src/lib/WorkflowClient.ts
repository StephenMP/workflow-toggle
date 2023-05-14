import { injectable } from 'tsyringe';
import { ToggleAction } from './input';
import { Octokit, ToggleWorkflowParams, ToggleWorkflowResponse, ToggleWorkflowResult } from './types';
import { OctokitResponse } from '@octokit/types';

@injectable()
export class WorkflowClient {
  constructor(private readonly octokit: Octokit) {}

  private async _toggleWorkflow(
    params: ToggleWorkflowParams,
    action: (params: ToggleWorkflowParams) => Promise<OctokitResponse<never, 204>>,
  ): Promise<ToggleWorkflowResult> {
    try {
      /*
       * Verify the workflow exists. Octokit will throw an Error with a message that has
       * NotFound if it can't find the workflow with the specified workflow_id. Thus, if
       * no Error is thrown, we know it exists and can perform our action.
       */
      await this.octokit.rest.actions.getWorkflow(params);
      const response = await action(params);
      return { success: response.status === 204 };
    } catch (e) {
      const error = e as Error;
      if (error.message.includes('NotFound')) {
        return {
          success: false,
          message: `A workflow with ID ${params.workflow_id} does not exist in ${params.owner}/${params.repo}`,
        };
      }

      return { success: false, message: error.message };
    }
  }

  public async toggleWorkflow(
    owner: string,
    repo: string,
    workflow_id: string,
    action: ToggleAction,
  ): Promise<ToggleWorkflowResult> {
    const params: ToggleWorkflowParams = { owner, repo, workflow_id };
    switch (action) {
      case 'disable':
        return await this._toggleWorkflow(params, this.octokit.rest.actions.disableWorkflow);
      case 'enable':
        return await this._toggleWorkflow(params, this.octokit.rest.actions.enableWorkflow);
      default:
        throw new Error(`The provided action ${action} is not supported!`);
    }
  }
}
