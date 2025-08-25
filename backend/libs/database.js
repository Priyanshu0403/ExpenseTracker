import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

//destructuring to extract the Pool class from the pg module.
const { Pool } = pg;

// Create a new pool instance with the connection string from environment variables
// This allows the application to connect to the PostgreSQL database using the provided URL.
//this is a new pool connection
export const pool = new Pool({
    
    connectionString: process.env.DATABASE_URI,
    ssl: {
    rejectUnauthorized: false,
  },
});