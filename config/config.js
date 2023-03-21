require('dotenv').config()

module.exports =
{
  // Amazon 
  "development": {
    "username": process.env.USERNAME1,
    "password": process.env.PASSWORD1,
    "database": process.env.DATABASE1,
    "host": process.env.HOSTNAME1,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOSTNAME,
    "dialect": "postgres"
  }
}
