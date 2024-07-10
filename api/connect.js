import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const urlDB = `mprocess.env.ysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

export const db = mysql.createConnection(urlDB);
