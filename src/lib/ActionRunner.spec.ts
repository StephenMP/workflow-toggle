import 'reflect-metadata';
import { createMock } from '@golevelup/ts-jest';
import { WorkflowClient } from './WorkflowClient';
import { ToggleWorkflowResult } from './types';
import { ActionRunner } from './ActionRunner';
import { Inputs, ToggleAction } from './input';
import { faker } from '@faker-js/faker';

const mockInputs: Omit<Inputs, 'action'> = {
  owner: faker.word.noun(),
  repo: faker.word.noun(),
  token: faker.datatype.uuid(),
  workflow_id: faker.word.noun(),
};

describe('ActionRunner', () => {
  const actionCases: { action: ToggleAction; success: boolean }[] = [
    { action: 'enable', success: true },
    { action: 'enable', success: false },
    { action: 'disable', success: true },
    { action: 'disable', success: false },
  ];
  it.each(actionCases)('returns $success result when toggle succeeds/fails', async ({ action, success }) => {
    const mockActionInput: Inputs = {
      ...mockInputs,
      action,
    };
    const mockWorkflowClient = createMock<WorkflowClient>({
      toggleWorkflow: jest.fn().mockResolvedValue({ success: success }),
    });
    const mockActionRunner = new ActionRunner(mockWorkflowClient);
    const result = await mockActionRunner.run(mockActionInput);
    expect(result.success).toBe(success);
  });
});
