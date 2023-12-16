const Sequelize = require('sequelize');
const database = require('../db');

const creteTable = async () => {
    await database.sync();
}



const Aluno = database.define('alunos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 355],
            msg: 'Nome precisa ter entre 3 e 255'
          }
        }
    },

    lastname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 355],
            msg: 'Sobrenome precisa ter entre 3 e 255'
          }
        }
    },

    email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: true,
        validate: {
          isEmail: {
            msg: 'Email inválido'
          }
        }
    },

    age: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        allowNull: true,
        validate: {
            isInt: {
            msg: 'Idade precisa ser um numero inteiro'
            }
        }
    },

});

creteTable();

module.exports = Aluno;