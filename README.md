
# Stuneckt - Microblogging Platform API

## Project Overview

This project aims to build API endpoints for a microblogging platform similar to Twitter or LinkedIn. Users can post content and follow each other. The backend is implemented in [Node.js](https://nodejs.org/) using [Express.js](https://expressjs.com/) framework, and data is stored in a [MongoDB](https://www.mongodb.com/) database.

## Features

- **User Management**: CRUD operations for user profiles.
- **Post Management**: CRUD operations for user posts.
- **Followers**: Ability to follow/unfollow users.
- **Pagination**: Paginated endpoints for posts and followers.
- **Error Handling**: Robust error handling for API endpoints.
- **Mock Data Feeder Script**: A script to feed mock data into the database.

## Setup Instructions

1. Clone the repository: `git clone https://github.com/exploring-solver/Stuneckt_assignment.git`
2. Install dependencies for client: `cd client` `npm install`
2. Install dependencies for server: `cd client` `npm install`
3. Set up environment variables: Create a `.env` file in the root directory as per the format of  `.env.example` file
4. Start the server: `npm run dev`
4. Start the client: `npm run dev`
5. The server should now be running on `http://localhost:5000`.
5. The client should now be running on `http://localhost:3000`.

## API Endpoints

- `GET /api/users`: Get all users.
- `GET /users/api/v1/user/details`: Get logged in user's details.
- `GET /users/:username`: Get a user's details deom username.
- `POST /users/api/v1/signup`: Create a new user.
- `POST /users/api/v1/login`: Login a user.
- `POST /users/create-mock-users`: Create mock users.
- `PUT /api/users/`: Update a user.

- `GET /posts/api/v1/posts`: Get all posts.
- `GET /posts/api/v1/posts/user`: Get logged in user's Posts.
- `GET /posts/api/v1/posts/user/:username`: Get a perticular user's Posts.
- `POST /posts/api/v1/posts`: Create a new post.
- `PUT /api/posts/:id`: Update a post.
- `GET /posts/api/v1/posts?page=M&limit=N`: Get Paginated posts from M to N.

- `GET /follow/followcount/:username`: Get all followers count of a user.
- `GET /follow/follower/:username`: Get all followers of a user.
- `GET /follow/following/:username`: Get all following  of a user.
- `POST /follow/follow/:username`: Follow a user.
- `DELETE /follow/unfollow/:username`: Unfollow a user.

## Mock Data Feeder Script

To use the mock data feeder script, go to following route:

Authorization Required
POST: /users/create-mock-users


This will populate the database with mock users and posts for testing purposes.

## Screenshots

![Frontend Screenshot](path/to/frontend/screenshot.png)

## Technologies Used

- Next.js
- TypeScript
- Node.js
- Express.js
- MongoDB
- JavaScript

## Deployment

The backend is deployed on [Vercel](https://stuneckt-assignment-c16d.vercel.app/) and can be accessed at [API Base URL (Render)](https://stuneckt-assignment.onrender.com).

## Contributors

- Aman Sharma (@exploring-solver)

