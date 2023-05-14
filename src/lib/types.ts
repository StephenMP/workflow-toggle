import { GitHub } from '@actions/github/lib/utils';
import {
  GetResponseDataTypeFromEndpointMethod,
  GetResponseTypeFromEndpointMethod,
  RequestParameters,
} from '@octokit/types';

// Injectable Octokit class
export class Octokit extends GitHub {}

// Response types
const fakeOctokit = {} as Octokit;
export type GetWorkflowResponse = GetResponseTypeFromEndpointMethod<typeof fakeOctokit.rest.actions.getWorkflow>;
export type GetWorkflowData = GetResponseDataTypeFromEndpointMethod<typeof fakeOctokit.rest.actions.getWorkflow>;
export type ToggleWorkflowResponse = GetResponseTypeFromEndpointMethod<typeof fakeOctokit.rest.actions.enableWorkflow>;
export type ToggleWorkflowParams = RequestParameters &
  Omit<
    {
      owner: string;
      repo: string;
      workflow_id: string | number;
    },
    'baseUrl' | 'headers' | 'mediaType'
  >;
export type ToggleWorkflowResult = {
  success: boolean;
  message?: string;
};
