# Todo Application

A full-stack todo application with user authentication, built with **React** and **TypeScript**.

## Features

- **Authentication** — register and login with JWT, stored in local storage
- **Protected & guarded routes** — logged-out users are redirected away from private pages, and logged-in users can't access login/register
- **CRUD on todos** — create, edit, and delete todos with form validation (React Hook Form + Yup)
- **Pagination & sorting** — server-side pagination with adjustable page size, and sorting by oldest/latest
- **Bulk todo generation** — generate 100 random todos at once for quick testing (using Chance.js)
- **Toast notifications** — success/error feedback with react-hot-toast

## Tech Stack

- React 19 + TypeScript
- Vite
- React Router
- TanStack Query (data fetching, caching, pagination)
- React Hook Form + Yup (form validation)
- Axios
- Tailwind CSS + Headless UI + Heroicons
- react-hot-toast

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/Mahmoud-Ragab256/Todo.git
cd Todo
```

### 2. Run the backend server

```bash
cd Strapi/todo
npm install
npm run develop
```

The backend runs on `http://localhost:1337`.

### 3. Run the frontend

From the project root:

```bash
npm install
npm run dev
```

The app runs on Vite's default port (`http://localhost:5173`).

### 4. Use the app

1. Open the app in your browser and register a new account.
2. Log in — you'll be redirected to the home page.
3. Go to the Todos page to view, add, edit, delete, sort, and paginate your todos.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |
