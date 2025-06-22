# Task Manager API

## Project Overview

This is a simple Task Manager API built with Node.js and Express. It allows you to manage tasks, including creating, reading, updating, and deleting tasks. Tasks can have a title, description, completion status, and priority.

## Setup Instructions

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```
    (Replace `<repository_url>` and `<repository_name>` with your actual repository information.)

2.  **Install dependencies:**
    Navigate to the project directory and install the necessary Node.js packages:
    ```bash
    npm install
    ```

3.  **Start the server:**
    You can start the server in development mode (with `nodemon` for automatic restarts) or in production mode:

    * **Development:**
        ```bash
        npm run dev
        ```
    * **Production:**
        ```bash
        npm start
        ```

    The API will be running on `http://localhost:3000`.

## API Endpoints

Below is the documentation for all available API endpoints, including their methods, paths, and how to test them.

---

### 1. Get All Tasks

* **Method:** `GET`
* **Path:** `/tasks`
* **Description:** Retrieves a list of all tasks.
* **Query Parameters:**
    * `completed`: (Optional) Filter tasks by completion status (`true` or `false`).
    * `sort`: (Optional) Sort tasks by creation date (`asc` for ascending, `desc` for descending).
* **Example Requests:**
    * Get all tasks:
        ```bash
        curl http://localhost:3000/tasks
        ```
    * Get completed tasks:
        ```bash
        curl http://localhost:3000/tasks?completed=true
        ```
    * Get tasks sorted by creation date in descending order:
        ```bash
        curl http://localhost:3000/tasks?sort=desc
        ```

---

### 2. Get Task by ID

* **Method:** `GET`
* **Path:** `/tasks/:id`
* **Description:** Retrieves a single task by its unique ID.
* **Path Parameters:**
    * `id`: The ID of the task to retrieve.
* **Example Request:**
    * Get task with ID 1:
        ```bash
        curl http://localhost:3000/tasks/1
        ```

---

### 3. Get Tasks by Priority Level

* **Method:** `GET`
* **Path:** `/tasks/priority/:level`
* **Description:** Retrieves tasks filtered by their priority level.
* **Path Parameters:**
    * `level`: The priority level (`low`, `medium`, or `high`).
* **Example Request:**
    * Get all high-priority tasks:
        ```bash
        curl http://localhost:3000/tasks/priority/high
        ```

---

### 4. Create a New Task

* **Method:** `POST`
* **Path:** `/tasks`
* **Description:** Creates a new task.
* **Request Body (JSON):**
    * `title` (string, **required**): The title of the task.
    * `description` (string, **required**): A description of the task.
    * `priority` (string, optional): The priority of the task (`low`, `medium`, or `high`). Defaults to `medium`.
* **Example Request:**
    ```bash
    curl -X POST -H "Content-Type: application/json" \
         -d '{"title": "Buy groceries", "description": "Milk, eggs, bread", "priority": "high"}' \
         http://localhost:3000/tasks
    ```

---

### 5. Update an Existing Task

* **Method:** `PUT`
* **Path:** `/tasks/:id`
* **Description:** Updates an existing task by its ID.
* **Path Parameters:**
    * `id`: The ID of the task to update.
* **Request Body (JSON):**
    * `title` (string, **required**): The updated title of the task.
    * `description` (string, **required**): The updated description of the task.
    * `completed` (boolean, optional): The updated completion status of the task.
    * `priority` (string, optional): The updated priority of the task (`low`, `medium`, or `high`). Defaults to `medium`.
* **Example Request:**
    * Update task with ID 1:
        ```bash
        curl -X PUT -H "Content-Type: application/json" \
             -d '{"title": "Set up environment", "description": "Install Node.js, npm, and git for project X", "completed": true, "priority": "high"}' \
             http://localhost:3000/tasks/1
        ```

---

### 6. Delete a Task

* **Method:** `DELETE`
* **Path:** `/tasks/:id`
* **Description:** Deletes a task by its ID.
* **Path Parameters:**
    * `id`: The ID of the task to delete.
* **Example Request:**
    * Delete task with ID 1:
        ```bash
        curl -X DELETE http://localhost:3000/tasks/1
        ```