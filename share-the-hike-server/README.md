# `Share the Hike Server`

Share the hike uses express.js as server.

## `MongoDB`

`MongoDB` is used as database. The database is called `share_the_hike` and has 2 collections: `users` and `posts`.

An initialization of the database is awaited by the user. The user can initialize the database by clicking the `initialize` button on the Navigation Bar. This will create 100 dummy posts and 10 users. Each user will have a random number of likes on random posts.

The database runs on a second dependable container on Docker.

## `Structure`

### Build

This is where the front ent is deployed for production. Express.js serves the static files from this directory.

### src

This is where all the nessessary files are located.

#### models

The folder where the mongoose models are located.

#### routes

The folder where the endpoints are located.
