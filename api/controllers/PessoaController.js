const database = require('../models')  //Importa os arquivos de models para a const database

//Metodos Static podem ser chamados sem a necessidade de criação de uma instancia da classe pai
class PessoaController {
  static async pegaPessoasAtivas(req, res) { //Espera por uma requisição e retorna uma resposta
    try {   // Tenta executar 
      //Vai na pasta models e pega o retorno do modelo de pessoas
      const pessoasAtivas = await database.Pessoas.findAll()  //'await' espera a requisição buscar o metodo 'findAll' do sequelize que tras todas as pessoas
      return res.status(200).json(pessoasAtivas)  //retorna uma resposta com status 200, retorna as pessoas encontradas convertidas em JSON
    } catch (error) { //Caso de Erro
      return res.status(500).json(error.message) //Retorna um status (500) e a mensagem do erro convertida em JSON
    }
  }

  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.scope('todos').findAll() //Usa o scope criado na pessoas Models, para pegar todas as pessoas
      return res.status(200).json(todasAsPessoas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmaPessoa(req, res) {
    const { id } = req.params   // Passando o 'id' atraves de um parametro na requisição da URL
    try {
      const umaPessoa = await database.Pessoas.findOne({  //Chama o metodo FindOne do Sequelize
        where: { //Onde
          id: Number(id) // Coluna 'id' seja = ao (id) passado por parametro, e em formato de numero
        }
      })
      return res.status(200).json(umaPessoa) //Retorna o statusCode e o objeto encontrado com o metodo FindOne
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaPessoa(req, res) {
    const novaPessoa = req.body    //Cria um objeto 'pessoa' pelo corpo da requisição
    try {
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa) //Cria atraves do metodo 'create' do sequelize
      return res.status(200).json(novaPessoaCriada)  // retorna um statusCode de sucesso e o objeto de pessoa criada
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaPessoa(req, res) {
    const { id } = req.params   //Recebe um id por parametro na URL
    const novasInfos = req.body //Recebe novas informaçoes pelo corpo de requisição
    try {
      await database.Pessoas.update(novasInfos, { where: { id: Number(id) } })
      const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) } })
      return res.status(200).json(pessoaAtualizada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaPessoa(req, res) {
    const { id } = req.params  //Recebe id por parametro na URL
    try {
      await database.Pessoas.destroy({ where: { id: Number(id) } })
      return res.status(200).json({ mensagem: `id ${id} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async restauraPessoa(req, res) {
    const { id } = req.params
    try {
      await database.Pessoas.restore({ where: { id: Number(id) } })
      return res.status(200).json({ mensagem: `id ${id} restaurado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params  // Pega atraves dos parametros, o id do estudante e o id da matricula
    try {
      const umaMatricula = await database.Matriculas.findOne({  //Acessa o modelo matriculas e usa o metodo FindOne
        where: {    //Onde
          id: Number(matriculaId),  //Coluna 'id' seja igual ao 'matriculaId' passado por parametro
          estudante_id: Number(estudanteId) // Coluna FK'Estudante_id' seja igual ao 'estudanteId passado como numero por parametro
        }
      })
      return res.status(200).json(umaMatricula)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
    try {
      const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
      return res.status(200).json(novaMatriculaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    const novasInfos = req.body
    try {
      await database.Matriculas.update(novasInfos, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      const MatriculaAtualizada = await database.Matriculas.findOne({ where: { id: Number(matriculaId) } })
      return res.status(200).json(MatriculaAtualizada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      await database.Matriculas.destroy({ where: { id: Number(matriculaId) } })
      return res.status(200).json({ mensagem: `id ${matriculaId} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async restauraMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      await database.Matriculas.restore({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      return res.status(200).json({ mensagem: `id ${id} restaurado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaMatriculas(req, res) {
    const { estudanteId } = req.params
    try {
      const pessoa = await database.Pessoas.findOne({ where: { id: Number(estudanteId) } })
      const matriculas = await pessoa.getAulasMatriculadas()
      return res.status(200).json(matriculas)

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaMatriculasPorTurma(req, res) {
    const { turmaId } = req.params    //Recebe via parametros 
    try {
      const todasAsMatriculas = await database.matriculas
        .findAndCountAll({
          where: {
            turma_id: Number(turmaId),  //turma_id -> campo da tabela  //turmaId-> parametro da requisicao
            status: 'confirmado'
          }
        })
      return res.status(200).json(todasAsMatriculas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = PessoaController