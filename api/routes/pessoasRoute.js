const { Router } = require('express')   // Chama o Router que é uma ferramenta do Express
const PessoaController = require('../controllers/PessoaController')  //Importar a classe pessoa controller

const router = Router()  // Instancia o Router do Express

//Rotas individuais de pessoas
router
    .get('/pessoas', PessoaController.pegaPessoasAtivas)
    .get('/pessoas/todos', PessoaController.pegaTodasAsPessoas)
    .get('/pessoas/:id', PessoaController.pegaUmaPessoa)
    .get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula)
    .get('/pessoas/:estudanteId/matriculas', PessoaController.pegaMatriculas)
    .get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma)
    .post('/pessoas', PessoaController.criaPessoa)
    .put('/pessoas/:id', PessoaController.atualizaPessoa)
    .post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)
    .post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
    .put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)
    .post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', PessoaController.restauraMatricula)
    .delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula)
    .delete('/pessoas/:id', PessoaController.apagaPessoa)

module.exports = router