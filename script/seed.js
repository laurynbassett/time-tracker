'use strict'

const db = require('../server/db')
const {Timesheet, User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'admin@admin.com', password: 'admin'})
  ])

  const timesheets = await Promise.all([
    Timesheet.create({
      description: 'Host Training',
      startTime: '2020-07-21 14:00:00',
      endTime: '2020-07-21 16:00:00',
      userId: users[0].id
    }),
    Timesheet.create({
      description: 'Host Training',
      startTime: '2020-07-23 16:00:00',
      endTime: '2020-07-23 18:00:00',
      userId: users[0].id
    }),
    Timesheet.create({
      description: 'Promo',
      startTime: '2020-07-29 12:00:00',
      endTime: '2020-07-29 16:00:00',
      userId: users[0].id
    }),
    Timesheet.create({
      description: 'Promo',
      startTime: '2020-07-30 12:00:00',
      endTime: '2020-07-30 16:00:00',
      userId: users[0].id
    }),
    Timesheet.create({
      description: 'Host Shift',
      startTime: '2020-08-01 16:00:00',
      endTime: '2020-08-01 23:15:00',
      userId: users[0].id
    })
  ])

  console.log(
    `seeded ${users.length} users and ${timesheets.length} timesheets`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
