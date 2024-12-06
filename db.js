const { Pool } = require('pg');

// Use your connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Best practice: use environment variables
  ssl: {
    rejectUnauthorized: false, // Required for Render-hosted PostgreSQL
  },
});

module.exports = pool;
