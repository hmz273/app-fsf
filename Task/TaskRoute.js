const express = require("express");
const router = express.Router();

const { createTask, updateTask, removeTaskById, getTaskById, getAllTasks } = require("./TaskControlle");

router.route("/new").post( createTask );
router.route("/:id").put( updateTask );
router.route("/:id").get( getTaskById );
router.route("/").get(  getAllTasks );
router.route("/:id").delete( removeTaskById );


module.exports = router;
