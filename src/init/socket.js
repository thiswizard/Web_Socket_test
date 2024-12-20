import { Server as SocketIO } from 'socket.io';
import registhandler from '../handlers/register.handler.js';

const initSocket = (server) => {
  const io = new SocketIO();
  io.attach(server);
  registhandler(io);
};

export default initSocket;
