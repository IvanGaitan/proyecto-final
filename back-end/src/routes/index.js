const express = require("express");
const ReviewRoutes = require("./reviews");

const router = express.Router();

router.use("/api", ReviewRoutes);

module.exports = router;
