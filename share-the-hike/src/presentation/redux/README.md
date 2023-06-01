# Redux Folder

## Usage

Here there are all the Redux Slices for managing global state.

## `postSlice.ts`

A slice that manages the posts global state.

### State

- `filters` (object): An object that contains all the filters that will be applied to the posts.
- `sortField` (string): The field that will be used to sort the posts.
- `sortOrder` (string): The order that will be used to sort the posts (Asc or Desc)

## `userSlice.ts`

A slice that manages the user global state.

### State

- `userId` (string): The id of the user in MongoDB.
- `userName` (string): The userName of the user.
- `postsLiked` (string[]): An array containing the ids of the posts that the user liked.
- `postsCreated` (string[]): An array containing the ids of the posts that the user created.
- `isAuthenticated` (boolean): A boolean that represents if the user is authenticated or not.
- `theme` (string): The theme of the app (dark or light).

## `visibilitySlice.ts`

A slice that manages the visibility global state (usually for modal components).

### State

- `signupModal` (object): An object that contains the visibility state of the signup modal.
- `loginModal` (object): An object that contains the visibility state of the login modal.
- `filtersModal` (object): An object that contains the visibility state of the filters modal.
- `areYouSureModal` (object): An object that contains the visibility state of the areYouSure modal.
