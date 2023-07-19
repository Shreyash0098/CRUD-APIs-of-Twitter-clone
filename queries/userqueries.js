const signin =
  "INSERT INTO users ( username, password ,created_at) VALUES ($1, $2, $3)";
const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const deleteUser = "DELETE FROM users WHERE id = $1";
const updateUser =
  "UPDATE users SET username = $1, password = $2 WHERE ID = $3";

module.exports = {
  signin,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
