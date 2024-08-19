# Documentation
- Describe the organization of your Git repository and how you used it during the
development of your solution (branching, update frequency, server/frontend etc.)
- Description of data structures used in both the client and server sides to represent the
various entities, e.g.: users, groups, channels, etc.
- Angular architecture: components, services, models, routes.
- Node server architecture: modules, functions, files, global variables.
- A list of server side routes, parameters, return values, and there purpose
- Describe the details of the interaction between client and server by indicating how the
data on server side will be changed and how the display of each angular component
page will be updated.
### Overview

### Git
I will be using a single repository, which will contain both the Angular Frontend and the Express Backend
- https://github.com/Nynxz/3813ict-assignment-1

I will be using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)  and also try my best to conform to [Angulars Commit Message Guidelines (Types)](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type).
- **Types**
  - `feat` Commits, that adds or remove a new feature
  - `fix` Commits, that fixes a bug
  - `refactor` Commits, that rewrite/restructure your code, however does not change any API behaviour
  - `perf` Commits are special refactor commits, that improve performance
  - `style` Commits, that do not affect the meaning (white-space, formatting, missing semi-colons, etc)
  - `test` Commits, that add missing tests or correcting existing tests
  - `docs` Commits, that affect documentation only
  - `build` Commits, that affect build components like build tool, ci pipeline, dependencies, project version, ...
  - `ops` Commits, that affect operational components like infrastructure, deployment, backup, recovery, ...
  - `chore` Miscellaneous commits e.g. modifying .gitignore
- seperated via `(backend)` vs `(frontend)` tags
- eg: `feat(frontend): add user page and route` or `docs(backend):add comments to /login route`


### Data Structures

User
  - _id: uuid
  - Username: string
  - Email: string
  - Username: string
  - Roles[]*
  - Groups[]*

Group
  - _id: uuid
  - Name: string
  - Channels[]*
  - Users[]*
  - Admins[]*

Channel
  - _id: uuid
  - Name: string
  - Group*
  - Messages[]*

Message
  - _id: uuid
  - Content: string
  - User*
  - Channel*
  - SentAt: time

### REST API

- **ROUTER /user**
  - POST /login
    - Checks if username and password is valid in database
    - Expected Request Payload: `{username: string, password: string}`
    - Returns: `{jwt: JWT}` - Encoded JWT 
    - Decoded JWT: `{id: User._id, iat: number, exp:number}`
  - POST /logout????

- **ROUTER /chat**
  - POST /message
    - Creates a new chat message
    - Expected Request Payload: `{content: string, channel: Channel._id, jwt: JWT}`
    - Requires: JWT Owner to be a User in the Group which contains the Channel
  - DELETE /message
    - Deletes a chat message
    - Expected Request Payload: `{id: Message._id , jwt: JWT}`
    - Requires: JWT Owner to be message sender, or Admin of the Group where message was sent
  - PUT /message
    - Updates a chat message


### Angular Architecture

- **Services**
  - Storage Service?
    - Used for storing cookies etc?
  - User Service
    - Manages the currently logged in user
    - Communicates with the backend to verify credentials and save JWT
  - Chat Service
    - Used for managing the chat
    - Sending/deleting messages
  
- **Components**
  - Sidebar
    - Allow the user to view all Groups they have joined
    - Allow the user to see if they are logged in
    - Allow the user to navigate between user settings (Super/Admin Panel) and chats

- **Routes**
  - All routes will contain the sidebar, this is used for navigating through the site. Routes are managed through the [`<router-outlet>`](https://angular.dev/api/router/RouterOutlet?tab=api) component and displayed in the main portion of the screen
  - Home `/`
    - Welcome Page
  - User `/user`
    - Displays 'dashboards' based on roles
    - User Dashboard
      - Change username, profile picture
    - Super Dashboard
      - Promote Users
      - Remove Users
      - Add Users
  - Login `/login`
  - Chat `/chat`

- **Guards**
  - IsLoggedIn
    - Blocks routing unless the user is logged in
    - Redirects to `/login`
    - Used On `/user` and `/chat`