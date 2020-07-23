const path = require('path');

module.exports = {
  client: 'pg',
  connection: {
    port: Number(process.env.POSTGRES_PORT) || 5432,
    host: process.env.CNFG_DB__CONNECTION__HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: path.join(__dirname, '../../migrations'),
    tableName: 'migrations',
  },
};
