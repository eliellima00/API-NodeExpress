'use strict';
module.exports = (sequelize, DataTypes) => {
  const Matriculas = sequelize.define('Matriculas', {
    status: DataTypes.STRING
  }, { paranoid :true });
  Matriculas.associate = function(models) { //Matricula está pertencendo a pessoa
    Matriculas.belongsTo(models.Pessoas, { //Atraves do campo
      foreignKey: 'estudante_id'          //'estudante_id'
    })
    Matriculas.belongsTo(models.Turmas, { //Matricula esta pertencendo a turma
      foreignKey: 'turma_id'             //Atraves do campo 'turma_id'
    })  

  };
  return Matriculas;
};