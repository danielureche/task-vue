# Task Management Frontend

A modern, responsive frontend application built with **Vue.js** that consumes the Task Management API. This project provides a user-friendly interface for managing tasks, using a clean design powered by **Tailwind CSS**, form validation with **Zod + VeeValidate**, and notifications via **Vue Sonner**.

## Features

- ✅ **Task CRUD**: Create, view, edit and delete tasks
- 🔒 **API Integration**: Connects seamlessly with a Laravel backend via Axios
- 🎨 **Tailwind CSS**: Modern, responsive UI
- 🧪 **Zod + VeeValidate**: Strong form validation
- 🔔 **Vue Sonner**: Toast notifications
- 🌐 **Vue Router**: Route-based navigation
- 💡 **Vue Flowbite**: Pre-styled component integration

## Technologies Used

- [Vue.js 3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [Vue Router](https://router.vuejs.org/)
- [VeeValidate](https://vee-validate.logaretm.com/)
- [Zod](https://zod.dev/)
- [Vue Sonner](https://vue-sonner.vercel.app/)
- [Flowbite + Vue](https://flowbite.com/docs/getting-started/vue/)

## Consumed API Endpoints

These endpoints are provided by the Laravel backend and are consumed via Axios:

### 🔐 Authentication

- `POST /api/register` – Register new user
- `POST /api/login` – Login and receive token
- `POST /api/logout` – Logout and invalidate token

### 📋 Tasks (authenticated)

- `GET /api/tasks` – Fetch all tasks
- `POST /api/tasks` – Create a new task
- `PATCH /api/tasks/{id}` – Update a task
- `DELETE /api/tasks/{id}` – Delete a task

## Requirements

- Node.js >= 18
- npm or yarn
- Backend API running (see [Task Management API](https://github.com/danielureche/task-api-laravel.git))

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment**

   ```bash
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. **Configure environment**
   ```bash
   npm run dev
   # or
   yarn dev
   ```