# API Endpoints

## Authentication Endpoints

-   `POST /api/auth/register`: Register a new user.
-   `POST /api/auth/login` - Authenticate a user
-   `POST /api/auth/send-verification` - Send a verification email
-   `GET /api/auth/verify/:token` - Verify a user's email

## Task Management Endpoints

-   `GET /api/tasks` - Fetch all tasks for the authenticated user
-   `POST /api/tasks` - Create a new task
-   `PUT /api/tasks/:id` - Update an existing task
-   `DELETE /api/tasks/:id` - Delete a task

## Example Endpoints

**Note**: All the example endpoints are protected and require a valid JWT to access.

### Fetch All Tasks

```bash
curl -X GET http://localhost:8080/api/tasks -H "Authorization: Bearer <your_jwt_token>"
```

### Create a New Task

```bash
curl -X POST http://localhost:8080/api/tasks -H "Authorization: Bearer <your_jwt_token>" -H "Content-Type: application/json" -d '{"title": "New Task", "description": "Task description", "dueDate": "2023-12-31"}'
```

### Update a Existing Task

```bash
curl -X PUT http://localhost:8080/api/tasks/<task_id> -H "Authorization: Bearer <your_jwt_token>" -H "Content-Type: application/json" -d '{"title": "Updated Task", "description": "Updated description", "status": "completed", "dueDate": "2023-12-31"}'
```

### Delete a Task

```bash
curl -X DELETE http://localhost:8080/api/tasks/<task_id> -H "Authorization: Bearer <your_jwt_token>"
```

### Register a New User

```bash
curl -X POST http://localhost:8080/api/auth/register -H "Content-Type: application/json" -d '{"name": "<name>", "email": "<email>", "password": "<password>"}'
```

### Authenticate a User

```bash
curl -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d '{"email": "<email>", "password": "<password>"}'
```

### Send Verification Email

```bash
curl -X POST http://localhost:8080/api/auth/send-verification -H
"Content-Type: application/json" -d '{"email": "<email>"}'
```

### Verify User's Email

```bash
curl -X GET http://localhost:8080/api/auth/verify/<token>
```

This document provides a clear overview of the API endpoints for both authentication and task management, along with example requests for each endpoint. Make sure to replace placeholders like `<name>`, `<email>`, `<password>`, `<token>`, `<your_jwt_token>` and `<task_id>` with actual values when testing the endpoints.

## Conclusion

The API documentation serves as a comprehensive guide for developers to understand and interact with the backend services effectively. By following the provided examples and endpoints, developers can seamlessly integrate the API into their applications and leverage its functionalities to build robust and scalable solutions. The detailed documentation ensures clarity and consistency in API usage, enabling developers to work efficiently and deliver high-quality applications.
