//Arquivo que vai subir a apliacação e puxar todas as rotas individuais
const express = require('express')  //Importando a biblioteca Express
const routes = require('./routes') //Importando os arquivos de rotas

const app = express() //Criando uma instancia do Express e as armazenando na const APP
const port = 3000   //Porta que vai rodar  o servidor

routes(app) //Chama o index das rotas e passa como parametro a instancia do Express

// Sobe o servidor e fica 'ouvindo' por requisições
app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

module.exports = app  // Exporta o app