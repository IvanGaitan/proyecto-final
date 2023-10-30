const express = require("express");
const {
  createReview,
  readReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewsController");

const router = express.Router();

router.get("/getreviews/:backdrop", readReview);
router.put("/updatereview/:backdrop", updateReview);
router.post("/createreview", createReview);
router.delete("/deletereview/:backdrop", deleteReview);

module.exports = router;
