// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const mysql = require("mysql2");

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static("PUB")); // сюда положи index.html и style.css

// // да

// const pool = mysql.createPool({
//     host: process.env.copen_host,// copen host
//     user: process.env.copen_user,// user
//     password: process.env.copen_pass,//password
//     database: process.env.copen_name, //database name
//     waitForConnections: true,
//     connectionLimit: 10
// });


// db.connect(err => {
//     if(err) console.log(err);
//     else console.log("MySQL подключен");
// });

// // API: сохранить бронь
// app.post("/book", (req, res) => {
//     const { table, date, from, to, name, surname, phone, comment } = req.body;

//     const now = new Date();
//     const bookingDateTime = new Date(`${date}T${from}:00`);
//     if(bookingDateTime < now){
//         return res.json({success:false,message:"Это время уже недоступно"});
//     }

//     // проверка занятости
//     const checkSql = `
//       SELECT * FROM bookings 
//       WHERE tableNumber = ? AND date = ? AND fromTime < ? AND toTime > ?
//     `;
//     db.query(checkSql, [table, date, to, from], (err, results) => {
//         if(err) return res.json({success:false,message:err.message});
//         if(results.length>0) return res.json({success:false,message:"Этот столик уже забронирован"});

//         const insertSql = `
//           INSERT INTO bookings (tableNumber, date, fromTime, toTime, name, surname, phone, comment)
//           VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//         `;
//         db.query(insertSql, [table,date,from,to,name,surname,phone,comment], (err2)=>{
//             if(err2) return res.json({success:false,message:err2.message});
//             res.json({success:true});
//         });
//     });
// });

// // API: получить все брони
// app.get("/bookings", (req,res)=>{
//     db.query("SELECT * FROM bookings", (err, results)=>{
//         if(err) return res.json([]);
//         res.json(results);
//     });
// });

// app.listen(PORT, ()=>console.log(`Сервер запущен http://localhost:${PORT}`));

// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config(); // для переменных окружения Railway

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("PUB")); // сюда положи index.html, style.css и т.д.

// Подключение к MySQL через пул
const pool = mysql.createPool({
  host: process.env.copen_host,
  user: process.env.copen_user,
  password: process.env.copen_pass,
  database: process.env.copen_name,
  waitForConnections: true,
  connectionLimit: 10
});

// -----------------------
// API: Получить все брони
// -----------------------
app.get("/bookings", (req, res) => {
  pool.query("SELECT * FROM bookings", (err, results) => {
    if (err) return res.json([]);
    res.json(results);
  });
});

// -----------------------
// API: Создать бронь
// -----------------------
app.post("/book", (req, res) => {
  const { table, date, from, to, name, surname, phone, comment } = req.body;

  const now = new Date();
  const bookingDateTime = new Date(`${date}T${from}:00`);
  if (bookingDateTime < now) {
    return res.json({ success: false, message: "Это время уже недоступно" });
  }

  const checkSql = `
    SELECT * FROM bookings 
    WHERE tableNumber = ? AND date = ? AND fromTime < ? AND toTime > ?
  `;

  pool.query(checkSql, [table, date, to, from], (err, results) => {
    if (err) return res.json({ success: false, message: err.message });
    if (results.length > 0)
      return res.json({ success: false, message: "Этот столик уже забронирован" });

    const insertSql = `
      INSERT INTO bookings (tableNumber, date, fromTime, toTime, name, surname, phone, comment)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    pool.query(insertSql, [table, date, from, to, name, surname, phone, comment], (err2) => {
      if (err2) return res.json({ success: false, message: err2.message });
      res.json({ success: true });
    });
  });
});

// -----------------------
// Запуск сервера
// -----------------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

