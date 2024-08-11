import express from 'express';
import http from 'http';
import cors from 'cors';
import fetch from 'node-fetch'; // Using import for ESM
import { Server as socketIo } from 'socket.io';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new socketIo(server, {
    cors: {
        origin: "https://ace-frontend-snowy.vercel.app/"
    }
});

app.use(express.static('public'));

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Fetch disaster data function
const fetchDisasterData = async (lat, lng,type) => {
  const apiKey = process.env.Ambee_API_Key;
  const url = `https://api.ambeedata.com/${type}/latest/by-lat-lng?lat=${lat}&lng=${lng}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching disaster data:', error);
    throw error;
  }
};

// Define endpoint to fetch disaster data
app.get('/weather', async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const data = await fetchDisasterData(lat, lng, "weather");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/disasters', async (req, res) => {
    const { lat, lng } = req.query;
  
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
  
    try {
      const data = await fetchDisasterData(lat, lng, 'disasters');
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/news', async (req, res) => {
    const date = getCurrentDateTime();
    try {
      const data = await fetch(`https://gnews.io/api/v4/search?q=natural%20disasters&lang=en&country=in&max=52&apikey=959052fd913812543f2e90d1c39d6383&${date}`);
      const json = await data.json();
      res.status(200).json(json)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  



io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);
        console.log(`User ${socket.id} joined room: ${roomName}`);
    });

    socket.on('chatMessage', (data) => {
        // Broadcast the message to everyone in the room
        io.to(data.room).emit('message', { user: data.user, message: data.message });

        // Notify everyone except the sender
        socket.to(data.room).emit('notification', {
            user: data.user,
            message: data.message,
        });
        
        console.log(`Message from ${data.user} in room ${data.room}: ${data.message}`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


function getCurrentDateTime() {
    const now = new Date();
    
    // Get the UTC offset in hours and minutes
    const offset = now.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offset) / 60);
    const offsetMinutes = Math.abs(offset) % 60;
    const offsetSign = offset > 0 ? '-' : '+';
    
    // Format the offset as ±HH:MM
    const formattedOffset = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
    
    // Get the date and time components
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    console.log(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}${formattedOffset}`)
    // Format the date and time
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${formattedOffset}`;
  }
//deploy
//  const __dirname1=path.resolve();
//  if(process.env.NODE_ENV==='production'){
//   app.use(express.static(path.join(__dirname1,'/frontend/dist')))


//   app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname1,"frontend","dist","index.html"))
//   })
//  }

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
