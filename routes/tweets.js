const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const tweetController = require("../controllers/tweets");

// console.log(tweetController);
router.post(
  "/tweet",
  [
    check("body")
      .isEmpty()
      .withMessage("Please write some tweet")
      .isLength({ max: 170 }),

    // body("imageUrl").trim().not().isEmpty()
    // body("name").trim().not().isEmpty(),
  ],
  tweetController.doTweet
);

router.get("/tweets", tweetController.getTweets);

router.get("/tweet/:id", tweetController.getTweetById);

router.delete("/tweet/delete/:id", tweetController.deleteTweet);

router.put("/tweet/update/:id", tweetController.updateTweet);

module.exports = router;
