import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;

dotenv.config();

const { VERCEL_CONNECTION, LOCAL_CONNECTION } = process.env;

export const db = () => {
  try {
    return new Pool({
      connectionString:  LOCAL_CONNECTION,
    });
  } catch (error) {
    console.log(error);
  }
};

export default db;
