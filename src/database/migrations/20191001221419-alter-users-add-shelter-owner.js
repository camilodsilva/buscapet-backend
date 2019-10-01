module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'is_shelter_owner', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
