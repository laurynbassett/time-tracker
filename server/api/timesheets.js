const router = require('express').Router()
const {Timesheet} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

// GET /api/timesheets/:userId
router.get('/:userId', async (req, res, next) => {
  console.log('REQ PARAMS', req.params)
  try {
    const timesheets = await Timesheet.findAll({
      where: {
        userId: {
          [Op.eq]: req.params.userId
        }
      }
    })
    res.json(timesheets)
  } catch (err) {
    next(err)
  }
})
