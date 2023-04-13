# Documenation for the Smart Nudging Engine
The API documentation can be found [here](API.md).

Please read the overview of all the entities in the database which can be found [here](database.md).

# Concepts

### Nudgee

- A "nudgee" is an individual who receives nudges.
- They have a user profile containing various dimensions you can specifiy yourself.
- Nudgees are assigned to groups and receive nudges.
- Actions performed by nudgees can be recorded and analyzed.

### Nudge

- A nudge is made up of *component values*.
- It can be sent to multiple *nudgees*.
- Nudges have a *content type* (e.g., 'text' or 'image_url') and actual content.
- Users can pre-make nudges or generate them based on *component types*, a *prompt*, and a model in a *configuration*.

### Components

- Components are the elements that form a nudge.
- Each component type has component values (at least one value is required).
- Nudges have a many-to-many relationship with component values.
- Component values are used to create, measure, and optimize nudges.

### Metrics & Actions

- Metrics measure the effectiveness of a nudge.
- Actions have a 1-to-1 relation with metric types.
- Metrics are assigned a type and value (e.g., 'calories burned' and '350').
- By capturing more actions, trends in metric values can be identified and related to nudges.
- Users can customize how effectiveness is calculated using algorithms or by contributing to the project.

### Configuration

- Configuration brings all concepts together.
- It is where experiments can be conducted.
- Configurations have relations to *groups* and allow users to set weights for metric types and decision time.
- Users can also select the model and algorithm for nudge generation and optimization.

# How to use the Smart Nudging Engine

The Smart Nudging Engine can be used to do three main things:

* **Measuring effectiveness**: Metrics such as click rate, view time, and self-report are used to measure the effectiveness of a nudge.
* **Finding optimal nudge**: Algorithms like recommender systems and reinforcement learning help find the best nudge for each nudgee or group.
* **Generating nudge**: Models like GPT-4, Dall-E, and Stable Diffusion are used to generate nudges based on provided components.

There are three use cases for the Smart Nudging Engine:

### 1. When the user provides **1** *nudge*:

- The engine measures the nudge's effectiveness using metrics like click rate, view time, and self-report.
- The user can make informed decisions on whether to continue using the nudge or make changes to improve its effectiveness.

### 2. When the user provides **n** *nudges*:

- The engine measures the effectiveness of each nudge.
- The engine finds the optimal nudge for each nudgee or group.
    - Users can do this **manually** by assigning nudges to different groups and using metric values and actions to calculate effectiveness.
    - Alternatively, users can do this **automatically** using weights and algorithms like recommender systems and reinforcement learning.

### 3. When the user provides **n** *nudge components*:

- The engine generates different nudges.
- The engine measures the effectiveness of each nudge.
- The engine finds the optimal nudge for each nudgee or group.

To add data to the database, follow this order:

1. Component types
2. Component values
3. Metric types
4. Nudgees
5. Groups
6. Configurations

The order for pre-made or generated nudges, config, or nudges may vary. After completing these steps, add actions and assign nudges to nudgees.

# Example Usages

## Real-World Example 1: Encouraging Healthy Eating

Imagine a health app that wants to encourage users to eat healthier. The app will send nudges to its users containing tips, reminders, or motivational messages. In this scenario, the Smart Nudging Engine can be used to optimize the nudges for each user.

### Component Types and Values

- Component Types:
    1. Content type: 'text', 'image_url'
    2. Message theme: 'tip', 'reminder', 'motivation'
- Component Values:
    1. Text tips, reminders, and motivational messages
    2. Image URLs for healthy food, workout images, or motivational quotes

### Metric Types and Values

- Metric Types:
    1. Click rate
    2. Time spent viewing the nudge
    3. Self-reported healthy meal count
- Metric Values:
    1. Number of clicks
    2. Seconds spent viewing the nudge
    3. Number of healthy meals reported by the user

### Other Concepts

- Nudgees: App users
- Groups: Users can be grouped based on age, gender, or other demographics
- Configuration: Select appropriate models and algorithms for nudge generation and optimization
- Actions: Users clicking on nudges, viewing nudges, and reporting healthy meals

## Real-World Example 2: Reducing Energy Consumption

A utility company wants to help its customers reduce energy consumption. They plan to send nudges to customers with energy-saving tips, reminders to turn off appliances, and messages to encourage using energy-efficient products.

### Component Types and Values

- Component Types:
    1. Content type: 'text', 'image_url'
    2. Message theme: 'tip', 'reminder', 'encouragement'
- Component Values:
    1. Text tips, reminders, and encouragement messages
    2. Image URLs for energy-saving practices, reminders, or energy-efficient products

### Metric Types and Values

- Metric Types:
    1. Click rate
    2. Time spent viewing the nudge
    3. Self-reported energy-saving actions
    4. Energy consumption data (if available)
- Metric Values:
    1. Number of clicks
    2. Seconds spent viewing the nudge
    3. Number of energy-saving actions reported by the user
    4. kWh consumed by the user

### Other Concepts

- Nudgees: Utility company customers
- Groups: Customers can be grouped based on location, energy consumption levels, or demographics
- Configuration: Select appropriate models and algorithms for nudge generation and optimization
- Actions: Users clicking on nudges, viewing nudges, and reporting energy-saving actions

