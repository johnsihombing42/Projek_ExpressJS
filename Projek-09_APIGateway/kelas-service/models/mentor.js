'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mentor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      mentor.hasMany(models.kelas,{
        foreignKey: 'mentor_id', as: 'kelas_mentor'
      });
    }
  }
  mentor.init({
    nama: DataTypes.STRING,
    pekerjaan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'mentor',
  });
  return mentor;
};