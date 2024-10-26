const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.resolve(__dirname, "database", "sqlite.db");

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await db.run(`CREATE TABLE IF NOT EXISTS todos (
        id VARCHAR(1000) PRIMARY KEY,
        message TEXT NOT NULL
    )`);

    console.log("Connected to sqlite database");
  } catch (error) {
    console.log(`DB ERROR: ${error.message}`);
    process.exit(1);
  }
};

// Make sure to call the `initializeDbAndServer` before using `db`

const getDb = () => {
  if (!db) {
    throw new Error("Database is not initialized yet");
  }

  return db;
};

module.exports = { initializeDbAndServer, getDb };
