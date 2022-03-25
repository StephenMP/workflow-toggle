import * as core from '@actions/core'
import * as github from '@actions/github'

export type ToggleAction = 'enable' | 'disable'
type Inputs = {
  token: string
  workflow_id: string
  action: ToggleAction
  owner: string
  repo: string
}

const keys = {
  token: 'token',
  workflow_id: 'workflow_id',
  action: 'action',
  owner: 'owner',
  repo: 'repo'
}

function parseInputs(): Inputs {
  core.info('Parsing inputs')
  const inputs: Inputs = {
    token: core.getInput(keys.token, {required: true}),
    workflow_id: core.getInput(keys.workflow_id, {required: true}),
    action: core.getInput(keys.action, {required: true}) as ToggleAction,
    owner: core.getInput(keys.owner) || github.context.repo.owner,
    repo: core.getInput(keys.repo) || github.context.repo.repo
  }

  core.info(
    `Inputs: ${JSON.stringify(
      {
        ...inputs,
        githubToken: `${inputs.token.substring(0, 5)}...`
      },
      null,
      2
    )}`
  )

  return inputs
}

export async function main(): Promise<void> {
  try {
    const {token, action, workflow_id, owner, repo} = parseInputs()
    const octokit = github.getOctokit(token)
    const requestBody = {owner, repo, workflow_id}

    if (action === 'enable') {
      core.info('Enabling workflow')
      await octokit.rest.actions.enableWorkflow(requestBody)
    } else if (action === 'disable') {
      core.info('Disabling workflow')
      await octokit.rest.actions.disableWorkflow(requestBody)
    } else {
      throw new Error(`${action} is an unsupported toggle action!`)
    }
  } catch (error) {
    throw error
  }
}

main()
  .then(() => core.info('Done :)'))
  .catch(error => {
    if (error instanceof Error) {
      core.setFailed(error)
    }
  })
