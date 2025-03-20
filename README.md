# Subscription Tracker

Subscription Tracker is a web application that helps users manage their subscriptions. It allows users to create, view, update, and delete subscriptions, and also sends reminders for upcoming renewals.

This README file provides a detailed overview of the project, setup instructions, and descriptions of each API endpoint. You can customize it further based on your specific requirements.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Subscriptions](#subscriptions)
  - [Workflows](#workflows)
- [Error Handling](#error-handling)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/manishde1234/subscription-tracker.git
   cd subscription-tracker
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Environment Variables

Create a `.env.development.local` file in the root directory and add the following environment variables:

```env
#PORT 
PORT=5500
SERVER_URL="http://localhost:5500"

#ENVIRONMENT
NODE_ENV=development

#DATABASES
DB_URI="mongodb+srv://<username>:<password>@cluster0.sl68r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

#JWT_SECRET
JWT_SECRET="secret"
JWT_EXPIRES_IN="1d"

#ARCJET
ARCJET_KEY="ajkey_01jpqztfwefjwbc9vmewse510v"
ARCJET_ENV="development"

#UPSTASH
QSTASH_URL="http://127.0.0.1:8080"
QSTASH_TOKEN="eyJVc2VySUQiOiIxYmZmMzQ0OC0zN2UwLTRhNjktYTgzZi0yNWRkOTRmOTE4MjQiLCJQYXNzd29yZCI6ImYwYjUyMWUxNGM4NDQ0NDM5ZmUwZmI4MTQyZjY0OTVhIn0="

#NODEMAILER
EMAIL_PASSWORD="zuoi wuwd memr upsf"
```

## Running the Application

To start the application in development mode, use:

```sh
npm run dev
```

To start the application in production mode, use:

```sh
npm start
```

## API Endpoints

### Authentication

- **Sign Up**
  - **URL**: `/api/v1/auth/sign-up`
  - **Method**: `POST`
  - **Description**: Creates a new user.
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "message": "User created successfully",
      "data": {
        "token": "jwt_token",
        "user": {
          "_id": "user_id",
          "name": "John Doe",
          "email": "john.doe@example.com"
        }
      }
    }
    ```

- **Sign In**
  - **URL**: `/api/v1/auth/sign-in`
  - **Method**: `POST`
  - **Description**: Logs in a user.
  - **Request Body**:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "message": "User logged in successfully",
      "data": {
        "token": "jwt_token",
        "user": {
          "_id": "user_id",
          "name": "John Doe",
          "email": "john.doe@example.com"
        }
      }
    }
    ```

### Users

- **Get All Users**
  - **URL**: `/api/v1/users`
  - **Method**: `GET`
  - **Description**: Retrieves all users.
  - **Response**:
    ```json
    {
      "success": true,
      "data": [
        {
          "_id": "user_id",
          "name": "John Doe",
          "email": "john.doe@example.com"
        }
      ]
    }
    ```

- **Get User by ID**
  - **URL**: `/api/v1/users/:id`
  - **Method**: `GET`
  - **Description**: Retrieves a user by ID.
  - **Response**:
    ```json
    {
      "success": true,
      "data": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john.doe@example.com"
      }
    }
    ```

### Subscriptions

- **Create Subscription**
  - **URL**: `/api/v1/subscriptions`
  - **Method**: `POST`
  - **Description**: Creates a new subscription.
  - **Request Body**:
    ```json
    {
      "name": "Netflix Premium",
      "price": 15.99,
      "currency": "USD",
      "frequency": "monthly",
      "category": "entertainment",
      "startDate": "2025-03-22T00:00:00.000Z",
      "paymentMethod": "Credit Card"
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "data": {
        "_id": "subscription_id",
        "name": "Netflix Premium",
        "price": 15.99,
        "currency": "USD",
        "frequency": "monthly",
        "category": "entertainment",
        "startDate": "2025-03-22T00:00:00.000Z",
        "paymentMethod": "Credit Card",
        "status": "active",
        "renewalDate": "2025-04-22T00:00:00.000Z",
        "user": "user_id"
      }
    }
    ```

- **Get All Subscriptions**
  - **URL**: `/api/v1/subscriptions`
  - **Method**: `GET`
  - **Description**: Retrieves all subscriptions.
  - **Response**:
    ```json
    {
      "title": "GET all subscriptions"
    }
    ```

- **Get Subscription by ID**
  - **URL**: `/api/v1/subscriptions/:id`
  - **Method**: `GET`
  - **Description**: Retrieves a subscription by ID.
  - **Response**:
    ```json
    {
      "title": "GET subscription details"
    }
    ```

- **Update Subscription**
  - **URL**: `/api/v1/subscriptions/:id`
  - **Method**: `PUT`
  - **Description**: Updates a subscription by ID.
  - **Response**:
    ```json
    {
      "title": "UPDATE subscription"
    }
    ```

- **Delete Subscription**
  - **URL**: `/api/v1/subscriptions/:id`
  - **Method**: `DELETE`
  - **Description**: Deletes a subscription by ID.
  - **Response**:
    ```json
    {
      "title": "DELETE subscription"
    }
    ```

- **Get User Subscriptions**
  - **URL**: `/api/v1/subscriptions/user/:id`
  - **Method**: `GET`
  - **Description**: Retrieves all subscriptions for a user by user ID.
  - **Response**:
    ```json
    {
      "success": true,
      "data": [
        {
          "_id": "subscription_id",
          "name": "Netflix Premium",
          "price": 15.99,
          "currency": "USD",
          "frequency": "monthly",
          "category": "entertainment",
          "startDate": "2025-03-22T00:00:00.000Z",
          "paymentMethod": "Credit Card",
          "status": "active",
          "renewalDate": "2025-04-22T00:00:00.000Z",
          "user": "user_id"
        }
      ]
    }
    ```

- **Cancel Subscription**
  - **URL**: `/api/v1/subscriptions/:id/cancel`
  - **Method**: `PUT`
  - **Description**: Cancels a subscription by ID.
  - **Response**:
    ```json
    {
      "title": "CANCEL subscription"
    }
    ```

- **Get Upcoming Renewals**
  - **URL**: `/api/v1/subscriptions/upcoming-renewals`
  - **Method**: `GET`
  - **Description**: Retrieves upcoming renewals.
  - **Response**:
    ```json
    {
      "title": "GET upcoming renewals"
    }
    ```

### Workflows

- **Send Reminders**
  - **URL**: `/api/v1/workflows/subscription/reminder`
  - **Method**: `POST`
  - **Description**: Sends reminders for upcoming subscription renewals.
  - **Request Body**:
    ```json
    {
      "subscriptionId": "subscription_id"
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "message": "Reminders sent"
    }
    ```

## Error Handling

The application uses a centralized error handling middleware to catch and handle errors. The middleware is defined in `middleware/error.middleware.js`.

## License

This project is licensed under the MIT License.