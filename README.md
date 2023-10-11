# Cancer Care Connect - Realtime Chat and Forum Application

Cancer Care Connect is a React application that serves as a platform for connecting cancer patients, survivors, and caregivers. The app is divided into two parts: the frontend and the backend. The frontend code is located in the `client` folder, while the backend is in the `server` folder. The backend was built with Node.js and PostgreSQL, providing a robust API for the frontend. Below are the key features of the application:

## Features

### 1. Realtime Chat System

Cancer Care Connect includes a real-time chat system powered by Firebase's Realtime Database. Users can engage in instant conversations, providing a supportive environment for sharing experiences and advice.

### 2. Forum Feature

The app allows users to create, edit, and delete forum posts. Additionally, users can comment on forums created by others, fostering a sense of community and enabling discussions on various topics related to cancer.

## Installation and Usage

### Frontend (Client)

1. Navigate to the `client` folder:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

4. Access the app at [http://localhost:3000](http://localhost:3000).

### Backend (Server)

1. Navigate to the `server` folder:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the PostgreSQL database by updating the connection details in `server/config/db.config.js`.

4. Run the Node.js server:
   ```bash
   npm start
   ```

   The backend server will be running at [http://localhost:5000](http://localhost:5000).

## Live Demo

Check out the live version of the application at [Cancer Care Connect](https://cancer-care-connect.vercel.app/).

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help improve the application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Cancer Care Connect** - Connecting Lives, Sharing Hope.
