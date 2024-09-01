> [!NOTE] Information
> - **Name**: Henry Lee
> - **Student Number**: s5238766
> - **Class**: 3813ICT - Web Application Development
> - **Due Date**: 5/09/2024 @ 8:00am

> [!WARNING] README Requirements
> - [**Git**](#git): Describe the organization of your Git repository and how you used it during the
> development of your solution (branching, update frequency, server/frontend etc.)
> - [**Data Structures**](#data-structures): Description of data structures used in both the client and server sides to represent the
> various entities, e.g.: users, groups, channels, etc.
> - [**Angular**](#angular-architecture): Angular architecture: components, services, models, routes.
> - [**Express**](#express): Node server architecture: modules, functions, files, global variables.
> - [**Routes**](#routes): A list of server side routes, parameters, return values, and there purpose
> - [**Interaction**](#interaction): Describe the details of the interaction between client and server by indicating how the
> data on server side will be changed and how the display of each angular component
> page will be updated.

### Overview
>[!TIP] Key Dependencies 
> #### [v2 Frontend](https://github.com/Nynxz/3813ict-assignment-1/tree/v2/frontend)
> - Using [Angular Version 18](https://angular.dev/overview)
> - Using [TailwindCSS](https://tailwindcss.com/docs/guides/angular)
> - Using [jwt-decode](https://www.npmjs.com/package/jwt-decode)
> #### [v2 Backend](https://github.com/Nynxz/3813ict-assignment-1/tree/v2/backend)
> - Using [Express](https://expressjs.com/)
> - Using [MongoDB](https://www.mongodb.com/)
> - Using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

### Git
Initial project was created in `main branch`. Became a mess as I learnt new things about Angular, decided to create `v2 branch` which is a recreation of the main branch. 
Both the Angular Frontend and the Express Backend are contained within a single repository
- https://github.com/Nynxz/3813ict-assignment-1

v1 was contained within `ngfrontend` while the new v2 frontend is contained within the `frontend` directory. The Express backend is contained within the `backend` directory.

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
### Express
### Routes
### Interaction
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
