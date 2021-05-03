"use strict";

var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var Schema = mongoose.Schema;

var UsuarioModel = new Schema(
  {
    name: { type: String },
    lastname: { type: String },
    nickname: { type: String, max: 30, unique: true },
    address: { type: String },
    bio: { type: String, max: 100 },
  },
  {
    timestamps: true,
  }
);

UsuarioModel.plugin(uniqueValidator, {
  message: "Error: o nickname deve ser único.",
});

module.exports = mongoose.model("Usuario", UsuarioModel);
