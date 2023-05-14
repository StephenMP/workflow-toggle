import { getOctokit } from '@actions/github';
import { faker } from '@faker-js/faker';
import nock from 'nock';
import 'reflect-metadata';
import { WorkflowClient } from './WorkflowClient';
import { ToggleWorkflowParams } from './types';
import { ToggleAction } from './input';

const mockRepoContext = {
  owner: faker.word.noun(),
  repo: faker.word.noun(),
};

function nockGetWorkflowCall(workflowId: string | number, shouldSucceed: boolean = true): nock.Scope {
  const resource = `/repos/${mockRepoContext.owner}/${mockRepoContext.repo}/actions/workflows/${workflowId}`;
  return nock('https://api.github.com')
    .get(resource)
    .reply(shouldSucceed ? 200 : 500);
}

function nockWorkflowToggleCall(
  workflowId: string | number,
  toggleAction: ToggleAction,
  shouldSucceed: boolean = true,
): nock.Scope {
  const resource = `/repos/${mockRepoContext.owner}/${mockRepoContext.repo}/actions/workflows/${workflowId}/${toggleAction}`;
  return nock('https://api.github.com')
    .put(resource)
    .reply(shouldSucceed ? 200 : 500);
}

describe('WorkflowClient', () => {
  describe('toggleWorkflow', () => {
    const toggleCases: { action: ToggleAction }[] = [{ action: 'enable' }, { action: 'disable' }];
    const mockParams: ToggleWorkflowParams = {
      ...mockRepoContext,
      workflow_id: faker.word.noun(),
    };

    it.each(toggleCases)("returns false success when workflow doesn't exist", async ({ action }) => {
      const mockOctokit = getOctokit('fake');
      const mockWorkflowClient = new WorkflowClient(mockOctokit);
      const nockScope = nockGetWorkflowCall(mockParams.workflow_id, false);

      const result = await mockWorkflowClient.toggleWorkflow(
        mockParams.owner,
        mockParams.repo,
        String(mockParams.workflow_id),
        action,
      );
      expect(result.success).toBe(false);

      nockScope.done();
    });

    it.each(toggleCases)('returns false success when workflow toggle failed', async ({ action }) => {
      const nockScopes: nock.Scope[] = [];
      const mockOctokit = getOctokit('fake');
      const mockWorkflowClient = new WorkflowClient(mockOctokit);
      nockScopes.push(nockGetWorkflowCall(mockParams.workflow_id, true));
      nockScopes.push(nockWorkflowToggleCall(mockParams.workflow_id, action, false));

      const result = await mockWorkflowClient.toggleWorkflow(
        mockParams.owner,
        mockParams.repo,
        String(mockParams.workflow_id),
        action,
      );
      expect(result.success).toBe(false);

      nockScopes.forEach((ns) => {
        ns.done();
      });
    });

    it.each(toggleCases)('returns true success when workflow toggle succeeds', async ({ action }) => {
      const nockScopes: nock.Scope[] = [];
      const mockOctokit = getOctokit('fake');
      const mockWorkflowClient = new WorkflowClient(mockOctokit);
      nockScopes.push(nockGetWorkflowCall(mockParams.workflow_id, true));
      nockScopes.push(nockWorkflowToggleCall(mockParams.workflow_id, action, true));

      const result = await mockWorkflowClient.toggleWorkflow(
        mockParams.owner,
        mockParams.repo,
        String(mockParams.workflow_id),
        action,
      );
      expect(result.success).toBe(false);

      nockScopes.forEach((ns) => {
        ns.done();
      });
    });
  });
});
