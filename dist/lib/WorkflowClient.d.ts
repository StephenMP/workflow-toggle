import { ToggleAction } from './input';
import { Octokit, ToggleWorkflowResult } from './types';
export declare class WorkflowClient {
    private readonly octokit;
    constructor(octokit: Octokit);
    private _toggleWorkflow;
    toggleWorkflow(owner: string, repo: string, workflow_id: string, action: ToggleAction): Promise<ToggleWorkflowResult>;
}
//# sourceMappingURL=WorkflowClient.d.ts.map