# Book Review App

A simple Book Review web application built using **Node.js, Express.js, EJS, JavaScript, and PostgreSQL**.  
The app allows users to add, view, and manage book reviews through a clean server-rendered interface.

## Features

- Add book details
- Write and view book reviews
- Store data in PostgreSQL
- Server-side rendering using EJS
- Static assets using CSS and JavaScript
- Backend and database logic handled inside `index.js`

## Tech Stack

- Node.js
- Express.js
- EJS
- JavaScript
- PostgreSQL
- CSS

## Project Structure

book-review-app/
│
├── public/
│   ├── styles/
│   └── assets/
│
├── views/
│   ├── index.ejs
│   ├── new.ejs
│   └── partials/
│
├── index.js
├── package.json
├── package-lock.json
└── README.md

## Installation

1. Clone the repository

git clone https://github.com/your-username/book-review-app.git

2. Go to the project folder

cd book-review-app

3. Install dependencies

npm install

4. Set up PostgreSQL database

Create a PostgreSQL database and required table according to your project schema.

5. Run the project

node index.js

Or if you are using nodemon:

nodemon index.js

## Usage

Open your browser and visit:

http://localhost:3000

## Author

Anuja Ghosal
