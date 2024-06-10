const express = require("express");
const router = express.Router();

router.use("/", require("./api/index"));
module.exports = router;
