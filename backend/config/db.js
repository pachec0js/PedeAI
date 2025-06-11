import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Sen@i123', // SENAI: Sen@i123 CASA: Senai@123
  database: 'pedeai',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
