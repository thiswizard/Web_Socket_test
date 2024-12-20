import { v4 } from 'uuid';
import { addUser } from '../models/user.model.js';
import { helper_connect, helper_disconnected, helper_event } from './helper.js';

const registhandler = (io) => {
  io.on('connection', (socket) => {

    const userUUID = v4(); 
    addUser({ uuid: userUUID, socketId: socket.id }); 

    helper_connect(socket, userUUID);

    
    socket.on('event', (data) => helper_event(io, socket, data));
    socket.on('disconnect', () => helper_disconnected(socket, userUUID));
  });
};

export default registhandler;
