# Capstone Connections

App deployed to https://capstone-connections.surge.sh/

## Description of app

Learning to code is hard. Learning to do it by yourself or as part of a remote coding bootcamp is even harder. Capstone Connections aims to be a welcoming and supportive community that connects developers at all levels.

## Features

- Register an account
- Login with username and password
- Edit account profile
- Post a project and optionally ask for feedback from others
- View all projects from all users
  - Filter the projects shown by tag name.
  - Sort the projects shown by either
    - Newest (most recently added projects at the top)
    - Most likes (projects with most likes at the top)
- View a specific project's details, including
  - a link to the version control repo,
  - a link to the deployed app, and
  - the feedback requested
- Like and unlike a project
- View a specific user's details, including
  - name,
  - bio, and
  - projects
- Provide feedback to users on their projects
- Edit feedback comments they have previously submitted.

## Testing

## Standard User Flow

1. A user creates an account by going to the sign up page OR logs in if they have already created an account. Either way, the user is signed in.

2. The first page the user sees after signing in is the projects page.

3. On the projects page, the user sees a list of project "cards" from all users and can use the search form at the top to filter projects by tag name or sort projects.

4. From the projects page, on any project card, a user can

- click the heart icon to like/unlike a project,
- click the project name to be taken to the project detail page, or
- click on the project creator's name to be taken to the user's page showing their projects

5. From the project details page, a user can

- view information about the project,
- like/unlike the project, and
- provide/edit feedback about the project

## Stack

This is a JavaScript app that uses the PERN (PostgreSQL, Express, React, and Node) stack.
For more information about the backend, please see the README at https://github.com/andreamartz/capstone-connection-api.

## Backend API

The data for this project can be accessed from the backend API. For details about this API, see the repo at https://github.com/andreamartz/capstone-connection-api.
