'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      kelas.hasMany(models.kelas_user,{
        foreignKey: 'kelas_id', as: 'kelas_user'
      });

      kelas.belongsTo(models.mentor,{
        foreignKey: 'mentor_id', as: 'mentor'
      });
    }
  }
  kelas.init({
    nama: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    mentor_id: DataTypes.INTEGER,
    level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'kelas',
  });
  return kelas;
};