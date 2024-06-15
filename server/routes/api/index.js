const express = require("express");
const router = express.Router();

router.use("/user", require("./userRoutes"));
router.use("/post", require("./postRoutes"));
router.use("/follow", require("./followRoutes"));
module.exports = router;
