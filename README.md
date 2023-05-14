# Toggle Workflow
This action allows you to enable/disable a GitHub Actions Workflow.

## Documentation
### Usage
```yaml
- name: Toggle Workflow
  uses: StephenMP/workflow-toggle@v2
  with:
    token: ${{ secrets.YOUR_GITHUB_TOKEN }}
    workflow_id: YourWorkflow.yaml
    action: enable # Or disable
    owner: YourOrgOrUser
    repo: YourRepo
```

### Inputs

|Input|Required|Default|Description|
|-|-|-|-|
|token|yes||A GitHub access token with the "workflow" scope|
|workflow_id|yes||The workflow file name or the workflow ID|
|action|yes||Either "enable" or "disable" to enable/disable the workflow|
|owner|no|The owner of the repository calling the action|The repo owner (defaults to owner of the running action)|
|repo|no|The repository calling the action|The repo with the workflow to disable (defaults to repo of the running action)|
