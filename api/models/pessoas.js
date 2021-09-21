'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define('Pessoas', { //Cria o modelo de pessoa
    nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function(dado) {
          if(dado.length < 3) throw new Error ('o campo nome deve ter mais de 3 caracteres')
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {       //Validar o campo email
        isEmail: {      //atributo do eloquent para validar email
          args: true,    //verifica se foram passados argumentos
          msg: 'dado do tipo e-mail inválido' //Mensagem de erro
        }
      }
    },
    role: DataTypes.STRING
  }, {
    paranoid: true,          // Comando para o softDelete
    defaultScope: {         //Nome padrão dado pelo sequelize
      where: { ativo: true } // 
    },
    scopes: {
      todos: { where: {} } //where vazio
    }
  });
  Pessoas.associate = function (models) {  // Pessoa esta associada da seguinte maneira
    Pessoas.hasMany(models.Turmas, {      //Pessoa tem muitas turmas
      foreignKey: 'docente_id'            //Atraves da chave estrangeira 'docente_id'
    })
    Pessoas.hasMany(models.Matriculas, { //Pessoa tem muitas matriculas
      foreignKey: 'estudante_id',      //Atraves da chave estrangeira 'estudante_id'
      scope: { status: 'confirmado'}, //verificando se na coluna status tem o valor 'confirmado'
      as: 'aulasMatriculadas'       // nome para usar os metodos mixins que são criados pelo sequelize a partir das associaçoes
    })

  };
  return Pessoas;
};