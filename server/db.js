import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const sql = postgres(process.env.DATABASE_URL, { ssl: "require" });

async function getPostgresVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

async function createContactTable() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS contacts (
            id SERIAL PRIMARY KEY,
            firstName VARCHAR(255),
            lastName VARCHAR(255),
            phone VARCHAR(11) NULL,
            email VARCHAR(255) NULL,
            message TEXT NULL,
            created_at TIMESTAMP
        );
      `;
    console.log('Table "contacts" created successfully.');
  } catch (error) {
    console.error('Error creating "contacts" table:', error);
  }
}

async function createUsersTable() {
  try {
    // Drop foreign keys that reference the users table
    // await sql`ALTER TABLE IF EXISTS forums DROP CONSTRAINT IF EXISTS forums_createdby_fkey;`;
    // await sql`ALTER TABLE IF EXISTS forumList DROP CONSTRAINT IF EXISTS forumlist_userid_fkey;`;
    // await sql`ALTER TABLE IF EXISTS forumChat DROP CONSTRAINT IF EXISTS forumchat_userid_fkey;`;
    // await sql`ALTER TABLE IF EXISTS users DROP CONSTRAINT IF EXISTS users_myforum_fkey;`;
    // await sql`ALTER TABLE IF EXISTS users DROP CONSTRAINT IF EXISTS users_forum_fkey;`;
    // await sql`ALTER TABLE IF EXISTS journals DROP CONSTRAINT IF EXISTS users_journalId_fkey;`;

    // Drop the users table if it exists
    // await sql`DROP TABLE IF EXISTS users;`;
    
    await sql`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            firstName VARCHAR(255),
            lastName VARCHAR(255),
            profilePicture VARCHAR(255) NULL,
            phone VARCHAR(11) UNIQUE,
            email VARCHAR(255) UNIQUE,
            dateOfBirth DATE,
            gender VARCHAR(10),
            password VARCHAR(255),
            myForum INT NULL,
            forum INT NULL,
            journalId INT NULL,
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
          image VARCHAR(255),
          description TEXT NULL,
          createdBy INT,
          created_at TIMESTAMP,
          FOREIGN KEY (createdBy) REFERENCES users(id),
          FOREIGN KEY (myForum) REFERENCES forums(id)
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

async function createJournalTable() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS journals (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NULL,
          journal VARCHAR(255) NULL,
          userId  INT,
          created_at TIMESTAMP,
          updated_at TIMESTAMP
        );
      `;
    console.log('Table "journals" created successfully.');
  } catch (error) {
    console.error('Error creating "journals" table:', error);
  }
}



getPostgresVersion();
createUsersTable();
createForumsTable();
createForumListTable();
createForumChatTable();
createContactTable();
createJournalTable();

export default sql;
