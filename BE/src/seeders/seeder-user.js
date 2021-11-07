'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: "tranhuucanh2000@gmail.com",
      password: "123456",
      firstName: "Huu Canh",
      lastName: "Tran",
      address: "Quang Ngai",
      gender: 1,
      roleId: "R1",
      positionId: "",
      image: "",
      phonenumber: ""
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};