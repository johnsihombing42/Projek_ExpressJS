'use strict';
const {
  Model
} = require('sequelize');
const user = require('../../user-service/models/user');
module.exports = (sequelize, DataTypes) => {
  class kelas_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      kelas_user.belongsTo(models.kelas, {
        foreignKey: 'kelas_id', as: 'kelas'
      });
    }
  }
  kelas_user.init({
    user_id: DataTypes.INTEGER,
    kelas_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'kelas_user',
  });
  return kelas_user;
};