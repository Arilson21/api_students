const Sequelize = require('sequelize')
const database = require('../db');
const bcryptjs = require('bcryptjs')

const creteTable = async () => {
  await database.sync();
}

const Users = database.define('users', {
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
          msg: 'Campo nome deve ter entre a 3 e 255 caracteres',
        }
      }
    },

    email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existe',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido'
          }
        }
    },

    password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'A senha precisa ter entre 6 e 50 caracteres',
          }
        }
    },
});

Users.addHook('beforeSave', async (user) => {
  if(user.password){
    user.password_hash = await bcryptjs.hash(user.password, 8);
  }
});

Users.prototype.passwordIsValid = async function(password, password_hash) {
  return bcryptjs.compare(password, password_hash)
}

creteTable();


module.exports = Users;
