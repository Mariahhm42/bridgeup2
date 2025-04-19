import express from 'express';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import cors from 'cors';
import routes from './src/routes/index.js';
import setupLobby from './src/socket.js';

const app = express();
app.use(cors(), express.json());
app.use('/api', routes);

const server = http.createServer(app);
const io = new SocketIO(server, { cors: { origin: '*' } });
setupLobby(io);

const PORT = process.env.PORT || 8001;
server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
