# Proxy API Frontend

## Technical Overview

This project is a web application built using React, Next and Redux Toolkit for state management. The application allows users to search for results and view them with pagination. The main features include:

- **Search Functionality**: Users can search for results using a search form. The search query is managed globally using Redux.
- **Results Display**: The search results are displayed in a list format. The results are fetched from an API and managed globally using Redux.
- **Pagination**: The application supports pagination, allowing users to navigate through multiple pages of results.
- **Search Highlight**: Users can search for a specific term within the results, and the term will be highlighted in the displayed results.
- **Error Handling**: If an error occurs while fetching the search results, an error alert is displayed for a short period.
- **Query History**: The application saves the search query history in local storage and loads it on initial load.

### Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: A library for efficient Redux development.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for styling.

### Project Structure

- `src/`: Contains the source code of the application.
  - `components/`: Contains the React components.
  - `store/`: Contains the Redux store configuration and slices.
  - `app/`: Contains the main application component and related files.

### Getting Started

First, install the dependencies:

```bash
npm install
```

Edit the .env file if necessary.

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
