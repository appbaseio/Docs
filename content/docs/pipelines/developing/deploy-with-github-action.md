---
title: 'Deploy Pipeline using GitHub Action'
meta_title: 'Deploy ReactiveSearch Pipeline using GitHub Action'
meta_description: 'Learn how to deploy a reactivesearch pipeline by using github actions.'
keywords:
    - github
    - action
    - appbase.io
    - elasticsearch
    - pipelines
    - reactivesearch
sidebar: 'docs'
---

Deploying a ReactiveSearch pipeline with many dependency files can be a tiresome job. Our GitHub Action makes it easy to deploy and redeploy the pipeline automatically.

The only condition for this is that the pipeline should be present in a GitHub repository which is probably what a lot of developers are going to do while creating a ReactiveSearch Pipeline.

## About the Action

The [pipeline-action](https://github.com/marketplace/actions/reactivesearch-pipelines) can be found in the GitHub marketplace. This action was created with the developers in mind that would want to have a way to just make changes to any of the pipeline files and the deployment would be handled automatically.

## Things to note

### Appbaseio URL

This action requires just an appbaseio URL in order to work. This URL can be found in the deployed cluster settings over in the [dashboard](https://dashboard.appbase.io)

It is best to save the URL as secret and reference it in the action in the following way:

```yml
- name: Deploy ReactiveSearch Pipeline
  uses: appbaseio/pipelines-action
  with:
    url: ${{secrets.APPBASEIOURL}}
```

## How does it work

This action is aimed at deploying the pipeline automatically.

This means the dependencies of a pipeline (`scriptRef`'s) will be found automatically and attached accordingly. Moreover, it also allows the possibility to use GitHub Secret.

### Using GitHub secret in envs

GitHub does not allow direct access to secrets (even to actions) so the envs cannot be directly parsed in the pipeline file. Thus, the envs need to be passed in the action steps env that maps to a GitHub Secret.

This can be done in the following way:

```yml
- name: Deploy Pipeline
  uses: appbaseio/pipelines-action@0.1.1
  with:
    url: ${{secrets.APPBASEIOURL}}
    file: "./basic/pipeline.yaml"
  env:
    ENV_VALUE: ${{ secrets.ENV_VALUE_SECRET }}
```

And the pipeline file will be defined in the following way:

```yml
- envs:
    SOME_ENV_KEY: ${{ ENV_VALUE }}
```

> Note that the `ENV_VALUE` field is a key in the github yml and a value wrapped in `${{}}` in the pipeline file. It is important that the strings match in order for auto environment replacement.

## When to use it

This action should be used in a GitHub workflow that is triggered when there is a change in the pipeline repo or any of it's files. This makes sense because everytime the action is triggered, it will **update** the pipelines contents in the server leading to a __redeploy__ of the pipeline.

Simplest way to set the GitHub workflow up is to make it triggered on `push`. This can be done in the following way:

```yml
on: [push]
```

### Complete example usage

Following yml shows how the pipeline action can be used to create workflow on a repo. This workflow will be triggered everytime there is a push to it.

```yml
on: [push]

jobs:
  pipeline_deploy:
    runs-on: ubuntu-latest
    name: A job to deploy pipeline from the GitHub repo
    steps:
      - name: Checkout repo
        uses: actions/checkout@v2
      - name: Deploy ReactiveSearch Pipeline
        uses: appbaseio/pipelines-action
        with:
          url: ${{secrets.APPBASEIOURL}}
```

## Read More

More information can be found about the pipeline [on GitHub marketplace](https://github.com/marketplace/actions/reactivesearch-pipelines) or in the pipelines repository [here](https://github.com/appbaseio/pipelines-action)