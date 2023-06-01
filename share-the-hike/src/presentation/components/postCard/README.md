# `PostCard.tsx`

## Scope

Global

## Component Type

Card

## Display

Used as a component in pages.

## Functionality

This component represents a post. You can view it's information, expand it and like (or unlike) it.
The user can interact and like the post (or unlike), which directly communicates with the server.

## Props

- `userName` (String): The username of the user who created the post.

- `_id` (String): The unique id of the post in MongoDB.

- `title` (string): The title of the post.

- `body` (string): The body of the post.

- `nrOfLikes` (number): The number of people that like the post.

- `doesUserLike` (Boolean): A Boolean that displays if the current user likes the post.
