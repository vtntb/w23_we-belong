require("dotenv").config({ path: __dirname + "/../.env" });
const mysql = require("mysql2/promise");

async function test() {
  console.log("Trying to connect with:");
  console.log("  Host:", process.env.DB_HOST);
  console.log("  User:", process.env.DB_USER);
  console.log("  Password:", process.env.DB_PASSWORD ? "***set***" : "(empty)");
  console.log("  Database:", process.env.DB_NAME);

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log("\n SUCCESS - Database connected!");
    await connection.end();
  } catch (err) {
    console.log("\n FAILED -", err.message);
  }
}

test();
