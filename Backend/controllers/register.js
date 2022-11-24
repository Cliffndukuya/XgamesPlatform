const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'xgame_db',
  password: 'admin',
  port: 5432,
})

