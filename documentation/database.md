## Entity Relation List

This is a list of all the entities and their relations. This is used to create the database schema.

```plaintext
ENTITY: Nudgee
  - id: String [Primary Key]
  - profile: Json
  - created_at: DateTime
  RELATIONS:
  - 1:N with NudgeeGroup
  - 1:N with NudgeRecipient
  - 1:N with Action
  - 1:N with NudgeeWeights

ENTITY: NudgeRecipient
  - nudge_id: String [Primary Key]
  - nudgee_id: String [Primary Key]
  - created_at: DateTime
  RELATIONS:
  - N:1 with Nudge
  - N:1 with Nudgee

ENTITY: Nudge
  - id: String [Primary Key]
  - content_type: String
  - content: String
  - generated: Boolean
  - created_at: DateTime
  RELATIONS:
  - 1:N with UsedComponent
  - 1:N with NudgeRecipient
  - 1:N with NudgeMetric

ENTITY: ComponentType
  - id: String [Primary Key]
  - label: String
  - data_type: String
  RELATIONS:
  - 1:N with ComponentValue

ENTITY: ComponentValue
  - id: String [Primary Key]
  - component_type_id: String
  - value: String
  RELATIONS:
  - N:1 with ComponentType
  - 1:N with UsedComponent

ENTITY: UsedComponent
  - nudge_id: String [Primary Key]
  - component_value_id: String [Primary Key]
  RELATIONS:
  - N:1 with Nudge
  - N:1 with ComponentValue

ENTITY: MetricType
  - id: String [Primary Key]
  - label: String
  - type: String
  RELATIONS:
  - 1:N with Action
  - 1:N with NudgeMetric
  - 1:N with MetricTypeWeight

ENTITY: Action
  - id: String [Primary Key]
  - nudgee_id: String
  - metric_type_id: String
  - metric_value: Int
  - created_at: DateTime
  RELATIONS:
  - N:1 with Nudgee
  - N:1 with MetricType

ENTITY: NudgeMetric
  - nudge_id: String [Primary Key]
  - metric_type_id: String [Primary Key]
  RELATIONS:
  - N:1 with Nudge
  - N:1 with MetricType

ENTITY: Configuration
  - id: String [Primary Key]
  - name: String
  - algorithm: String
  - generate: Boolean
  - generate_model: String?
  - deconstructed_prompt: Json?
  - decision_time_weight: Float
  - start_datetime: DateTime
  - end_datetime: DateTime
  - created_at: DateTime
  RELATIONS:
  - 1:N with GroupConfiguration
  - 1:N with MetricTypeWeight
  - 1:N with NudgeeWeights

ENTITY: Group
  - id: String [Primary Key]
  - name: String
  - control: Boolean
  - created_at: DateTime
  RELATIONS:
  - 1:N with NudgeeGroup
  - 1:N with GroupConfiguration

ENTITY: NudgeeGroup
  - nudgee_id: String [Primary Key]
  - group_id: String [Primary Key]
  RELATIONS:
  - N:1 with Nudgee
  - N:1 with Group

ENTITY: GroupConfiguration
  - group_id: String [Primary Key]
  - configuration_id: String [Primary Key]
  RELATIONS:
  - N:1 with Group
  - N:1 with Configuration

ENTITY: MetricTypeWeight
  - configuration_id: String [Primary Key]
  - metric_type_id: String [Primary Key]
  - weight: Float
  RELATIONS:
  - N:1 with Configuration
  - N:1 with MetricType

ENTITY: NudgeeWeights
  - nudgee_id: String [Primary Key]
  - configuration_id: String [Primary Key]
  - weights: Json
  RELATIONS:
  - N:1 with Nudgee
  - N:1 with Configuration
```
