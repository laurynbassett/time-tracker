const Sequelize = require('sequelize')
const db = require('../db')

const Timesheet = db.define('timesheet', {
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startTime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = Timesheet
