// Manage users he-lper functions

const users = [];

const addUser = ({ id, name, room }) => {
  // 1) Style the room & name
  name = name.trim();
  room = room.trim().toLowerCase();
  // 2) Check if user exists
  const userExists = users.find(
    (user) => user.room === room && user.name === name
  );

  if (userExists)
    return {
      error: "User already exists, please choose a different user name ",
    };

  // 3) Create the user and push it to the users array
  const user = { id, name, room };
  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUserInRoom = (room) => {
  users.filter((user) => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUserInRoom };
