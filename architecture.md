# Idealist

The concept of Idealist is to enable real-time, blind brainstorming with one-off, temporary rooms that you can quickly create, save the list, and abandon without care.

## Features to avoid for MVP

To start, the main concerns will be ease and speed of use.

- User accounts: This will be in v1.0 but not in the initial prototype.
- Security: This tool should not be used for confidential/sensitive projects.
- Privacy: Though there will be an "anonymous mode", it won't be perfectly secure in the MVP

## microservices

### client

- Provides interactivity layer with the API services

#### index

As a user, I can...

- Set my name, then...
- Create a room
  - With an optional timer
  - With an optional goal (total or per person)
  - With an optional anonymous setting
- Join a room
  - With my unique name (if my name is not unique, I will be prompted to change it)
  - With a unique 6 character code (similar to among us)

#### room (idea adding mode)

As a user, I can...

- Add my ideas to the list
- See how many ideas I've added
- See the ideas goal (if set)
- See a timer (if set)
- See whether we're in anonymous mode

As the room owner, I can...

- Do everything a normal user can do
- End the round early

#### room (idea review mode)

As a user, I can...

- See the list of ideas
- See names associated with ideas (if not in anonymous mode)
- Filter the list by any combo of rejected/neutral/accepted
- Save the list based on my filter

As the room owner, I can...

- Do everything a normal user can do
- Mark ideas as accepted
- Unmark ideas as accepted
- Mark ideas as rejected
- Unmark ideas as rejected
- Start a new idea round (which will add on to the current list)

### graphql

Provides a single gateway for the clients and backend to communicate.

- maintains no data
- communicates to the client through graphql subscriptions
- communicates to the other backend services through REST requests

### rooms

Maintains information about each room.

- A room has many users
- A room has many ideas
- A room has one owner
- A room has two modes: brainstorm & review
  - It will switch from brainstorm to review by...
    - The owner manually ending the session
    - The timer ending
    - (hitting the idea goal will not auto-switch)

The rooms service...

- uses mongodb to maintain data
- has a REST endpoint for the graphql interface
- uses NATs to communicate with other backend services

### users

Maintains information about each user.

- A user belongs to one room
- A user has many ideas

The users service...

- uses mongodb to maintain data
- has a REST endpoint for the graphql interface
- uses NATs to communicate with other backend services

### ideas

Maintains information about each idea.

- An idea belongs to one user
- An idea belongs to one room
- Ideas will have three states:
  - Accepted
  - Rejected
  - Pending

The ideas service...

- uses mongodb to maintain data
- has a REST endpoint for the graphql interface
- uses NATs to communicate with other backend services

### timer

Runs timers for the rooms service.

- uses Redis to run the timer
- uses NATs to communicate with other backend services
