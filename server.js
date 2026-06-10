// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const mysql = require("mysql2");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static("PUB"));

// // Пул для подключения к MySQL Railway
// const pool = mysql.createPool({
//   host: process.env.MYSQLHOST,
//   user: process.env.MYSQLUSER,
//   password: process.env.MYSQLPASSWORD,
//   database: process.env.MYSQLDATABASE,
//   port: process.env.MYSQLPORT,
//   waitForConnections: true,
//   connectionLimit: 10
// });


// // Проверка подключения
// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error("Ошибка подключения к MySQL:", err);
//   } else {
//     console.log("MySQL подключен!");
//     connection.release();
//   }
// });

// // API: Получить все брони
// app.get("/bookings", (req, res) => {
//   pool.query("SELECT * FROM bookings", (err, results) => {
//     if (err) {
//       console.error("Ошибка запроса /bookings:", err);
//       return res.json([]);
//     }
//     res.json(results);
//   });
// });

// // API: Создать бронь
// app.post("/book", (req, res) => {
//   const { table, date, from, to, name, surname, phone, comment } = req.body;

//   const now = new Date();
//   const bookingDateTime = new Date(`${date}T${from}:00`);
//   if (bookingDateTime < now) {
//     return res.json({ success: false, message: "Это время уже недоступно" });
//   }

//   const checkSql = `
//   SELECT * FROM bookings 
//   WHERE tableNumber = ? AND date_1 = ? AND fromTime < ? AND toTime > ?
// `;


//   pool.query(checkSql, [table, date, to, from], (err, results) => {
//     if (err) {
//       console.error("Ошибка проверки занятости:", err);
//       return res.json({ success: false, message: err.message });
//     }
//     if (results.length > 0)
//       return res.json({ success: false, message: "Этот столик уже забронирован" });

//     const insertSql = `
//       INSERT INTO bookings (tableNumber, date_1, fromTime, toTime, name_1, surname, phone, comment_1)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     pool.query(insertSql, [table, date, from, to, name, surname, phone, comment], (err2) => {
//       if (err2) {
//         console.error("Ошибка добавления брони:", err2);
//         return res.json({ success: false, message: err2.message });
//       }
//       res.json({ success: true });
//     });
//   });
// });

// // -----------------------
// // Запуск сервера
// // -----------------------
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const mysql = require("mysql2");
// require("dotenv").config(); // для переменных окружения Railway

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static("PUB")); // сюда положи index.html, style.css и т.д.

// // Подключение к MySQL через пул
// const pool = mysql.createPool({
//   host: process.env.MYSQLHOST,
//   user: process.env.MYSQLUSER,
//   password: process.env.MYSQLPASSWORD,
//   database: process.env.MYSQLDATABASE,
//   port: process.env.MYSQLPORT,
//   waitForConnections: true,
//   connectionLimit: 10
// });
// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error("Ошибка подключения к MySQL:", err);
//   } else {
//     console.log("MySQL подключен!");
//     connection.release(); // освобождаем соединение обратно в пул
//   }
// });




// // -----------------------
// // API: Получить все брони
// // -----------------------
// app.get("/bookings", (req, res) => {
//   pool.query("SELECT * FROM bookings", (err, results) => {
//     if (err) return res.json([]);
//     res.json(results);
//   });
// });

// // -----------------------
// // API: Создать бронь
// // -----------------------
// app.post("/book", (req, res) => {
//   const { table, date, from, to, name, surname, phone, comment } = req.body;

//   const now = new Date();
//   const bookingDateTime = new Date(`${date}T${from}:00`);
//   if (bookingDateTime < now) {
//     return res.json({ success: false, message: "Это время уже недоступно" });
//   }

//   const checkSql = `
//     SELECT * FROM bookings 
//     WHERE tableNumber = ? AND date = ? AND fromTime < ? AND toTime > ?
//   `;

//   pool.query(checkSql, [table, date, to, from], (err, results) => {
//     if (err) return res.json({ success: false, message: err.message });
//     if (results.length > 0)
//       return res.json({ success: false, message: "Этот столик уже забронирован" });

//     const insertSql = `
//       INSERT INTO bookings (tableNumber, date, fromTime, toTime, name, surname, phone, comment)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     pool.query(insertSql, [table, date, from, to, name, surname, phone, comment], (err2) => {
//       if (err2) return res.json({ success: false, message: err2.message });
//       res.json({ success: true });
//     });
//   });
// });

// // -----------------------
// // Запуск сервера
// // -----------------------
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

