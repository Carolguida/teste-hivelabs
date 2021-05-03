"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/UsuarioController");

router.get("/", controller.getAll);

router.post("/user", controller.post);

router.put("/editar/:id", controller.put);

router.get("/names/:name", controller.getByName);

router.delete("/deletar/:id", controller.delete);

module.exports = router;
