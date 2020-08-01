const Timesheet = require('./timesheet')
const User = require('./user')

/**
 *  Associations
 */
Timesheet.belongsTo(User)
User.hasMany(Timesheet)
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  Timesheet,
  User
}
