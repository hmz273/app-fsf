const express = require("express");
const router = express.Router();

const { createTask, updateTask } = require("./TaskControlle");

router.route("/new").post( createTask );
router.route("/:id").put( updateTask );

module.exports = router;
