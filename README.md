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
> #### [Frontend](https://github.com/Nynxz/3813ict-assignment-1/tree/main/frontend)
> - Using [Angular Version 18](https://angular.dev/overview)
> - Using [TailwindCSS](https://tailwindcss.com/docs/guides/angular)
> - Using [jwt-decode](https://www.npmjs.com/package/jwt-decode)
> #### [Backend](https://github.com/Nynxz/3813ict-assignment-1/tree/main/backend)
> - Using [Express](https://expressjs.com/)
> - Using [MongoDB](https://www.mongodb.com/)
> - Using [Mongoose](https://mongoosejs.com/)
> - Using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

## Git
Initial project was created in `main branch`. Became a mess as I learnt new things about Angular, decided to create `v2 branch` which is a recreation of the main branch. Once v2 caught up with v1, I merged the changes into main and deleted the v1 frontend directory.

Both the Angular Frontend and the Express Backend are contained within a single repository
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

## Data Structures

#### **Role**
- `Enum (USER, ADMIN, SUPER)`

#### **User**
Represents a user of the application. 
- Currently `password` is stored in plaintext
- `roles` are stored as integers (0, 1, 2 > USER, ADMIN, SUPER)
```
- _id: uuid | Unique
- username: string | Unique
- email: string
- password: string
- imageURL: string
- roles: Role[]*
- groups: Group[]*
```


#### **Group**
Represents a group of the application.
- `users` are those who have access to communicate in the group's channels
- `admins` are those who have access to create new channels, modify existing channels and add/remove users from the group
```
- _id: uuid | Unique
- name: string
- imageURL: string
- users: User[]*
- admins: User[]*
- channels: Channel[]*
```


#### **Channel**
Represents a channel belonging to a group. Created by an ADMIN or SUPER user
```
- _id: uuid | Unique
- name: string
- group: Group*
- messages: Messages[]*
```



#### **Message**
Represents a message sent in a channel, from a user.
```
- _id: uuid | Unique
- content: string
- sender: User*
- channel: Channel*
```

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
    - Redirects to `/`
    - Used On `/chat`
  - isloggedinGuardRedirectTo
    - Same as IsLoggedIn but allows customisable redirects
    - Used on `/user` to redirect to `/login`
 
## Express
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
    - Currently logs the request and whether it was successful
    - eg `[DEBUG]: 200 POST /channel/messages     @ Wed Sep 04 2024 4:58:14 am`

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
  - **requireAuthHeader**
    - requires the request header contains an `Authorization Bearer Token`
    - `Authorization: Bearer <JWT TOKEN>`
    - Attaches decoded jwt to `res.locals.user`
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
headers: {
  "Authorization": "Bearer <JWT which contains the role USER>",
},
body: {
  "message": {
    "content": "",
    "channel": ""
  }
}
```

## Routes

```
[gateway]: ----channels.ts----
[gateway]: ++ (GET) /channel/messages
[gateway]: ++ (GET) /channel/users
[gateway]: ++ (POST) /channel/adduser
[gateway]: ++ (POST) /channel/removeuser
[gateway]: ++ (POST) /channel/create
[gateway]: ++ (POST) /channel/delete
[gateway]: ++ (POST) /channel/update
[gateway]: ----group.ts----
[gateway]: ++ (GET) /groups
[gateway]: ++ (GET) /groups/channels
[gateway]: ++ (GET) /groups/users
[gateway]: ++ (POST) /groups/create
[gateway]: ++ (POST) /groups/delete
[gateway]: ++ (POST) /groups/update
[gateway]: ++ (POST) /groups/adduser
[gateway]: ++ (POST) /groups/removeuser
[gateway]: ++ (POST) /groups/promoteuser
[gateway]: ----messages.ts----
[gateway]: ++ (POST) /message/send
[gateway]: ----superuser.ts----
[gateway]: ++ (POST) /super/updateuser
[gateway]: ++ (POST) /super/deleteuser
[gateway]: ----user.ts----
[gateway]: ++ (GET) /users/all
[gateway]: ++ (POST) /user/create
[gateway]: ++ (POST) /user/login
[gateway]: ++ (POST) /user/update
 ```
### **Implemented**
#### Users
- `(GET) /users/all`
  - `requireValidRole(Roles.SUPER)`
  - Gets all users of the app
  - Returns array of all users
  - 
- `(POST) /user/create`
  - `requireObjectHasKeys("user", ["username", "email", "password"])`
  - User Registration
  - Returns JWT
- `(POST) /user/login`
- `(POST) /user/update`
- `(POST) /user/delete`

#### Groups
- `(GET) /groups`
  - `requireValidRole(Roles.USER)`
  - Gets Groups for specific user
  - If SUPER role, gets all groups of app
  - If not, gets all groups user is ADMIN / USER of
  - Returns array of Groups
- `(GET) /groups/channels`
- `(GET) /groups/users`
  - Gets all the users of a specific group
  - TODO: add validation (user of group, admin or super)
- `(POST) /groups/create`
  - `requireValidRole(Roles.ADMIN)`
  - Creates a new group if user is an ADMIN
- `(POST) /groups/update`
  - `requireValidRole(Roles.SUPER)`
  - TODO: allow admins to update
  - TODO: validate request body
  - Updates a group
- `(POST) /groups/adduser`
- `(POST) /groups/removeuser`

#### Messages
- `(POST) /message/send`
  - `requireValidRole(Roles.USER)`,
  - `requireObjectHasKeys("message", ["content", "channel"])`
  - Sends a message to a channel

#### Channels
- `(GET) /channel/messages`
  - Gets all messages of a specific channel
- `(GET) /channel/users`
  - Gets all users of a specific channel
- `(POST) /channel/adduser`
- `(POST) /channel/removeuser`
- `(POST) /channel/create`
  - `requireValidRole(Roles.ADMIN)`
  - Creates a new channel
- `(POST) /channel/delete`
  - `requireValidRole(Roles.ADMIN)`
  - Deletes an existing channel
- `(POST) /channel/update`
  - `requireValidRole(Roles.ADMIN)`
  - Updates an existing channel

  
#### Admin
- `(POST) /super/updateuser`
  - `requireValidRole(Roles.SUPER)`
  - Updates a user
  - Used for promoting users

### **Planned**
#### Channel
- `(POST) /channel/join`
  - Establishes a websocket
  - Allows for live message updates
#### Users
- `(POST) /user/update`
  - Allows a user to update their own name and profile picture
- `(POST) /user/delete`
  - Allows a user to delete their own profile

#### Images
- `(POST) /image/upload`
  - Allows a user to upload an image
#### Video Chat
- `(POST) /video/create`
  - Creates a websocket connection for users to join a video chat
- `(POST) /video/join`
  - Establishes websocket connection to created video chat

## Interaction
#### JSON Web Token
JWT's are used for authorization of backend routes. When the user logs in, the backend returns a JWT which is stored in the clients browser. This is then sent back to the server when the client makes requests which require authorization. The JWT is signed with a secret, this signature is then authenticated to verify the content of the JWT was originally created by the server. As JWT's are just base64 encoded objects, with a signature, they can be easily decoded 'without the password'. Due to this, it is not used to store sensitive information like passwords, but used as more of a 'ticket' to access backend routes. Currently it is used to store the users roles, which is then used by the requiredValidRoles() middleware.

#### 

#### Client <> Server
- Frontend contains various services to organise different client to server functions
- Services contain state, typically as a [Signal](https://angular.dev/guide/signals)
- Signals allow for components to 'subscribe' to state changes and react
- This allows for a single source of truth components can use
- Services inject and use the [HttpClient](https://angular.dev/api/common/http/HttpClient) class to send requests to the backend.
- Components then inject these services where needed either to fetch the current state or allow updates to state through things like button presses or route changes.

#### Backend <> Database
- MongoDB is used to store the applications data
- The backend uses MongooseJS to interact with MongoDB
```js
// With Mongoose
let ChannelSchema = new Schema({...});
export const ChannelModel = mongoose.model("Channel", ChannelSchema);

export async function createChannel(channel: object) {
  return await new ChannelModel(channel).save();
}

// Without Mongoose
export async function createChannel(mongoClient: MongoClient, channel: object) {
  return await mongoClient.db("3813ICT")
    .collection("channels")
    .insertOne(channel);
}

```