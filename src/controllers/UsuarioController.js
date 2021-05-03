"use strict";

const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");
const Validator = require("../validators/fluent-validator");
const repository = require("../repository/usuario-repository");

//Postar um novo usuário
exports.post = async (req, res, next) => {
  let contract = new Validator();

  //Validando os atributos
  contract.hasMaxLen(
    req.body.nickname,
    30,
    "O nickname deve conter 30 caracteres, no máximo."
  );
  contract.hasMaxLen(
    req.body.bio,
    100,
    "A bio deve conter 100 caracteres, no máximo."
  );

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }
  try {
    await repository.post(req.body);
    res.status(201).send({
      message: "Usuário criado com sucesso!",
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao criar novo usuário.",
    });
  }
};

//Buscar todos os usuários
exports.getAll = async (req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send({
      message: "Falha ao buscar os usuários.",
    });
  }
};

//Buscar um usuário pelo nome
exports.getByName = async (req, res, next) => {
  try {
    var data = await repository.getByName(req.params.name);
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send({ message: "Falha ao buscar o usuário." });
  }
};

//Buscar um usuário pelo nickname
exports.getByNickname = async (req, res, next) => {
  try {
    var data = await repository.getByNickname(req.params.nickname);
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send({ message: "Falha ao buscar o usuário." });
  }
};


//Atualizar um usuário
exports.put = async (req, res, next) => {
  try {
    await repository.put(req.params.id, req.body);
    res.status(200).send({
      message: "Usuário atualizado com sucesso!",
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao atualizar o usuário"      
    });
  }
};

//Deletar um usuário
exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.params.id);
    res.status(200).send({
      message: "Usuário removido com sucesso!",
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao remover o usuário",
    });
  }
};
