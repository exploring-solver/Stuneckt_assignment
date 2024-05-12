
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

1. Clone the repository: `git clone https://github.com/yourusername/stuneckt-backend.git`
2. Install dependencies: `npm install`
3. Set up environment variables: Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   ```
4. Start the server: `npm start`
5. The server should now be running on `http://localhost:5000`.

## API Endpoints

- `GET /api/users`: Get all users.
- `GET /api/users/:id`: Get a user by ID.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:id`: Update a user.
- `DELETE /api/users/:id`: Delete a user.

- `GET /api/posts`: Get all posts.
- `GET /api/posts/:id`: Get a post by ID.
- `POST /api/posts`: Create a new post.
- `PUT /api/posts/:id`: Update a post.
- `DELETE /api/posts/:id`: Delete a post.

- `GET /api/users/:id/followers`: Get all followers of a user.
- `POST /api/users/:id/followers/:followerId`: Follow a user.
- `DELETE /api/users/:id/followers/:followerId`: Unfollow a user.

## Mock Data Feeder Script

To use the mock data feeder script, run the following command:

```
npm run seed
```

This will populate the database with mock users and posts for testing purposes.

## Screenshots

![Frontend Screenshot](path/to/frontend/screenshot.png)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JavaScript

## Deployment

The backend is deployed on [Heroku](https://www.heroku.com/) and can be accessed at [API Base URL](https://your-heroku-app.herokuapp.com/).

## Contributors

- Your Name (@yourgithubusername)

```

Feel free to customize the content as per your project specifics. Let me know if you need any more help!