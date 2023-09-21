import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const sql = postgres(process.env.DATABASE_URL, { ssl: "require" });

async function getPostgresVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

async function createUsersTable() {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          firstName VARCHAR(255),
          lastName VARCHAR(255),
          profilePicture VARCHAR(255) NULL,
          phone INT,
          email VARCHAR(255),
          dateOfBirth DATE,
          gender VARCHAR(10),
          password VARCHAR(255),
          myForum INT NULL,
          forum INT NULL,
          newsLetter BOOLEAN NULL,
          created_at TIMESTAMP
        );
      `;
      console.log('Table "users" created successfully.');
    } catch (error) {
      console.error('Error creating "users" table:', error);
    }
  }
  
  async function createForumsTable() {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS forums (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255),
          description TEXT NULL,
          createdBy INT,
          created_at TIMESTAMP
        );
      `;
      console.log('Table "forums" created successfully.');
    } catch (error) {
      console.error('Error creating "forums" table:', error);
    }
  }
  
  async function createForumListTable() {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS forumList (
          id SERIAL PRIMARY KEY,
          userId INT,
          forumId INT,
          created_at TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id),
          FOREIGN KEY (forumId) REFERENCES forums(id)
        );
      `;
      console.log('Table "forumList" created successfully.');
    } catch (error) {
      console.error('Error creating "forumList" table:', error);
    }
  }
  
  async function createForumChatTable() {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS forumChat (
          id SERIAL PRIMARY KEY,
          userId INT,
          forumId INT,
          text TEXT NULL,
          image VARCHAR(255) NULL,
          created_at TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id),
          FOREIGN KEY (forumId) REFERENCES forums(id)
        );
      `;
      console.log('Table "forumChat" created successfully.');
    } catch (error) {
      console.error('Error creating "forumChat" table:', error);
    }
  }
  
  getPostgresVersion();
  createUsersTable();
  createForumsTable();
  createForumListTable();
  createForumChatTable();
  
export default sql;
