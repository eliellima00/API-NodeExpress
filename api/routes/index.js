//Puxa as rotas individuais e depois transfere para a instancia que sobe o servidor '/api/index.js
const express = require('express')
const pessoas = require('./pessoasRoute')
const niveis = require('./niveisRoute')
const turmas = require('./turmasRoute')

// Criando e exportando uma instancia do App do Express com as rotas individuais
module.exports = app => {  // Este app foi declarado antes na '/api/index.js'
 app.use(
   express.json(),   //Pega os dados que chegam na requisição e os convertem para JSON
   express.urlencoded({ extended: false }),
   pessoas,
   niveis,
   turmas
   )
 }
