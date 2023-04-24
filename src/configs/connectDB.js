const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'chubebanso',
    password: '123456',
    port: 5432,
})
export default pool;