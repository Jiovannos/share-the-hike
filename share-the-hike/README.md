# `Share the Hike`

An app for sharing your hiking experiences with others.

# Getting Started with Share the Hike

## Code

Share the Hike is build using the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. Redux Toolkit is used for state management.

It uses (mostly) the [Clean Architecture](https://www.techtarget.com/whatis/definition/clean-architecture).

Some of the coding practices that are used are:

- Each component has it's own folder. The folder contains the TypeScript `.tsx` file, the `module.css` file, a `types.ts` file and the `README.md` file.
- The components that must be used more than once and have a global scope are placed in the `components` folder.
- All the other components and pages have their own folder structure based on the clean architecture.
- The imports are always in that order for readability:
  - Css
  - Types
  - Images
  - React modules
  - Other modules
  - Components
  - Other
- `Comments` are used where needed, but the code is written in a way that it is self-explanatory.
- `Global state` is prefered over `props` for readability and less props-drilling.
- `Css modules` are prefered over `styled components` for readability and less code.
- `Inline styles` are used only when they will be changed conditionally.
- Reuse of patterns, elements and colors are used for consistency and better user engagement.

## Functionalities

While still on development, Share the Hike has the following functionalities:

- `Authentication` (Login, Signup, Logout)
- `Posts` (Read, Like, Filter, Sort)

# `Deployment Methods`

- `Get the repository:`

  git clone https://github.com/Jiovannos/share-the-hike.git

- `Navigate to the client directory:`

  cd share-the-hike

- `Install dependencies:`

  npm install

- `Navigate to the server directory:`
  cd ../share-the-hike-server

- `Install dependencies:`

  npm install

## Production Environment

### On Docker

**`Recomended`**
**(Docker must be installed)**
In the root directory, run `docker compose up` to create an image and start the production server on Docker. You can access the application on [http://localhost:8000](http://localhost:8000).

### Locally

**`MongoDB` must be installed and have no database called share_the_hike. Port 8000 must be available**
In the `share-the-hike-server` directory, you can run `npm run startPM2` to start the production server on PM2. You can access the application on [http://localhost:8000](http://localhost:8000).

## Development Environment

**`MongoDB` must be installed and have no database called share_the_hike.** (What a luck that would be!!!)
**Note that both ports 3000 (Client) and 8000 (Server) must be available.**
In the `share-the-hike-server` directory, you can run `npm run dev` to start the development server. Then navigate to `../share-the-hike` and run `npm start` to start the client server. You can access the application on [http://localhost:3000](http://localhost:3000).

# `Usage`

### Initialize Posts

**On the first run you must click the button `initialize` on the Navigation Bar.**

- 100 dummy posts are fetched from ['https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts).
- Then for each userId, a User is created in mongoDB.
- Then for each post, a Post is created in mongoDB by a User.
- Then each User randomly likes some posts.

### Login/Signup

**Cookies must not be disabled in the browser**

In order to see any screen but the Starting Screen you must be logged in.
You can login or signup by clicking the `Login` or `Signup` button on the Navigation Bar or on the screen.
**You can Login using as username `AND` password one of the following randomized users:**

- Maria
- Giannis
- Giorgos
- Eleni
- Anna
- Nikos
- Dimitris
- Sofia
- Kostas
- Vasiliki
  **OR you can signup with your own username and password.**

### Post Page

You can visit the Post page by clicking the `Posts` button on the Navigation Bar or the `Explore` on Starting Screen.
There you can see all the posts made by the users. On Click the post Expands to show the body.
You can like a post by clicking the `Like` button.
You can filter the posts by clicking the `Filter` button.
You can sort the posts by clicking the `Sort` button.

### User Page

You can visit the User page by clicking the `User` button on the Navigation Bar or the `Manage Your Posts` on the Starting Screen.
There you can see all the posts that you liked or created by switching tabs.
On the Posts you have created you have the option to unlike all of them.
