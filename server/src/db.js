import pkg from 'pg';
const { Pool } = pkg;

// optionally pull connection string from .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
