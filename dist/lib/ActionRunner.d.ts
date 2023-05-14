import { WorkflowClient } from './WorkflowClient';
import { Inputs } from './input';
export declare class ActionRunner {
    private readonly workflowClient;
    constructor(workflowClient: WorkflowClient);
    run(inputs: Inputs): Promise<void>;
}
//# sourceMappingURL=ActionRunner.d.ts.map