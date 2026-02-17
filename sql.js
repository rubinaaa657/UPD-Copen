const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10
});

// Читаем дамп
const sql = fs.readFileSync('copen.sql', 'utf8');

// Выполняем все команды из дампа
pool.query(sql, (err, results) => {
  if (err) console.error(err);
  else console.log('База успешно загружена на Railway!');
  pool.end();
});
