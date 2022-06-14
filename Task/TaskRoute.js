const express = require("express");
const router = express.Router();

const { createTask, updateTask, removeTaskById, getTaskById, getAllTasks } = require("./TaskControlle");
const { userAuth } = require("../Middleware/auth");

router.route("/new").post( userAuth, createTask );
router.route("/:id").put( userAuth, updateTask );
router.route("/:id").get( userAuth, getTaskById );
router.route("/").get( userAuth,  getAllTasks );
router.route("/:id").delete( userAuth, removeTaskById );


module.exports = router;
