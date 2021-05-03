'use strict';

const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//Conexão ao banco de dados
mongoose.connect('mongodb+srv://carol:senha@clusterapifake.0qhq3.mongodb.net/db_usuarios')


//Carrega as Models
const Usuario = require('./models/UsuarioModel');

//Carrega as rotas
//const index = require('./routes/index-route');
const UsuarioRouter = require('./routes/usuario-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));


//app.use('/', index);
app.use('/', UsuarioRouter);


module.exports = app;


