'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const userId = await queryInterface.bulkInsert(
     "users", [
       {
         userId:"test1",
         password:"test",
         name: "테스트",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         userId:"test2",
         password:"test",
         name: "테스트",
         createdAt: new Date(),
        updatedAt: new Date(),
       }
     ],
     { returning: ["id"] }
   );
   await queryInterface.bulkInsert("posts", [
     {
       title: "테스트1",
       createdAt: new Date(),
       updatedAt: new Date(),
       user_id: userId,
     }
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("posts", null, {});
  }
};
