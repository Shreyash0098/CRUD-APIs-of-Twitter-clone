const doTweet =
  "INSERT INTO tweets (body, likes, comments, tweet_id, user_id, imageUrl, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const getTweets = "SELECT * FROM tweets";
const getTweetById = "SELECT * FROM tweets WHERE id = $1";
// const updateTweet = "UPDATE tweet SET ";
const deleteTweet = "DELETE FROM tweets WHERE id = $1";
const updateTweet = "UPDATE tweets SET body = $1 WHERE id = $2";

module.exports = {
  doTweet,
  getTweets,
  getTweetById,
  deleteTweet,
  updateTweet,
};
