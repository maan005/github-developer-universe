# GitHub Developer Universe

A full-stack GitHub analytics dashboard built with React, TypeScript, Node.js, and Express.

## Features

* Search GitHub users
* View profile information
* Explore repositories
* Sort repositories by stars, name, and last updated
* Expand repository details
* Server-side caching with NodeCache
* Error handling for invalid users and rate limits
* Loading states
* Recent search history using localStorage
* Language distribution chart
* Responsive glassmorphism UI

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Recharts
* Framer Motion

### Backend

* Node.js
* Express
* TypeScript
* Axios
* NodeCache

## Architecture

Frontend → Express Backend → GitHub API

The frontend never calls GitHub directly. The backend acts as a proxy layer and provides caching to reduce GitHub API requests.

## Installation

### Backend

cd server

npm install

npm run dev

### Frontend

cd client

npm install

npm run dev

## Future Improvements

* Authentication using GitHub OAuth
* Contribution heatmap
* Advanced repository analytics
* User comparison dashboard
* Deployment using Vercel and Render
