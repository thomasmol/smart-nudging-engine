
## API Documentation

### GET `/api/configurations`

Returns a list of all configurations.

#### Request Parameters

None.

#### Response Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Yes | The unique identifier for the configuration. |
| name | string | Yes | The name of the configuration. |
| algorithm | string | Yes | The algorithm used for the configuration. |
| generate | boolean | No | Indicates if the configuration should be generated. |
| generate_model | string | No | The model to be used for the configuration generation. |
| deconstructed_prompt | JSON | No | The deconstructed prompt for the configuration. |
| decision_time_weight | float | Yes | The decision time weight of the configuration. |
| start_datetime | datetime | Yes | The start date and time of the configuration. |
| end_datetime | datetime | Yes | The end date and time of the configuration. |
| GroupConfiguration | JSON | No | The configuration of the nudgee groups. |
| MetricTypeWeight | JSON | No | The weight of the metric types. |
| NudgeeWeights | JSON | No | The weights of the nudgees. |

### POST `/api/configurations`

Creates a new configuration.

#### Request Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| name | string | Yes | The name of the configuration. |
| algorithm | string | Yes | The algorithm used for the configuration. |
| generate | boolean | No | Indicates if the configuration should be generated. |
| generate_model | string | No | The model to be used for the configuration generation. |
| deconstructed_prompt | JSON | No | The deconstructed prompt for the configuration. |
| decision_time_weight | float | Yes | The decision time weight of the configuration. |
| start_datetime | datetime | Yes | The start date and time of the configuration. |
| end_datetime | datetime | Yes | The end date and time of the configuration. |
| groups | list of strings | Yes | The IDs of the nudgee groups for the configuration. |
| metric_type_weights_zipped | list of JSON objects | Yes | The weights of the metric types for the configuration. |

#### Response Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | Yes | The unique identifier for the configuration. |
| name | string | Yes | The name of the configuration. |
| algorithm | string | Yes | The algorithm used for the configuration. |
| generate | boolean | No | Indicates if the configuration should be generated. |
| generate_model | string | No | The model to be used for the configuration generation. |
| deconstructed_prompt | JSON | No | The deconstructed prompt for the configuration. |
| decision_time_weight | float | Yes | The decision time weight of the configuration. |
| start_datetime | datetime | Yes | The start date and time of the configuration. |
| end_datetime | datetime | Yes | The end date and time of the configuration. |
| GroupConfiguration | JSON | No | The configuration of the nudgee groups. |
| MetricTypeWeight | JSON | No | The weight of the metric types. |
| NudgeeWeights | JSON | No | The weights of the nudgees. |
# API Documentation: `/api/configurations/[id]`

This API allows you to `GET`, `PUT`, and `DELETE` configurations by their `id`.

## GET

Returns a configuration object matching the specified `id`.

### Request

| Field | Type     | Required? | Description        |
|-------|----------|-----------|--------------------|
| `id`  | `string` | Yes       | The ID of the configuration to retrieve. |

### Response

On success, returns a `Configuration` object with the following fields:

| Field                  | Type                    | Description                                |
|------------------------|-------------------------|--------------------------------------------|
| `id`                   | `string`                | The ID of the configuration.               |
| `name`                 | `string`                | The name of the configuration.             |
| `algorithm`            | `string`                | The algorithm used for the configuration.  |
| `generate`             | `boolean`               | Whether the configuration was generated.   |
| `generate_model`       | `string` or `null`      | The model generated for the configuration. |
| `deconstructed_prompt` | `object` or `null`      | The deconstructed prompt for the configuration. |
| `decision_time_weight` | `number`                | The decision time weight of the configuration. |
| `start_datetime`       | `string` (ISO 8601)     | The start datetime of the configuration.   |
| `end_datetime`         | `string` (ISO 8601)     | The end datetime of the configuration.     |
| `GroupConfiguration`   | `Array<GroupConfig>`    | The group configurations for the configuration.|
| `MetricTypeWeight`     | `Array<MetricTypeWt>`   | The metric-type weight configurations for the configuration.|
| `NudgeeWeights`        | `Array<NudgeeWeight>`   | The nudgee weight configurations for the configuration. |

#### GroupConfig

| Field    | Type            | Description                              |
|----------|----------------|------------------------------------------|
| `id`     | `string`       | The ID of the group configuration.       |
| `group`  | `Group` object | The group associated with the configuration. |

#### MetricTypeWt

| Field           | Type                | Description                                             |
|----------------|---------------------|---------------------------------------------------------|
| `id`           | `string`            | The ID of the metric-type weight configuration.           |
| `metric_type`  | `MetricType` object | The metric-type associated with the weight configuration. |
| `weight`       | `number` (0-1)      | The weight assigned to the metric-type.                   |

#### NudgeeWeight

| Field        | Type        | Description                                |
|--------------|-------------|--------------------------------------------|
| `id`         | `string`    | The ID of the nudgee weight configuration. |
| `nudgee_id`  | `string`    | The ID of the nudgee.                      |
| `weights`    | `object`    | Object containing keys that correspond to configuration IDs and values as the assigned weight for the nudgee. |

## PUT

Updates an existing configuration.

### Request

| Field                    | Type                 | Required? | Description                                                                         |
|--------------------------|----------------------|-----------|-------------------------------------------------------------------------------------|
| `id`                     | `string`             | Yes       | The ID of the configuration to update.                                              |
| `name`                   | `string`             | Yes       | The name of the configuration.                                                      |
| `algorithm`              | `string`             | Yes       | The algorithm used for the configuration.                                           |
| `generate`               | `boolean`            | Yes       | Whether the configuration is generated or not.                                      |
| `generate_model`         | `string` or `null`   | No        | The name of the model generated for the configuration (if generated is `true`).    |
| `deconstructed_prompt`   | `object` or `null`   | No        | The deconstructed prompt of the configuration.                                     |
| `decision_time_weight`   | `number` (0-1)       | Yes       | The decision time weight of the configuration.                                      |
| `start_datetime`         | `string` (ISO 8601)  | Yes       | The start datetime of the configuration.                                            |
| `end_datetime`           | `string` (ISO 8601)  | Yes       | The end datetime of the configuration.                                              |
| `groups`                 | `Array<string>`      | Yes       | Array of group IDs associated with the configuration.                               |
| `metric_type_weights_zip`| `Array<w-MetricType>`| Yes       | Array of objects containing metric type ID and weight assigned
## POST /api/configurations/:id/groups/:group_id

Adds a group to a configuration.

### Request Parameters

| Field       | Type     | Required | Description                                   |
| ----------- | -------- | -------- | --------------------------------------------- |
| `id`        | `string` | Yes      | The ID of the configuration to add the group to |
| `group_id`  | `string` | Yes      | The ID of the group to add to the configuration |

### Response Parameters

| Field            | Type     | Description                             |
| ---------------- | -------- | --------------------------------------- |
| `configuration_id` | `string` | The ID of the configuration the group was added to |
| `group_id`       | `string` | The ID of the group that was added       |

## PUT /api/configurations/:id/groups/:group_id

Updates a group in a configuration.

### Request Parameters

| Field       | Type     | Required | Description                                         |
| ----------- | -------- | -------- | --------------------------------------------------- |
| `id`        | `string` | Yes      | The ID of the configuration that contains the group |
| `group_id`  | `string` | Yes      | The ID of the group to update                       |

### Response Parameters

| Field            | Type     | Description                                |
| ---------------- | -------- | ------------------------------------------ |
| `configuration_id` | `string` | The ID of the configuration the group was updated in |
| `group_id`       | `string` | The ID of the group that was updated        |

## DELETE /api/configurations/:id/groups/:group_id

Deletes a group from a configuration.

### Request Parameters

| Field       | Type     | Required | Description                                          |
| ----------- | -------- | -------- | ---------------------------------------------------- |
| `id`        | `string` | Yes      | The ID of the configuration that contains the group  |
| `group_id`  | `string` | Yes      | The ID of the group to delete from the configuration |

### Response Parameters

| Field    | Type     | Description            |
| -------- | -------- | ---------------------- |
| `success` | `boolean` | `true` if deletion was successful, `false` otherwise |
## API Route: /api/configurations/[id]/metric-weights/[metric_id]/+server.ts

### POST

Creates a new metric type weight.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | The ID of the configuration to associate the metric type weight with |
| metric_id | string | Yes | The ID of the metric type to associate the weight with |
| weight | number | Yes | The weight value to be associated with the metric type |

#### Response

Returns a JSON representation of the newly created metric type weight.

### PUT

Updates an existing metric type weight.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | The ID of the configuration to associate the metric type weight with |
| metric_id | string | Yes | The ID of the metric type to associate the weight with |
| weight | number | Yes | The updated weight value to be associated with the metric type |

#### Response

Returns a JSON representation of the updated metric type weight.

### DELETE

Deletes an existing metric type weight.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | The ID of the configuration to delete the metric type weight from |
| metric_id | string | Yes | The ID of the metric type to delete the weight from |

#### Response

Returns a JSON representation of the deleted metric type weight.
# API Route Documentation: /api/configurations/[id]/generate/+server.ts

## POST

Generates a nudge message according to the configuration parameters and saves it as a new nudge in the database.

### Request Parameters

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| id    | string | Yes    | The ID of the configuration for which to generate a nudge. |

### Response Parameters

If the request is successful, the response will be a JSON string containing the generated nudge message.

### Errors

| Status Code | Response |
| ----------- | -------- |
| 404         | `Configuration not found` if the specified configuration does not exist or is not marked for generation. |

### Example

```http
POST /api/configurations/123456/generate HTTP/1.1
Content-Type: application/json

{
	"id": "123456"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

"Here's your personalized nudge message — it's really great!"
```
# API Documentation

## Update Nudgee Weights

Updates the weights assigned to each component value for a specific nudgee under a particular configuration.

- Endpoint: `/api/configurations/:id/nudgee-weights`
- Method: `PUT`

### Request Parameters

| Field        | Type                                 | Required | Description                                                                                                         |
|--------------|--------------------------------------|----------|---------------------------------------------------------------------------------------------------------------------|
| id           | string                               | Yes      | The ID of the configuration whose nudgee weights will be updated.                                                  |
| nudgee_id    | string                               | Yes      | The ID of the nudgee whose weights will be updated.                                                                 |
| nudge_id     | string                               | Yes      | The ID of the nudge that triggered the update.                                                                      |
| effectiveness| number                               | Yes      | The effectiveness of the nudge. It is a value between 0 and 1.                                                      |


### Response Parameters

| Field        | Type          | Description                                        |
|--------------|---------------|----------------------------------------------------|
|              | Response      | Returns an empty HTTP response object.             |
## `/api/metrics` Endpoint

This API endpoint has two functions: `GET` and `POST`. The `GET` function returns an array of `MetricType` objects, whereas the `POST` function creates a new `MetricType` object in the database.

### GET Request

Retrieves all existing `MetricType` objects from the database.

#### Request

| Field | Type | Required | Description |
|-------|------|----------|-------------|
|       |      |          |             |

#### Response

| Field | Type | Description                                                                                                                                  |
|-------|------|----------------------------------------------------------------------------------------------------------------------------------------------|
| id    | UUID | The unique identifier of the `MetricType`.                                                                                                    |
| label | string | The human-readable label of the `MetricType`.                                                                                               |  
| type | string | The type (e.g. "boolean", "number", "string") of the `MetricType`.                                                                                               | 

### POST Request

Creates a new `MetricType` object in the database with the given `label` and `type`.

#### Request

| Field | Type   | Required | Description                                  |
|-------|--------|----------|----------------------------------------------|
| label | string | yes      | The human-readable label of the `MetricType`. |
| type | string | yes      | The type (e.g. "boolean", "number", "string") of the `MetricType`. |

#### Response

| Field | Type | Description                                                         |
|-------|------|---------------------------------------------------------------------|
| id    | UUID | The unique identifier of the newly created `MetricType`.             |
| label | string | The human-readable label of the newly created `MetricType`.         |
| type | string | The type (e.g. "boolean", "number", "string") of the newly created `MetricType`. |
# API Documentation: /api/metrics/[id]

## Description:
This API endpoint is used for operations related to a specific metric type. It supports GET, PUT and DELETE HTTP methods.

## Request Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | String | Yes | The id of the metric type. |
| `label` | String | Yes (for PUT) | The label of the metric type. |
| `type` | String | Yes (for PUT) | The type of the metric type. |

## Response Parameters

| Field | Type | Description |
| --- | --- | --- |
| `id` | String | The id of the metric type. |
| `label` | String | The label of the metric type. |
| `type` | String | The type of the metric type. |
| `NudgeMetric` | Array | An array of NudgeMetric objects associated with this metric type. |
| `Action` | Array | An array of Action objects associated with this metric type. |

## HTTP Methods

### GET

**Endpoint:** `/api/metrics/[id]`

**Description:** Retrieves a metric type by id.

**Response:** A JSON object with the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `id` | String | The id of the metric type. |
| `label` | String | The label of the metric type. |
| `type` | String | The type of the metric type. |
| `NudgeMetric` | Array | An array of NudgeMetric objects associated with this metric type. |
| `Action` | Array | An array of Action objects associated with this metric type. |

### PUT

**Endpoint:** `/api/metrics/[id]`

**Description:** Updates a metric type by id.

**Request Parameters:** A JSON object with the following fields:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `label` | String | Yes | The label of the metric type. |
| `type` | String | Yes | The type of the metric type. |

**Response:** A JSON object with the updated metric type's fields:

| Field | Type | Description |
| --- | --- | --- |
| `id` | String | The id of the metric type. |
| `label` | String | The label of the metric type. |
| `type` | String | The type of the metric type. |
| `NudgeMetric` | Array | An array of NudgeMetric objects associated with this metric type. |
| `Action` | Array | An array of Action objects associated with this metric type. |

### DELETE

**Endpoint:** `/api/metrics/[id]`

**Description:** Deletes a metric type by id.

**Response:** A JSON object with a `success` field set to `true`.
# API Documentation: /api/groups

This API route allows you to retrieve and create groups.

## GET

Retrieves all groups with their associated Nudgees.

### Request

This endpoint has no request parameters.

### Response

Returns an array of `Group` objects with the following fields:

| Field         | Type          | Description                                           |
|---------------|---------------|-------------------------------------------------------|
| `id`          | string        | Unique identifier for the group.                      |
| `name`        | string        | The name of the group.                                 |
| `control`     | boolean       | Boolean indicating whether the group is a control group. |
| `created_at`  | string (date) | The date and time the group was created.               |
| `NudgeeGroup` | array         | An array of `NudgeeGroup` objects representing the association between the group and its members, which have the following fields: |
| `Nudgee`      | object        | The associated `Nudgee` object, which has the following fields: |
| `id`          | string        | The unique identifier for the `Nudgee`.                |
| `profile`     | object        | An optional JSON object representing the Nudgee's profile. |
| `created_at`  | string (date) | The date and time the `Nudgee` was created.             |

## POST

Creates a new group.

### Request

| Field     | Type    | Required | Description               |
|-----------|---------|----------|---------------------------|
| `name`    | string  | Yes      | The name of the group.     |
| `control` | boolean | Yes      | Indicator for control group |

### Response

Returns the created `Group` object, which has the following fields:

| Field         | Type          | Description                                           |
|---------------|---------------|-------------------------------------------------------|
| `id`          | string        | Unique identifier for the group.                      |
| `name`        | string        | The name of the group.                                 |
| `control`     | boolean       | Boolean indicating whether the group is a control group. |
| `created_at`  | string (date) | The date and time the group was created.               |
| `NudgeeGroup` | array         | An empty array since the group has no members yet.     |
# API Documentation: `/api/groups/[id]`

API route to get, update or delete a group by its `id`.

## `GET`

Returns the group information for the specified `id`.

### Request Parameters

| Field | Type   | Required | Description                    |
|-------|--------|----------|--------------------------------|
| `id`  | string | Yes      | The id of the group to retrieve |

### Response

Returns a JSON object with the following fields:

| Field | Type   | Description            |
|-------|--------|------------------------|
| `id`  | string | The id of the group     |
| `name`| string | The name of the group   |
| `control`| boolean | Whether the group is a control or not |
| `NudgeeGroup`| Array[{Nudgee}] | The list of nudgees associated with the group and their information |

## `PUT`

Updates the group information for the specified `id`.

### Request Parameters

| Field     | Type    | Required | Description                                                               |
|-----------|---------|----------|---------------------------------------------------------------------------|
| `id`      | string  | Yes      | The id of the group to update                                             |
| `name`    | string  | Yes      | The new name of the group                                                  |
| `control` | boolean | Yes      | Whether the group is a control or not                                      |

### Response

Returns a JSON object with the updated group information:

| Field | Type   | Description              |
|-------|--------|--------------------------|
| `id`  | string | The id of the group       |
| `name`| string | The updated name of group |
| `control`| boolean | Whether the group is a control or not |
| `NudgeeGroup`| Array[{Nudgee}] | The list of nudgees associated with the group and their information |

## `DELETE`

Deletes the group for the specified `id`.

### Request Parameters

| Field | Type   | Required | Description                     |
|-------|--------|----------|---------------------------------|
| `id`  | string | Yes      | The id of the group to delete |

### Response

Returns a JSON object containing a success message:

| Field     | Type    | Description                  |
|-----------|---------|------------------------------|
| `success` | boolean | Whether the operation was successful |
# API Documentation: /api/groups/[id]/nudgees

This route is used to add multiple Nudgees to a Group.

## Route

`POST /api/groups/:id/nudgees`

## Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| id   | string | Yes | The ID of the Group. |
| nudgees | array of strings | Yes | An array of Nudgee IDs to be added to the Group. |

## Response

If successful, the API will return a `200 OK` response with a JSON payload containing the following fields:

| Name | Type | Description |
| ---- | ---- | ----------- |
| success | boolean | A flag that indicated whether or not the operation was successful. | 

If the `nudgees` or `group_id` parameter is missing, the API will return an error response with a `500 Internal Server Error` status code and a JSON payload containing the following fields:

| Name | Type | Description |
| ---- | ---- | ----------- |
| message | string | A message describing the error. |

## Examples

### Request

```
POST /api/groups/123/nudgees HTTP/1.1
Content-Type: application/json

{
    "nudgees": ["456", "789"]
}
```

### Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
    "success": true
}
```
## /api/nudgees

This endpoint is used to retrieve and create `Nudgee` resources.

### GET
Retrieves all `Nudgees`.

#### Request
No request parameters needed.

#### Response
Returns an array of `Nudgee` objects with the following fields:

| Field         | Type   | Description                |
|---------------|--------|----------------------------|
| id            | string | The id of the nudgee        |
| profile       | json   | The profile of the nudgee   |
| created_at    | string | The creation timestamp     |
| NudgeeGroup   | array  | The nudgee groups           |
| NudgeRecipient| array  | The nudge recipients        |
| Action        | array  | The actions of the nudgee   |
| NudgeeWeights | array  | The nudgee weights          |

### POST
Creates a new `Nudgee`.

#### Request
| Field   | Type   | Required | Description                                      |
|---------|--------|----------|--------------------------------------------------|
| id      | string | No       | The id of the nudgee to create                    |
| profile | json   | Yes      | The profile of the nudgee. Should be a JSON object|

#### Response
Returns the created `Nudgee` object with the same fields as the GET request response.
# API Documentation

## /api/nudgees/[id]/+server.ts

These routes allow you to retrieve, modify, and delete a specific `Nudgee` object.

### GET

Retrieves a `Nudgee` object by its ID.

#### Request Parameters

| Field | Type   | Required | Description                  |
|-------|--------|----------|------------------------------|
| id    | string | Yes      | The ID of the Nudgee to fetch |

#### Response

On success, returns a `Nudgee` object.

| Field            | Type                          | Description                                                        |
|------------------|-------------------------------|--------------------------------------------------------------------|
| id               | string                        | The unique ID of the Nudgee                                        |
| profile          | JSON                          | The profile data of the Nudgee                                      |
| created_at       | string                        | The ISO-8601 timestamp when the Nudgee was created                  |
| NudgeeGroup      | Array of NudgeeGroup objects   | An array of NudgeeGroup objects associated with the Nudgee         |
| NudgeRecipient   | Array of NudgeRecipient objects| An array of NudgeRecipient objects associated with the Nudgee      |
| Action           | Array of Action objects        | An array of Action objects associated with the Nudgee              |
 

### PUT

Modifies a `Nudgee` object by its ID.

#### Request Parameters

| Field   | Type | Required | Description                                 |
|---------|------|----------|---------------------------------------------|
| id      | string | Yes      | The ID of the Nudgee to modify               |
| profile | JSON | Yes      | New profile data for the Nudgee              |

#### Response

On success, returns the updated `Nudgee` object.

| Field            | Type                          | Description                                                        |
|------------------|-------------------------------|--------------------------------------------------------------------|
| id               | string                        | The unique ID of the Nudgee                                        |
| profile          | JSON                          | The updated profile data of the Nudgee                              |
| created_at       | string                        | The ISO-8601 timestamp when the Nudgee was created                  |
| NudgeeGroup      | Array of NudgeeGroup objects   | An array of NudgeeGroup objects associated with the Nudgee         |
| Action           | Array of Action objects        | An array of Action objects associated with the Nudgee              |


### DELETE

Deletes a `Nudgee` object by its ID.

#### Request Parameters

| Field | Type   | Required | Description                  |
|-------|--------|----------|------------------------------|
| id    | string | Yes      | The ID of the Nudgee to delete|

#### Response

On success, returns `{ "success": true }`.
## `/api/nudgees/[id]/groups/[group_id]/+server.ts`

### POST

Creates a new nudgee-group association.

#### Request Parameters

| Field    | Type     | Required | Description                 |
| -------- | -------- | -------- | --------------------------- |
| `id`     | `string` | Yes      | The ID of the nudgee        |
| `group_id` | `string` | Yes   | The ID of the group         |

#### Responses

| Field      | Type     | Description                                  |
| ---------- | -------- | -------------------------------------------- |
| `response` | `JSON`   | The response containing the new association. |

### DELETE

Deletes an existing nudgee-group association.

#### Request Parameters

| Field    | Type     | Required | Description                  |
| -------- | -------- | -------- | ---------------------------- |
| `id`     | `string` | Yes      | The ID of the nudgee         |
| `group_id` | `string` | Yes   | The ID of the group          |

#### Responses

| Field      | Type     | Description                                      |
| ---------- | -------- | ------------------------------------------------ |
| `success`  | `boolean`| Indicates whether the association was deleted.  |
# API Documentation: /api/components

## GET

Returns a list of all component types with their associated component values.

| Field           | Type             | Required | Description                                    |
|-----------------|------------------|----------|------------------------------------------------|
| `undefined`     | `undefined`      | No       | No parameters are required for a GET request. |

### Response

Returns a JSON object with an array of `ComponentType` objects, each with an array of associated `ComponentValue` objects.

| Field                | Type             | Description                                       |
|----------------------|------------------|---------------------------------------------------|
| `id`                 | `string`         | The unique identifier for the component type.     |
| `label`              | `string`         | The label for the component type.                 |
| `data_type`          | `string`         | The data type associated with the component type. |
| `ComponentValue[]` | `array` of `object` | An array of associated `ComponentValue` objects.  |

## POST

Create a new component type.

| Field                | Type             | Required | Description                                       |
|----------------------|------------------|----------|---------------------------------------------------|
| `label`              | `string`         | Yes      | The label for the new component type.             |
| `data_type`          | `string`         | Yes      | The data type associated with the component type. |

### Response

Returns a JSON object with the new `ComponentType` object.

| Field          | Type             | Description                                 |
|----------------|------------------|---------------------------------------------|
| `id`           | `string`         | The unique identifier for the component type. |
| `label`        | `string`         | The label for the component type.                 |
| `data_type`    | `string`         | The data type associated with the component type. |
| `createdAt`  | `string`           | The timestamp for when the component type was created.     |
# API Documentation: `/api/components/[id]/+server.ts`

This API endpoint provides functionality to `GET`, `PUT`, and `DELETE` component types with the specified `id`. The `Content-Type` of the request and response body is `application/json`.

## GET

Retrieves the `ComponentType` object with the specified `id`.

### Request

| Field  | Type   | Required | Description      |
| ------ | ------ | -------- | ---------------- |
| `id`   | String | Yes      | ID of component. |

### Response

#### Success

Returns a `ComponentType` object with the specified `id`.

| Field             | Type            | Description          |
| ----------------- | --------------- | -------------------- |
| `id`              | `String`        | ID of the component. |
| `label`           | `String`        | Label of the component. |
| `data_type`       | `String`        | Data type of the component. |
| `ComponentValue`  | `Array<Object>` | Array of component values associated with this component type. |

#### Failure

If the `id` parameter is missing or invalid, the server will respond with a `404 Not Found` error.

## PUT

Updates the `ComponentType` object with the specified `id`.

### Request

| Field      | Type   | Required | Description           |
| ---------- | ------ | -------- | --------------------- |
| `id`       | String | Yes      | ID of component.       |
| `label`    | String | Yes      | New label of component.   |
| `data_type`| String | Yes      | New data type of component.   |

### Response

#### Success

Returns the updated `ComponentType` object.

| Field             | Type            | Description          |
| ----------------- | --------------- | -------------------- |
| `id`              | `String`        | ID of the component. |
| `label`           | `String`        | Label of the component. |
| `data_type`       | `String`        | Data type of the component. |
| `ComponentValue`  | `Array<Object>` | Array of component values associated with this component type. |

#### Failure

If the request body is missing any required parameters or the `id` parameter is missing or invalid, the server will respond with a `400 Bad Request` error.

## DELETE

Deletes the `ComponentType` object with the specified `id`.

### Request

| Field  | Type   | Required | Description      |
| ------ | ------ | -------- | ---------------- |
| `id`   | String | Yes      | ID of component. |

### Response

#### Success

Returns a JSON object with the key `success` set to `true`.

#### Failure

If the `id` parameter is missing or invalid, the server will respond with a `404 Not Found` error.
# API Documentation: `/api/components/[id]/values/+server.ts`

The following table summarizes the main parameters, types, and descriptions of HTTP request and response for `/api/components/[id]/values/+server.ts`.

## GET

### Request Parameters

| Field | Type   | Required | Description            |
| ----- | ------ | -------- | ---------------------- |
| id    | string | Yes      | Id of component type    |

### Response Parameters

| Field            | Type                  | Description                                  |
| ---------------- | --------------------- | -------------------------------------------- |
| id               | string                | id of component value record                 |
| value            | string                | value of component value record              |
| created_at       | string                | date and time when component was created     |
| component_type_id | string                | id of the linked component type record          |

## POST

### Request Parameters

| Field | Type   | Required | Description            |
| ----- | ------ | -------- | ---------------------- |
| value | string | Yes      | New component value    |
| id    | string | Yes      | Id of component type    |

### Response Parameters

| Field            | Type                  | Description                                  |
| ---------------- | --------------------- | -------------------------------------------- |
| id                | string                | id of component value record                 |
| value            | string                | value of component value record              |
| created_at       | string                | date and time when component was created     |
| component_type_id | string                | id of the linked component type record          |
# API Documentation: /api/components/[id]/values/[value_id]/+server.ts

This API route allows to manipulate values of a specific component type.

## `GET`

Retrieves a specific value of a component type with the given `value_id`.

### Request

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | String | Yes | The unique identifier of the component type |
| `value_id` | String | Yes | The unique identifier of the component value |

### Response

Returns a JSON string with the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `id` | String | The unique identifier of the component value |
| `component_type_id` | String | The unique identifier of the component type to which the value belongs |
| `value` | String | The value of the component |
| `ComponentType` | Object | The component type to which the value belongs |

## `PUT`

Updates a specific value of a component type with the given `value_id`.

### Request

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | String | Yes | The unique identifier of the component type |
| `value_id` | String | Yes | The unique identifier of the component value |
| `value` | String | Yes | The value to update |

### Response

Returns a JSON string with the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `id` | String | The unique identifier of the component value |
| `component_type_id` | String | The unique identifier of the component type to which the value belongs |
| `value` | String | The updated value of the component |
| `ComponentType` | Object | The component type to which the value belongs |

## `DELETE`

Deletes a specific value of a component type with the given `value_id`.

### Request

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | String | Yes | The unique identifier of the component type |
| `value_id` | String | Yes | The unique identifier of the component value |

### Response

Returns a JSON string with the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `success` | Boolean | Indicates if the deletion was successful or not |
# API Documentation: /api/actions

## POST /api/actions

Creates a new action.

### Request Parameters

| Field          | Type       | Required | Description                              |
|----------------|------------|----------|------------------------------------------|
|`nudgee_id`     |string      |yes       |The ID of the nudgee associated with the action.|
|`metric_type_id`|string      |yes       |The ID of the metric type associated with the action.|
|`metric_value`  |number      |yes       |The value of the metric associated with the action.|
|`created_at`    |string (ISO date)|no     |The timestamp of when the action was created. If not provided, the current date and time will be used.|

### Response Parameters

| Field      | Type               | Description                                                 |
|------------|--------------------|-------------------------------------------------------------|
| `id`       | string             | The ID of the created action.                                |
| `nudgee_id`| string             | The ID of the nudgee associated with the action.             |
| `metric_type_id`| string        | The ID of the metric type associated with the action.        |
| `metric_value`| number          | The value of the metric associated with the action.          |
| `created_at` | string (ISO date)| The timestamp of when the action was created.                |

### Example Request

```
POST /api/actions HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "nudgee_id": "abc123",
  "metric_type_id": "xyz789",
  "metric_value": 5
}
```

### Example Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
	"id": "123",
	"nudgee_id": "abc123",
	"metric_type_id": "xyz789",
	"metric_value": 5,
	"created_at": "2022-01-25T12:34:56.789Z"
}
```

## GET /api/actions

Returns a list of all actions.

### Response Parameters

| Field                     | Type               | Description                                              |
|---------------------------|--------------------|----------------------------------------------------------|
| `id`                      | string             | The ID of the action.                                     |
| `nudgee_id`               | string             | The ID of the nudgee associated with the action.          |
| `metric_type_id`          | string             | The ID of the metric type associated with the action.     |
| `metric_value`            | number             | The value of the metric associated with the action.       |
| `created_at`              | string (ISO date)   | The timestamp of when the action was created.             |
| `Nudgee`                  | object             | The nudgee associated with the action.                    |
| `MetricType`              | object             | The metric type associated with the action.               |
| `MetricType.NudgeMetric`  | object             | The nudge metric associated with the metric type.         |
| `MetricType.NudgeMetric.Nudge`| object         | The nudge associated with the nudge metric.               |

### Example Request

```
GET /api/actions HTTP/1.1
Host: localhost:3000
```

### Example Response

```
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": "123",
    "nudgee_id": "abc123",
    "metric_type_id": "xyz789",
    "metric_value": 5,
    "created_at": "2022-01-25T12:34:56.789Z",
    "Nudgee": {
	  ...
	},
    "MetricType": {
	  ...
      "NudgeMetric": [
        {
		...
        }
      ]
    }
  }
]
```
### `/api/actions/[id]`

This endpoint allows you to get, update, or delete an action by ID.

#### Method

- `GET`
- `PUT`
- `DELETE`

#### Request Parameters

| Field          | Type   | Required | Description                              |
| -------------- | ------ | -------- | ---------------------------------------- |
| `nudgee_id`    | string | Yes      | The ID of the Nudgee associated with this Action |
| `metric_type_id` | string | Yes      | The ID of the MetricType associated with this Action |
| `metric_value` | number | Yes      | The value of the metric for this Action    |

#### Response Parameters

| Field | Type | Description                          |
| ----- | ---- | ------------------------------------ |
| `id` | string | The ID of the Action |
| `nudgee_id` | string | The ID of the associated Nudgee |
| `metric_type_id` | string | The ID of the associated MetricType |
| `metric_value` | number | The value of the metric for this Action |
| `Nudgee` | object | The associated Nudgee object |
| `MetricType` | object | The associated MetricType object |

#### Examples

##### `GET`

Request:

```
GET /api/actions/123
```

Response:

```json
{
  "id": "123",
  "nudgee_id": "789",
  "metric_type_id": "456",
  "metric_value": 5,
  "Nudgee": {
    "id": "789",
    ...
  },
  "MetricType": {
    "id": "456",
    ...
  }
}
```

##### `PUT`

Request:

```
PUT /api/actions/123
Content-Type: application/json

{
  "nudgee_id": "789",
  "metric_type_id": "456",
  "metric_value": 10
}
```

Response:

```json
{
  "id": "123",
  "nudgee_id": "789",
  "metric_type_id": "456",
  "metric_value": 10,
  "Nudgee": {
    "id": "789",
    ...
  },
  "MetricType": {
    "id": "456",
    ...
  }
}
```

##### `DELETE`

Request:

```
DELETE /api/actions/123
```

Response:

```json
{
  "success": true
}
```
# API Documentation for `/api/nudges`

This endpoint provides access to nudges, which can be retrieved or created using GET and POST requests, respectively.

## `GET`

Returns a list of all nudges in the database

### Request Parameters

| Field  | Type       | Required | Description                  |
|--------|------------|----------|------------------------------|
| None   |            |          | This method takes no parameters |

### Response Parameters

| Field             | Type      | Description           |
|-------------------|-----------|-----------------------|
| id                | String    | ID of the nudge        |
| content_type      | String    | Type of content        |
| content           | String    | The content            |
| generated         | Boolean   | Whether it was auto-generated or not |
| created_at        | DateTime  | When the nudge was created |
| NudgeMetric       | Array     | List of metrics associated with the nudge |
| UsedComponent     | Array     | List of components used in the nudge |
| NudgeRecipient    | Array     | List of nudge recipients       |
| - id              | String    | ID of the NudgeRecipient record |
| - nudge_id        | String    | ID of the nudge being sent |
| - nudgee_id       | String    | ID of the nudgee receiving the nudge |
| - created_at      | DateTime  | When the record was created |
| - Nudgee          | Object    | Details of the nudgee         |
| -- id             | String    | ID of the nudgee              |
| -- profile        | JSON      | JSON-encoded nudgee profile   |
| -- created_at     | DateTime  | When the nudgee was created   |
| -- NudgeeGroup    | Array     | List of groups the nudgee is in |
| -- NudgeRecipient | Array     | List of nudges received by this nudgee |
| -- Action         | Array     | List of actions taken by this nudgee |
| -- NudgeeWeights  | Array     | List of nudgee weights for this nudgee |

### Example

```http
GET /api/nudges HTTP/1.1
Host: example.com
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": "123",
    "content_type": "text/plain",
    "content": "Hello world",
    "generated": false,
    "created_at": "2022-01-01T00:00:00Z",
    "NudgeMetric": [
      {
        "MetricType": {
          "id": "456",
          "label": "Engagement",
          "type": "num",
        },
        "value": 5
      }
    ],
    "UsedComponent": [
      {
        "ComponentValue": {
          "id": "789",
          "ComponentType": {
            "id": "1011",
            "label": "Message",
            "data_type": "text"
          },
          "value": "Hello world"
        }
      }
    ],
    "NudgeRecipient": [
      {
        "id": "123456",
        "nudge_id": "123",
        "nudgee_id": "456",
        "created_at": "2022-01-01T01:00:00Z",
        "Nudgee": {
          "id": "456",
          "profile": {
            "name": "John Doe",
            "email": "john@example.com"
          },
          "created_at": "2022-01-01T00:30:00Z",
          "NudgeeGroup": [...],
          "NudgeRecipient": [...],
          "Action": [...],
          "NudgeeWeights": [...]
        }
      }
    ]
  },
  ...
]
```

## `POST`

Creates a new nudge with the specified parameters

### Request Parameters

| Field        | Type    | Required | Description                               |
|--------------|---------|----------|-------------------------------------------|
| content_type | String  | Yes      | The MIME type of the nudge content        |
| content      | String  | Yes      | The content of the nudge                  |
| generated    | Boolean | Yes      | Whether the nudge was auto-generated or not |

### Response Parameters

| Field        | Type    | Description           |
|--------------|---------|-----------------------|
| id           | String  | ID of the created nudge |
| content_type | String  | Type of content        |
| content      | String  | The content            |
| generated    | Boolean | Whether it was auto-generated or not |
| created_at   | DateTime | When the nudge was created |

### Example

```http
POST /api/nudges HTTP/1.1
Host: example.com
Content-Type: application/json
Accept: application/json

{
  "content_type": "text/plain",
  "content": "Hello world",
  "generated": false
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "123",
  "content_type": "text/plain",
  "content": "Hello world",
  "generated": false,
  "created_at": "2022-01-01T00:00:00Z"
}
```
# API Documentation: `/api/nudges/[id]`

This API endpoint provides functionality to handle CRUD (Create, Read, Update and Delete) operations on nudges.

## `GET`

Retrieves a single nudge specified by its id.

### Request

#### Parameters

| Field | Type     | Required | Description        |
| ----- | -------- | -------- | ------------------ |
| `id`  | `string` | Yes      | The id of the nudge |

### Response

If successful, the API responds with the retrieved nudge object in JSON format.

#### Parameters

| Field            | Type                 | Description                                                                                     |
| ---------------- | --------------------| ------------------------------------------------------------------------------------------------|
| `id`             | `string`             | The id of the nudge.                                                                            |
| `content_type`   | `string`             | The type of the nudge content.                                                                  |
| `content`        | `string`             | The content of the nudge.                                                                       |
| `generated`      | `boolean`            | A boolean indicating whether the nudge was generated or not.                                    |
| `NudgeMetric`    | `Array<NudgeMetric>` | An array of NudgeMetric objects.                                                                |
| `UsedComponent`  | `Array<UsedComponent>` | An array of UsedComponent objects containing information about the component values used in the nudge. |
| `NudgeRecipient` | `Array<NudgeRecipient>` | An array of NudgeRecipient objects containing information about the recipients who received the nudge. |

## `PUT`

Updates an existing nudge specified by its id.

### Request

#### Parameters

| Field           | Type      | Required | Description                                                              |
| ----------------| --------- | -------- | ------------------------------------------------------------------------ |
| `id`            | `string`  | Yes      | The id of the nudge.                                                     |
| `content_type`  | `string`  | Yes      | The updated type of the nudge content.                                    |
| `content`       | `string`  | Yes      | The updated content of the nudge.                                         |
| `generated`    | `boolean` | Yes      | A boolean indicating whether the nudge is to be marked as generated or not. |

### Response

If successful, the API responds with the updated nudge object in JSON format.

#### Parameters

| Field            | Type                 | Description                                                                                     |
| ---------------- | --------------------| ------------------------------------------------------------------------------------------------|
| `id`             | `string`             | The id of the updated nudge.                                                                    |
| `content_type`   | `string`             | The type of the updated nudge content.                                                          |
| `content`        | `string`             | The updated content of the nudge.                                                               |
| `generated`      | `boolean`            | A boolean indicating whether the nudge was generated or not.                                      |
| `NudgeMetric`    | `Array<NudgeMetric>` | An array of NudgeMetric objects.                                                                |
| `UsedComponent`  | `Array<UsedComponent>` | An array of UsedComponent objects containing information about the component values used in the nudge. |
| `NudgeRecipient` | `Array<NudgeRecipient>` | An array of NudgeRecipient objects containing information about the recipients who received the nudge. |

## `DELETE`

Deletes an existing nudge specified by its id.

### Request

#### Parameters

| Field | Type     | Required | Description |
| ----- | -------- | -------- | ----------- |
| `id`  | `string` | Yes      | The id of the nudge to be deleted. |

### Response

If successful, the API responds with `{ "success": true }` in JSON format.
# API Documentation: /api/nudges/[id]/metrics

## POST

Create one or more metrics for a specific nudge.

**Request Parameters:**

| Field          | Type      | Required | Description                                                                  |
| -------------- | --------- | -------- | ---------------------------------------------------------------------------- |
| metric_type_ids | Array\<string\> | Yes      | An array of metric type ids that the nudge metrics belong to.                  |

**Response Parameters:**

| Field          | Type           | Description                                                               |
| -------------- | -------------- | ------------------------------------------------------------------------- |
| id             | string         | The id of the nudge metric.                                               |
| metric_type_id | string         | The id of the metric type that the nudge metric belongs to.               |
| nudge_id       | string         | The id of the nudge that the nudge metric belongs to.                      |
| created_at     | Date\<string\> | The date that the nudge metric was created.                                |

**Example Request:**

```json
POST /api/nudges/1234/metrics HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "metric_type_ids": ["5678", "9012"]
}
```

**Example Response:**

```json
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": "abcd",
    "metric_type_id": "5678",
    "nudge_id": "1234",
    "created_at": "2022-01-01T00:00:00.000Z"
  },
  {
    "id": "efgh",
    "metric_type_id": "9012",
    "nudge_id": "1234",
    "created_at": "2022-01-01T00:00:00.000Z"
  }
]
```
## API Documentation

### `POST /api/nudges/[id]/metrics/[m_type_id]`

Create a new `NudgeMetric` record.

#### Request Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The `Nudge` id |
| `m_type_id` | string | Yes | The `MetricType` id |

#### Response Parameters

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | The `NudgeMetric` id |
| `nudge_id` | string | The `Nudge` id |
| `metric_type_id` | string | The `MetricType` id |

### `DELETE /api/nudges/[id]/metrics/[m_type_id]`

Delete a `NudgeMetric` record.

#### Request Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The `Nudge` id |
| `m_type_id` | string | Yes | The `MetricType` id |

#### Response Parameters

| Field | Type | Description |
| --- | --- | --- |
| `success` | boolean | Indicates if the record was successfully deleted |
# API Documentation: /api/nudges/[id]/nudgees

This API endpoint allows clients to create new recipients of a certain nudge.

## Method

`POST`

## Request Parameters

| Field         | Type     | Required | Description                                    |
|---------------|----------|----------|------------------------------------------------|
| nudge_id      | string   | Yes      | The ID of the nudge to which recipients belong. |
| nudgee_ids    | string[] | Yes      | An array of nudgee IDs for new nudge recipients.|

## Response Parameters

| Field      | Type     | Description                                      |
|------------|----------|--------------------------------------------------|
| id         | string   | The ID of the created nudge recipient.            |
| nudge_id   | string   | The ID of the nudge to which the recipient belongs.|
| nudgee_id  | string   | The ID of the nudgee that received the nudge.     |
| created_at | datetime | The datetime at which the recipient was created.  |

## Example

### Request

```
POST /api/nudges/123/nudgees HTTP/1.1
Content-Type: application/json

{
    "nudgee_ids": ["456", "789"]
}
```

### Response

```
HTTP/1.1 200 OK
Content-Type: application/json

[
    {
        "id": "1",
        "nudge_id": "123",
        "nudgee_id": "456",
        "created_at": "2021-09-22T12:53:03.988Z"
    },
    {
        "id": "2",
        "nudge_id": "123",
        "nudgee_id": "789",
        "created_at": "2021-09-22T12:53:04.001Z"
    }
]
```
## API Documentation

### Method: `POST`

Creates a nudge recipient with the provided `nudge_id` and `nudgee_id`.

#### Request Parameters

| Field      | Type   | Required | Description               |
| ---------- | ------ | -------- | ------------------------- |
| `nudge_id` | string | Yes      | The ID of the nudge        |
| `nudgee_id`| string | Yes      | The ID of the nudgee       |

#### Response Parameters

| Field           | Type               | Description                                             |
| ---------------| ------------------ | ------------------------------------------------------- |
| `id`            | string             | The ID of the created nudge recipient                   |
| `nudge_id`      | string             | The ID of the associated nudge                          |
| `nudgee_id`     | string             | The ID of the associated nudgee                         |
| `created_at`    | string             | The timestamp of the nudge recipient creation in UTC    |

#### Example Request

```http
POST /api/nudges/45e1c2e7-d349-49e5-bcd7-9e90452e3777/nudgees/5e3aab5f-07b6-4755-b5c5-9bb57ec9a9a1
Content-Type: application/json

{
   "nudge_id": "45e1c2e7-d349-49e5-bcd7-9e90452e3777",
   "nudgee_id": "5e3aab5f-07b6-4755-b5c5-9bb57ec9a9a1"
}
```

#### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
   "id": "a690cd38-16b2-4c88-ae7c-cb1edccadc7d",
   "nudge_id": "45e1c2e7-d349-49e5-bcd7-9e90452e3777",
   "nudgee_id": "5e3aab5f-07b6-4755-b5c5-9bb57ec9a9a1",
   "created_at": "2022-01-01T12:00:00.000Z"
}
```

### Method: `DELETE`

Deletes the nudge recipient with the provided `nudge_id` and `nudgee_id`.

#### Request Parameters

| Field      | Type   | Required | Description               |
| ---------- | ------ | -------- | ------------------------- |
| `nudge_id` | string | Yes      | The ID of the nudge        |
| `nudgee_id`| string | Yes      | The ID of the nudgee       |

#### Response Parameters

| Field      | Type    | Description                          |
| ---------- | ------- | ------------------------------------ |
| `success`  | boolean | Indicates whether the delete was successful             |

#### Example Request

```http
DELETE /api/nudges/45e1c2e7-d349-49e5-bcd7-9e90452e3777/nudgees/5e3aab5f-07b6-4755-b5c5-9bb57ec9a9a1
```

#### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
   "success": true
}
```
# API Documentation - `/api/nudges/[id]/components/+server.ts`

This API route provides functionality to add components to a nudge.

## Request

### URL Parameters

| Field | Type   | Required | Description         |
| ----- | ------ | -------- | ------------------- |
| id    | string | Yes      | The ID of the nudge. |

### Body Parameters

| Field              | Type     | Required | Description                                |
| ------------------ | -------- | -------- | ----------------------------------------- |
| component_value_ids | string[] | Yes      | Array of IDs of component values to add to the nudge. |

## Response

| Field       | Type   | Description                               |
| ----------- | ------ | ----------------------------------------- |
| id          | string | The ID of the used component record added. |
| nudge_id    | string | The ID of the nudge the component was added to. |
| component_value_id | string | The ID of the component value added. |

## Status Codes

This API route may return the following HTTP status codes:

| Status Code | Description                                    |
| ----------- | ---------------------------------------------- |
| 200         | OK. Returned on successful addition of components. |
| 400         | Bad request. Occurs if request parameters or body parameters are missing or invalid. |
| 500         | Internal server error.  |
# API Documentation - `/api/nudges/[id]/components/[c_value_id]/+server.ts`

## POST `/api/nudges/:id/components/:c_value_id`

Creates a new `UsedComponent` record.

### Request Parameters

| Field            | Type     | Required | Description                                |
|------------------|----------|----------|--------------------------------------------|
| `id`             | `string` | Yes      | The `id` of the `Nudge` to associate        |
| `c_value_id`     | `string` | Yes      | The `id` of the `ComponentValue` to use    |

### Response Parameters

| Field            | Type         | Description                            |
|------------------|--------------|----------------------------------------|
| `data`           | `UsedComponent` | The newly-created `UsedComponent` object |


## DELETE `/api/nudges/:id/components/:c_value_id`

Deletes an existing `UsedComponent` record.

### Request Parameters

| Field            | Type     | Required | Description                                |
|------------------|----------|----------|--------------------------------------------|
| `id`             | `string` | Yes      | The `id` of the `Nudge` to dissociate      |
| `c_value_id`     | `string` | Yes      | The `id` of the `ComponentValue` to remove |

### Response Parameters

| Field       | Type    | Description          |
|-------------|---------|----------------------|
| `success`   | `boolean` | True if deletion was successful |