import Sequelize, { Model } from 'sequelize';

class Pet extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        age: Sequelize.INTEGER,
        family: Sequelize.STRING,
        breed: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Shelter, { foreignKey: 'shelter_id', as: 'shelter' });
  }
}

export default Pet;
