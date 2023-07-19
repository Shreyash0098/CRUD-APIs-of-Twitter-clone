const queries = require("../queries/tweetqueries");
const pool = require("../db");
// const path = require('path');
const { validationResult } = require("express-validator");

exports.doTweet = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const { body, likes, comments, tweet_id, imageUrl, user_id, created_at } =
      req.body;

    if (!req.body.body) {
      const error = new Error("write something before tweet");
      error.statusCode = 422;
      throw error;
      // next(err);
    }
    await pool.query(queries.doTweet, [
      body,
      likes,
      comments,
      tweet_id,
      user_id,
      imageUrl,
      created_at,
    ]);
    // if (error) throw error;
    res.status(201).send("tweeted successfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getTweets = async (req, res, next) => {
  try {
    const result = await pool.query(queries.getTweets);
    // if (error) throw error;
    res.status(201).json(result.rows);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getTweetById = async (req, res, next) => {
  const id = parseInt(req.params.id);
  // console.log(id);
  try {
    const result = await pool.query(queries.getTweetById, [id]);
    const noTweetFound = !result.rows.length;
    // console.log(result.rows.length);
    if (noTweetFound) {
      const error = new Error("no tweet found");
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

exports.deleteTweet = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query(queries.getTweetById, [id]);
    const noTweetFound = !result.rows.length;
    if (noTweetFound) {
      const error = new Error("no tweet found");
      error.statusCode = 404;
      throw error;
    }
    await pool.query(queries.deleteTweet, [id]);
    res.status(200).send("deleted successfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateTweet = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { body } = req.body;
  try {
    const result = await pool.query(queries.getTweetById, [id]);
    const noTweetFound = !result.rows.length;
    if (noTweetFound) {
      const error = new Error("no tweet found");
      error.statusCode = 404;
      throw error;
    }
    await pool.query(queries.updateTweet, [body, id]);
    // if (error) throw error;
    res.status(200).send("Tweet updated successfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
