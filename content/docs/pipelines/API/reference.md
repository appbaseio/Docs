

## Pipeline ID 

Auto-generated unique identifier for pipeline.

## Enable Pipeline 

Set as 'false' to disable a Pipeline. Defaults to 'true'.

## Description 

Description of pipeline.

## Priority 

In case of a conflict in pipeline routes, the pipeline with highest priority would get invoked.

## Routes  *required

Pipeline routes.

### Path  *required

Route path. For example, '/books-search'

### Method  *required

HTTP method for route.

### Record Logs 

If set to 'true', then Appbase would record logs for the pipeline route. Defaults to 'false'.

### Classify Route 

Useful to categorize the route.

#### Category  *required

Route category.

#### ACL 

It a sub-category of category.

## Pipeline Environments 

Useful to define custom environment variables which could be accessed by stages during pipeline execution.

## Trigger Expression 

Trigger expression is to define the condition of Pipeline invocation. For example, only execute pipeline if query is 'mobile phones'. Check the documentation at [here](https://docs.appbase.io/docs/search/rules/#configure-if-condition).

### Trigger Type 

Type of trigger expression. You can read more at [here](https://docs.appbase.io/docs/search/rules/#configure-if-condition).

### Trigger Expression 

Custom trigger expression. You can read more at [here](https://docs.appbase.io/docs/search/rules/#advanced-editor).

### Timeframe 

To define the valid timeframe for trigger expression.

#### start_time 

#### end_time 

## Stages  *required

Pipeline stages

### Pre-built Stage 

Use a pre-built stage from Appbase.

### Stage Id 

User-defined unique identifier for stages. It is useful to define stage dependencies using 'needs' property.

### Enabled 

Set to 'false' to disable a stage. Defaults to 'true'.

### Execute Asynchronously 

If set to 'true', then stage would get executed in parallel to other stages. Async stages can not modify the global 'request' and 'response' properties. Although, you can define a synchronous stage to consume the data of async stage (would be present in global context with stage id) to modify the global request/response.

### Script 

Custom script to modify the request/response. You can also write custom variables to global context which can be consumed by other stages.

### Script Reference 

Path to script file.

### Continue on Error 

If set to 'false' and an error occurs in stage execution, then Pipeline execution would stop immediately with an error.

### Stage Inputs 

Inputs required for a pre-built stage execution. The inputs structure may vary for each stage.

### Needs 

Useful to define the dependencies among stages. For example, if stage 'A' depends on stages 'B' and 'C' then stage 'A' would define 'needs' property as ['B', 'C']. Stage 'A' would only get executed once the stages 'B' and 'C' are completed.

### Description 

User-defined description for stage.

### Trigger 

Trigger will indicate whether or not to trigger the stage.

#### Trigger Expression 

Custom trigger expression. You can read more at [here](https://docs.appbase.io/docs/search/rules/#advanced-editor).

## Global Envs 

Global Envs will be saved to the cluster and can be used in the pipeline.

### id 

### label 

### key 

### value 

### description 

### validate 

#### url 

#### method 

#### body 

#### headers 

#### expected_status 

### created_at 

### updated_at 

