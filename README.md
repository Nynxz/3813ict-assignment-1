# Requirements
> ## Information
> - **Name**: Henry Lee
> - **Student Number**: s5238766
> - **Class**: 3813ICT - Web Application Development
> - **Due Date**: 5/09/2024 @ 8:00am

> ## README Requirements
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

## Overview
> ### Key Dependencies 
> #### [v2 Frontend](https://github.com/Nynxz/3813ict-assignment-1/tree/v2/frontend)
> - Using [Angular Version 18](https://angular.dev/overview)
> - Using [TailwindCSS](https://tailwindcss.com/docs/guides/angular)
> - Using [jwt-decode](https://www.npmjs.com/package/jwt-decode)
> #### [v2 Backend](https://github.com/Nynxz/3813ict-assignment-1/tree/v2/backend)
> - Using [Express](https://expressjs.com/)
> - Using [MongoDB](https://www.mongodb.com/)
> - Using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

## Git
Initial project was created in `main branch`. Became a mess as I learnt new things about Angular, decided to create `v2 branch` which is a recreation of the main branch. 
Both the Angular Frontend and the Express Backend are contained within a single repository
Initial project was created in `main branch`. Became a mess as I learnt new things about Angular, decided to create `v2 branch` which is a recreation of the main branch. 
Both the Angular Frontend and the Express Backend are contained within a single repository
- https://github.com/Nynxz/3813ict-assignment-1

v1 was contained within `ngfrontend` while the new v2 frontend is contained within the `frontend` directory. The Express backend is contained within the `backend` directory.

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

## Data Structures

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

## Angular Architecture
### Routes
  - **Home** `/`
    - Welcome Page - Non Functional
  - **Login** `/login`
    - Displays the Login and Register Form
    - Successful login routes to /user
  - **User** `/user`
    - Displays 'dashboards' based on roles
    - User Dashboard (Not Implemented)
      - Change username, profile picture
    - Super Dashboard (Functional)
      - Promote Users
      - Remove Users
    -  Admin Dashboard (Functional)
      - Create Groups
      - Update Groups
      - Delete Groups
  - **Chat** `/chat`
    - Displays a selectable 'channel sidebar'
    - When a channel is selected it displays the Chat
    - Sidebar has a button for displaying group settings
    - Allows admins to create, update & delete channels
  - All routes will contain the sidebar, this is used for navigating through the site. Routes are managed through the [`<router-outlet>`](https://angular.dev/api/router/RouterOutlet?tab=api) component and displayed in the main portion of the screen

### Services
  - **Preferences Service**
    - Used for storing persistent state (cookies)
    - Currently used for retrieving jwt and whether sidebar is folded
  - **User Service**
    - Used for logging in/registering
    - Manages JWT, auto logging in
    - Communicates with the backend to verify credentials and save JWT
  - **Group Service**
    - Used for creating/updating groups & channels
  - **Chat Service**
    - Used for managing the chat
    - Sending/deleting messages
  - **Admin Service**
    - Used for admin/super functions
    - Promoting users 
    - Creating/updating groups

### Components
  - Sidebar
    - Allow the user to view all Groups they have joined
    - Allow the user to see if they are logged in
    - Allow the user to navigate between user settings (Super/Admin Panel) and chats



### Guards
  - IsLoggedIn
    - Blocks routing unless the user is logged in
    - Redirects to `/login`
    - Used On `/user` and `/chat`

# Express
I have created a simple 'framework' for managing my backend routes which uses express. 
### Concept
#### Core `Gateway` class
  - Setups Express and global middleware
  - Connects mongoose to MongoDB instance
  - Automatically loads `routes` directory
#### `registerHTTP` wrapper
  - assigns callbacks to router methods (get, post)
  - handles middleware chain
  - runs 'endware' at the end of the request
    - Currently logs the response and whether it was successful
    - eg `[DEBUG]: 200 POST /channel/messages     @ Wed Sep 04 2024 4:58:14 am`\

Route files are placed in the directory `routes`. 
These files export a default anonymous function which calls the `registerHTTP` wrapper functions.
The `registerHTTP` function wraps the different express methods (get, post, etc).
It also takes in an array of optional middleware which can be assigned to each route

#### Example

```js
export default (router: Router, gateway: Gateway) => {
  registerHTTP(
    "get",
    "/hello",
    router,
    async (req: Request, res: Response) => {
      res.send(`Hello ${req.body.name}`);
    },
    [requireBodyKey("name")]
  );
};
```
```
> curl localhost:3010/hello
{"error":"Cannot find name"}

> curl --header "Content-Type: application/json" --request GET --data '{"name": "Henry"}' localhost:3010/hello 
Hello Henry
```

### Examples of Middleware
  - **requireBodyKey**
    - requires the request body contains a specified key
  - **requireObjectHasKeys**
    - requires the request body contains an object with a specified name
    - and that the object, has all the specified keys
  - **requireValidRole**
    - requires the request contains JSON key 'jwt' which has been encoded with a secret, and contains the required Role (ADMIN, SUPER, USER)
Currently these middlewares can be used together to validate request bodies and authorize users
#### **Example**
```ts
[
requireValidRole(Roles.USER),
requireObjectHasKeys("message", ["content", "channel"]),
]
  ```
A request which contains above, must recieve a payload like below.
```json
{
  "jwt": "<JWT which contains the role USER>",
  "message": {
    "content": "",
    "channel": ""
  }
}
```

# Routes
#### Users
- `(POST) /user/create`
  - `requireObjectHasKeys("user", ["username", "email", "password"])`
  - User Registration
  - Returns JWT
- `(POST) /user/login`
  - `requireObjectHasKeys("user", ["username", "password"])`
  - User Login
  - Returns JWT
- `(POST) /users/all`
  - `requireValidRole(Roles.SUPER)`
  - Gets all users of the app
  - Returns array of all users
- `(POST) /user/update`
  - NOT IMPLEMENTED
- `(POST) /user/delete`
  - NOT IMPLEMENTED

#### Groups
- `(POST) /groups`
  - `requireValidRole(Roles.USER)`
  - Gets Groups for specific user
  - If SUPER role, gets all groups of app
  - If not, gets all groups user is ADMIN / USER of
  - Returns array of Groups
- `(POST) /groups/create`
  - `requireValidRole(Roles.ADMIN)`
  - Creates a new group if user is an ADMIN
- `(POST) /groups/update`
  - `requireValidRole(Roles.SUPER)`
  - TODO: allow admins to update
  - TODO: validate request body
  - Updates a group
- `(POST) /groups/users`
  - Gets all the users of a specific group
  - TODO: add validation (user of group, admin or super)
- `(POST) /message/send`
  - `requireValidRole(Roles.USER)`,
  - `requireObjectHasKeys("message", ["content", "channel"])`
  - Sends a message to a channel

#### Channels
- `(POST) /channel/create`
  - `requireValidRole(Roles.ADMIN)`
  - Creates a new channel
- `(POST) /channel/delete`
  - `requireValidRole(Roles.ADMIN)`
  - Deletes an existing channel
- `(POST) /channel/update`
  - `requireValidRole(Roles.ADMIN)`
  - Updates an existing channel
- `(POST) /channel/messages`
  - Gets all messages of a specific channel
- `(POST) /channels`
  - Gets all the channels of a specific group
  
#### Admin
- `(POST) /super/updateuser`
  - `requireValidRole(Roles.SUPER)`
  - Updates a user
  - Used for promoting

#### Testing
- `(GET) /`
  - Hello World!
- `(GET) /ping`
  - Pong!


# Interaction
# REST API

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

# NOT REQUIRED
### Express
### Routes
### Interaction
### REST API not required?

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
