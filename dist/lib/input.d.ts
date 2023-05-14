export type ToggleAction = 'enable' | 'disable';
export interface Inputs {
    token: string;
    workflow_id: string;
    action: ToggleAction;
    owner: string;
    repo: string;
}
export declare function parseInputs(): Inputs;
//# sourceMappingURL=input.d.ts.map