import { getUsers, removeUser } from '../models/user.model.js';
import { valid_version } from '../constants.js';
import Mappinghandler from './handlerMapping.js';
import { createStage } from '../models/stage.model.js';

export const helper_connect = (socket, userUUID) => {
  console.log(`new user connected: ${userUUID} , ${socket.id}`);
  console.log('now user:', getUsers());
  createStage(userUUID);

  socket.emit('connection', { uuid: userUUID });
};

export const helper_disconnected = (socket, uuid) => {
  removeUser(socket.id); 
  console.log(`disconnected: ${socket.id}`);
  console.log('now users:', getUsers());
};

export const helper_event = (io, socket, data) => {
  if (!valid_version.includes(data.clientVersion)) {
    socket.emit('response', { status: 'fail', message: 'valid_version can not found' });
    return;
  }

  const handler = Mappinghandler[data.handlerId];
  if (!handler) {
    socket.emit('response', { status: 'fail', message: 'handler can not found' });
    return;
  }

  const response = handler(data.userId, data.payload);
  if (response.broadcast) {
    io.emit('response', 'broadcast');
    return;
  }
  socket.emit('response', response);
};
