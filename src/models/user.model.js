const users = [];

export const addUser = (user) => {
  users.push(user);
};

export const removeUser = (socketid) => {
  const index = users.findIndex((user) => user.socketid === socketid);
  if (index !== -1) {return users.splice(index, 1);}
};

export const getUsers = () => {
  return users;
};
