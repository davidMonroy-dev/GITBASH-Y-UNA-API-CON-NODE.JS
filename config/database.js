import { createConnection } from 'mysql2';
import { config } from 'dotenv';

config();

const db = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a MySQL')
})

export default db;  