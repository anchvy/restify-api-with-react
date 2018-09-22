import bluebird from 'bluebird'

const postgresPromise = require('pg-promise')({
  promiseLib: bluebird,
})

const connection = {
  host: process.env.DATABASE_ENDPOINT,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_MASTER_USERNAME,
  password: process.env.DATABASE_MASTER_PASSWORD,
}

const db = postgresPromise(connection)
export default db
