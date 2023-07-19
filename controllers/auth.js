const queries = require("../queries/userqueries");
const pool = require("../db");

exports.signup = async (req, res, next) => {
  const { username, password, created_at } = req.body;
  // console.log(username, password);
  try {
    await pool.query(queries.signin, [username, password, created_at]);
    if (!req.body.username || !req.body.password) {
      const error = new Error("username and password are required");
      error.statusCode = 422;
      throw error;
    }
    // if()
    res.status(201).send("signup successfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const result = await pool.query(queries.getUsers);
    res.status(201).json(result.rows);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query(queries.getUserById, [id]);
    const noUserFound = result.rows.length;
    if (!noUserFound) {
      const error = new Error("no user found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(result.rows);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const result = await pool.query(queries.getUserById, [id]);
  const noUserFound = !result.rows.length;
  if (noUserFound) {
    res.send("no User found");
  }

  await pool.query(queries.deleteUser, [id]);
  res.status(200).send("deleted successfully");
};

exports.updateUser = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { username, password } = req.body;

  const result = await pool.query(queries.getUserById, [id]);
  const noUserFound = !result.rows.length;
  if (noUserFound) {
    res.send("no User found");
  }

  await pool.query(queries.updateUser, [username, password, id]);
  res.status(200).send("User updated successfully");
};

// exports.loginUser = async (req, res, next) => {};
