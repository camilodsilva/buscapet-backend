import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Shelter from '../app/models/Shelter';
import Pet from '../app/models/Pet';
import Intent from '../app/models/Intent';
import File from '../app/models/File';

const models = [User, Shelter, Pet, Intent, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
