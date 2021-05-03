"use strict";

const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");

exports.post = async(data) => {
  var user = new Usuario(data);
  await user.save();
};

exports.get = async() => {
  const res = await Usuario.find({}, 
    "name lastname")  
  return res;
};

exports.getByName = async(name) => {
  const res = await Usuario
  .findOne({name})
  return res;
};

exports.put = async(id, data) => {
  await Usuario.findByIdAndUpdate(
    id,
    {
      $set: {
        lastname: data.lastname,
        nickname: data.nickname,
        address: data.address,
      },
    }   
  );
};

exports.delete = async(id) => {
  await Usuario.findByIdAndRemove(id);
};
