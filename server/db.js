import postgres from 'postgres'
import dotenv from "dotenv";
dotenv.config();

const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

async function getPostgresVersion() {
    const result = await sql`select version()`;
    console.log(result);
  }

getPostgresVersion()

export default sql
