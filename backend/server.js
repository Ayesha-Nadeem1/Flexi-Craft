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
const { TIMEOUT } = require('dns');
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
  socket.on(ACTIONS.JOIN, ({ roomId, username, updatedElements }) => {
    socket.join(roomId); // Join the room
    socket.username = username; // Store the username on the socket object

    // If the room doesn't exist, initialize it
    if (!rooms[roomId]) {
      rooms[roomId] = updatedElements ? JSON.parse(updatedElements) : [];
      //rooms[roomId] = []
    }
  
    // Send the latest state to the new user
    socket.to(roomId).emit('syncState', {
      roomId,
      updatedElements: JSON.stringify(rooms[roomId]) // Send latest stored state
    });

  
    // Broadcast to all clients in the room
    const clients = getAllConnectedClients(roomId);
    io.to(roomId).emit(ACTIONS.JOINED, {
      clients,
      username,
      socketId: socket.id,
    });

  });

  socket.on('getstatus', ({roomId})=>{
    socket.to(roomId).emit('getstatus', {roomId})
  })
  

  socket.on('elementClicked', ({ roomId, selectedElement }) => {
    socket.to(roomId).emit('syncState', { roomId, selectedElement });
    socket.to(roomId).emit('elementClicked', { roomId, selectedElement });
  });

  socket.on('carouselupdated', ({ roomId, elementId, updatedimgcarousels,
     updatedtitle, updatedtitlecolor, updatedElements}) => {
    socket.to(roomId).emit('syncState', { roomId, updatedElements });
    socket.to(roomId).emit('carouselupdated', { elementId, updatedimgcarousels,
    updatedtitle, updatedtitlecolor, });
  });

  socket.on('tcupdated', ({ 
    roomId, 
    elementId,  
    tabs,
    tabContents,
    tabHeading,
    acbHeading,
    accordions,
    updatedElements}) => {
    socket.to(roomId).emit('syncState', { roomId, updatedElements });
    socket.to(roomId).emit('tcupdated', { 
    elementId,  
    tabs,
    tabContents,
    tabHeading,
    acbHeading,
    accordions, 
    });
 });

  socket.on('templateselected',({roomId, selectedtemplate , apidata, updatedElements })=>{
   socket.to(roomId).emit('syncState', { roomId, updatedElements });
   socket.to(roomId).emit('templateselected', {selectedtemplate, apidata})
 })

  socket.on('textUpdated', ({ roomId, elementId, updatedText, updatedElements }) => {
    socket.to(roomId).emit('syncState', { roomId, updatedElements });
    socket.to(roomId).emit('textUpdated', { elementId, updatedText });
  });

  socket.on('stepsupdated', ({roomId, elementId, steps, StepHeading, updatedElements }) => {
    socket.to(roomId).emit('syncState', { roomId, updatedElements });
    socket.to(roomId).emit('stepsupdated', { elementId, steps, StepHeading });
  });

  socket.on('HeaderUpdated', ({ roomId, elementId, updatedText, field,updatedElements }) => {
    socket.to(roomId).emit('syncState', { roomId, updatedElements });
    socket.to(roomId).emit('HeaderUpdated', { elementId, updatedText, field });
  });

  socket.on('componentDropped', ({ roomId, updatedElements, addedElement, containerId }) => {
    console.log(`Dropped event received for Room ID: ${roomId}`);

    if (rooms[roomId]) {
      try {
        socket.to(roomId).emit('syncState', { roomId, updatedElements });
        socket.to(roomId).emit('componentDropped', { roomId, addedElement, containerId });
        console.log(`State synced with Room ID: ${roomId}`);
      } catch (err) {
        console.error(`Invalid JSON received for Room ID: ${roomId}`, err);
      }
    } else {
      console.warn(`Room ID ${roomId} not found. No sync performed.`);
    }
  });

  socket.on('componentDeleted', ({ roomId, updatedElements, deletedElement }) => {
    console.log(`Delete event received for Room ID: ${roomId}`);

    if (rooms[roomId]) {
      try {
        socket.to(roomId).emit('syncState', { roomId, updatedElements });
        socket.to(roomId).emit('componentDeleted', { roomId, updatedElements, deletedElement });
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



