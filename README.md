# WebSocket Project

A comprehensive WebSocket project featuring real-time communication, efficient message broadcasting, and room-based messaging.

## Features

- **Real-Time Communication**: Enable real-time communication between clients using WebSockets.

- **Redis Integration**: Use Redis for efficient management of WebSocket subscriptions and message broadcasting.
<img src="CMD screenshot.jpg" alt="Redis Integration Screenshot">
- **Room-Based Messaging**: Support room-based messaging to allow targeted communication between specific groups of users.
<img src="GUI Screenshot.jpg" alt="GUI Screenshot">
- **TypeScript**: Refactor the codebase to TypeScript for better type safety and code maintainability.

- **Express Integration**: Integrate the WebSocket server with Express for streamlined client management.

- **Message Broadcasting**: Broadcast messages to all connected WebSocket clients.

- **User Management**: Implement user management to handle room-based messaging and user-specific functionalities.

- **GUI with Echo Functionality**: Add a graphical user interface with an echo message feature for user interaction.

## Technologies Used

- WebSocket
- Redis
- TypeScript
- Express


## Getting Started

Follow these steps to get the project up and running on your local machine:

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/websocket-project.git
cd websocket-project
```

### 2. Install Dependencies

Install the required dependencies for both the client and server:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Start Redis with Docker

Ensure you have Docker installed. Start Redis using Docker with the following command:

```bash
docker run -p 6379:6379 redis
```

This command will pull the Redis image from Docker Hub (if not already available) and start Redis on port 6379.

### 4. Start the Server

Navigate to the `server` directory and start the server:

```bash
cd server
npm run dev
```

This command will start the WebSocket server and listen for incoming connections.


### 5. Open the Application

Once both the server and client are running, open your web browser and navigate to `http://localhost:8080` to access the client application.

### 6. Join a Room

Enter a room ID in the text field and click the "Enter Room" button to join a room. This will redirect you to a page where you can send and receive messages in real time.

### 7. Send Messages

Use the text input field to type your message and click the "Send" button or press Enter to send messages to the room.