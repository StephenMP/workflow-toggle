import {expect, test} from '@jest/globals'
import {fail} from 'assert'
import nock from 'nock'
import {v4} from 'uuid'
import {main, ToggleAction} from '../src/main'

const getKeyValue =
  <U extends keyof T, T extends object>(key: U) =>
  (obj: T) =>
    obj[key]

type TestInputs = {
  INPUT_TOKEN?: string
  INPUT_WORKFLOW_ID?: string
  INPUT_ACTION?: ToggleAction
  INPUT_OWNER?: string
  INPUT_REPO?: string
}

function setEnv(inputs: TestInputs) {
  for (const key in inputs) {
    process.env[key] = getKeyValue<keyof TestInputs, TestInputs>(
      key as keyof TestInputs
    )(inputs)
  }
}

function pass() {
  expect(true).toBe(true)
}

async function run(inputs: TestInputs) {
  setEnv(inputs)
  await main()
}

function nockWorkflowToggleCall(
  inputs: TestInputs,
  toggleAction: ToggleAction,
  shouldSucceed: boolean = true
): nock.Scope {
  const resource = `/repos/${inputs.INPUT_OWNER}/${inputs.INPUT_REPO}/actions/workflows/${inputs.INPUT_WORKFLOW_ID}/${toggleAction}`
  return nock('https://api.github.com')
    .put(resource)
    .reply(shouldSucceed ? 200 : 500)
}

test('should enable workflow', async () => {
  const inputs: TestInputs = {
    INPUT_TOKEN: v4(),
    INPUT_ACTION: 'enable',
    INPUT_WORKFLOW_ID: v4(),
    INPUT_OWNER: v4(),
    INPUT_REPO: v4()
  }

  const nockScope = nockWorkflowToggleCall(inputs, 'enable')

  try {
    await run(inputs)
    pass()
  } catch (e) {
    fail(e instanceof Error ? (e as Error) : 'Unknown')
  } finally {
    nockScope.done()
  }
})

test('should disable workflow', async () => {
  const inputs: TestInputs = {
    INPUT_TOKEN: v4(),
    INPUT_ACTION: 'disable',
    INPUT_WORKFLOW_ID: v4(),
    INPUT_OWNER: v4(),
    INPUT_REPO: v4()
  }

  const nockScope = nockWorkflowToggleCall(inputs, 'disable')

  try {
    await run(inputs)
    pass()
  } catch (e) {
    fail(e instanceof Error ? (e as Error) : 'Unknown')
  } finally {
    nockScope.done()
  }
})
