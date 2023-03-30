const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Accountants = sequelize.define('Accountant', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  middlename: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  dateofbirth: Sequelize.DATE,
  gender: Sequelize.STRING,
  job_post: Sequelize.STRING,
  phone: Sequelize.BIGINT,
  email: Sequelize.STRING,
  address: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  remark: Sequelize.STRING,
  about: Sequelize.STRING,
  HospitalAffiliations: Sequelize.STRING,
  AccountingSchool: Sequelize.STRING,
  Residency: Sequelize.STRING,
  Certifications: Sequelize.STRING,
  ExperienceOrTranining: Sequelize.STRING,
  Internship: Sequelize.STRING,
  specialities: Sequelize.STRING,
});

module.exports = Accountants;
