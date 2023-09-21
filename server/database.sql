CREATE TABLE users (
  id INT PRIMARY KEY,
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

CREATE TABLE forums (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT NULL,
  createdBy INT,
  created_at TIMESTAMP
);

CREATE TABLE forumList (
  id INT PRIMARY KEY,
  userId INT,
  forumId INT,
  created_at TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (forumId) REFERENCES forums(id)
);

CREATE TABLE forumChat (
  id INT PRIMARY KEY,
  userId INT,
  forumId INT,
  text TEXT,
  image VARCHAR(255) NULL,
  created_at TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (forumId) REFERENCES forums(id)
);
