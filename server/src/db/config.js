require('dotenv').config();

module.exports = {
  development: {
    dialect: "mysql",
    database: "doctor_appointments_dev",
    username: "root",
    password: "root",
    host: "localhost",
    port: 3306,
    logging: false
  }

  
};
