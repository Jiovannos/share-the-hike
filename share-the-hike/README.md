# Getting Started with Share the Hike

The project is available on [sharethehike.com](https://github.com/facebook/create-react-app).

## Code

Share the Hike is build using the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. Redux Toolkit is used for state management.

It uses (mostly) the [Clean Architecture](https://www.techtarget.com/whatis/definition/clean-architecture).

Some of the coding practices that are used are:

- Each component has it's own folder. The folder contains the TypeScript `.tsx` file, the `module.css` file, a `types.ts` file, a `.test.tsx` file and the `README.md` file.
- The components that must be used more than once and have a global scope are placed in the `components` folder.
- All the other components and pages have their own folder structure based on the clean archteture.
- The imports are always in that order for easier readability:
  - Css
  - Types
  - Images
  - React modules
  - Other modules
  - Components
  - Other
- `Comments` are used where needed, but the code is written in a way that it is self-explanatory.
- `Global state` is prefered over `props` for easier readability and less props-drilling.
- `Css modules` are prefered over `styled components` for easier readability and less code.
- `Inline styles` are used only when they can be changed conditionally.
- Reuse of patterns, elements and colors are used for consistency and better user engagement.

## Functionalities

While still on development, Share the Hike has the following functionalities:

- `Authentication` (Login, Signup, Logout)
- `Posts` (Read, Like, Filter, Sort)

### Initialization of posts

- With a click of a button 100 dummy posts are fetched from ['https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts).
- Then for each userId a User is created in mongoDB.
- Then for each post a Post is created in mongoDB by a User.
- Then each User randomly likes some posts.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
