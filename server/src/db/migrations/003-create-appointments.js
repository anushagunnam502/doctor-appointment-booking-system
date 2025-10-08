"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Appointments", {
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Doctors", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      slotStart: { type: Sequelize.DATE, allowNull: false },
      slotEnd:   { type: Sequelize.DATE, allowNull: false },
      status: { type: Sequelize.ENUM("pending","confirmed","cancelled","completed"), allowNull: false, defaultValue: "pending" },
      notes: { type: Sequelize.TEXT },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP") }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Appointments");
  }
};
