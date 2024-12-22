const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const ACTIONS = {
  JOIN: "join",
  JOINED: "joined",
  DISCONNECTED: "disconnected",
  COMPONENT_DROPPED: "componentDropped",
  COMPONENT_DELETED: "componentDeleted",
};

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
const templateRoutes = require('./templates');
app.use('/api/templates', templateRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const rooms = {}; // Store the rooms and clients connected

// Get all connected clients in a room
function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: io.sockets.sockets.get(socketId)?.username || '',
      };
    }
  );
}

io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  // Handle JOIN event
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    socket.join(roomId); // Join the room
    socket.username = username; // Store the username on the socket object
    console.log(`${username} joined room: ${roomId}`);

    //sync canvas for new user too bozo

    // Initialize the room if it doesn't exist
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    // Broadcast to all clients in the room
    const clients = getAllConnectedClients(roomId);
    io.to(roomId).emit(ACTIONS.JOINED, {
      clients,
      username,
      socketId: socket.id,
    });
  });

  socket.on('componentDropped', ({ roomId, updatedElements }) => {
    console.log(`Dropped event received for Room ID: ${roomId}`);

    // Validate if the room exists
    if (rooms[roomId]) {
      try {
        JSON.parse(updatedElements); // Validate JSON
        socket.to(roomId).emit('syncState', { roomId, updatedElements });
        socket.to(roomId).emit('componentDropped', { roomId, updatedElements });
        console.log(`State synced with Room ID: ${roomId}`);
      } catch (err) {
        console.error(`Invalid JSON received for Room ID: ${roomId}`, err);
      }
    } else {
      console.warn(`Room ID ${roomId} not found. No sync performed.`);
    }
  });

  socket.on('componentDeleted', ({ roomId, updatedElements }) => {
    console.log(`Delete event received for Room ID: ${roomId}`);

    // Validate if the room exists
    if (rooms[roomId]) {
      try {
        JSON.parse(updatedElements); // Validate JSON
        socket.to(roomId).emit('syncState', { roomId, updatedElements });
        socket.to(roomId).emit('componentDeleted', { roomId, updatedElements });
        console.log(`State synced with Room ID: ${roomId}`);
      } catch (err) {
        console.error(`Invalid JSON received for Room ID: ${roomId}`, err);
      }
    } else {
      console.warn(`Room ID ${roomId} not found. No sync performed.`);
    }
  });

  socket.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
    console.log(`${socket.id} disconnected`);

    // Iterate over the rooms the socket is connected to
    const roomsList = Array.from(socket.rooms);
    roomsList.forEach((roomId) => {
        // If the room exists, remove the client from the room and broadcast the disconnection
        if (rooms[roomId]) {
            const clientIndex = rooms[roomId].findIndex(client => client.socketId === socket.id);
            if (clientIndex !== -1) {
                rooms[roomId].splice(clientIndex, 1); // Remove the client

                // Send the updated list of clients to all others in the room
                const updatedClients = getAllConnectedClients(roomId);
                io.to(roomId).emit(ACTIONS.DISCONNECTED, {
                    socketId: socket.id,
                    username: socket.username,
                    clients: updatedClients, // Send the updated list of clients
                });
            }
        }
    });
});




});

server.listen(5000, () => {
  console.log('Listening on port 5000');
});



//leave n rejoin r finicky rn will fix later 