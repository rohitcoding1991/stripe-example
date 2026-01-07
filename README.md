# MERN Stack Project

This project is a full-stack application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It features both a frontend and a backend that work together seamlessly.

## Repository

The repository containing both the frontend and backend code is hosted on GitHub: [Stripe Example GitHub Repository](https://github.com/rohitcoding1991/stripe-example.git)

## Project Structure

The repository is organized into the following structure:

```
stripe-example/
|-- backend/    # Backend code (Node.js, Express.js, MongoDB)
|-- frontend/   # Frontend code (React.js)
```

## Installation and Setup

### Prerequisites

- Node.js (v20+)
- npm or yarn
- MongoDB (running locally or on a cloud service like MongoDB Atlas)

### Clone the Repository

```bash
git clone https://github.com/rohitcoding1991/stripe-example.git
cd stripe-example
```

### Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the `backend` directory and add the required configuration. Example:

   ```env
   PORT=2132
   MONGO_URI=your_mongodb_connection_string
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET_KEY=your_stripe_webhook_secret_key
   BASE_URL=your_base_url
   SESSION_SECRET=your_session_secret
   DB_NAME=your_database_name
   secret=your_secret
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

   The backend server will run at `http://localhost:2132`.

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the `frontend` directory and add the required configuration. Example:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:2132
   ```

4. Start the frontend server:

   ```bash
   npm start
   ```

   The frontend server will run at `http://localhost:3000`.

## Running the Application

1. Ensure that MongoDB is running locally or that your cloud database is accessible.
2. Start the backend server as described above.
3. Start the frontend server as described above.
4. Open your browser and navigate to `http://localhost:3000` to access the application.

## Features

- **Frontend**: React-based user interface for interacting with the backend and Stripe.
- **Backend**: Node.js and Express.js server for API endpoints and integration with MongoDB and Stripe.
- **Stripe Integration**:
  - One-time payments using Stripe Hosted Checkout.
  - Subscription management (create, upgrade, and downgrade subscriptions) using Stripe Hosted Checkout.

## Contributing

If you'd like to contribute to this project:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Happy coding!

