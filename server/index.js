import express from "express";
import sql from "./db.js";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORT || 3100;

"http://localhost:5173", 

app.use(express.json());
app.use(
  cors({
    origin: ["https://cancer-care-connect.vercel.app"],
  })
);

app.get("/api/v1/users", async (req, res) => {
  const users = await sql`SELECT * FROM users`;
  if (users) {
    res.status(200).send(users);
  } else {
    res.status(404).send("Error here!");
  }
});

app.post("/api/v1/register", async (req, res) => {
  const { firstName, lastName, phone, email, dateofbirth, gender, password } =
    req.body;

  console.log("res", res.statusCode);

  try {
    const emailCheck =
      await sql`SELECT COUNT(*) FROM users WHERE email = ${email}`;
    const emailCount = emailCheck[0].count;

    if (emailCount > 0) {
      res.status(400).send("Email is already in use.");
      return;
    }

    const phoneCheck =
      await sql`SELECT COUNT(*) FROM users WHERE phone = ${phone}`;
    const phoneCount = phoneCheck[0].count;

    if (phoneCount > 0) {
      res.status(400).send("Phone number already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await sql`
      INSERT INTO users (firstName, lastName, phone, email, dateofbirth, gender, password)
      VALUES (${firstName}, ${lastName}, ${phone}, ${email}, ${dateofbirth}, ${gender}, ${hashedPassword})
      RETURNING *`;

    if (response) {
      res.status(201).send(response);
    } else {
      res.status(500).send("Internal server Error");
    }
  } catch (error) {
    // console.error("Error inserting user:", error);
    res.status(500).send("Internal server Error");
  }
});

app.post("/api/v1/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("res", res.statusCode);
  console.log("email", email);

  try {
    const emailCheck = await sql`SELECT * FROM users WHERE email = ${email};`;

    if (emailCheck[0]) {
      bcrypt.compare(password, emailCheck[0].password, function (err, result) {
        if (result) {
          var token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
              id: emailCheck[0].id,
              firstname: emailCheck[0].firstname,
              lastname: emailCheck[0].lastname,
              profilepicture: emailCheck[0].profilepicture,
              phone: emailCheck[0].phone,
              email: emailCheck[0].email,
              myforum: emailCheck[0].myforum,
              forum: emailCheck[0].forum,
              newsletter: emailCheck[0].newsletter,
            },
            "shhhhh"
          );
          res.status(201).send({
            message: "Login Successful",
            token,
          });
        } else {
          res.status(500).send("Incorrect Login details");
        }
      });
    } else {
      res.status(500).send("Incorrect Login details");
    }
  } catch (error) {
    // console.error("Error inserting user:", error);
    res.status(500).send("Internal server Error");
  }
});

app.post("/api/v1/contact", async (req, res) => {
  const { firstname, lastname, phone, email, message } = req.body;

  try {
    const response = await sql`
      INSERT INTO contacts (firstname, lastname, phone, email, message)
      VALUES (${firstname}, ${lastname}, ${phone}, ${email}, ${message})
      RETURNING *`;
    console.log("response", response);
    if (response) {
      res.status(201).send(response);
    } else {
      res.status(500).send("Internal server Error343");
    }
  } catch (error) {
    // console.error("Error inserting user:", error);
    res.status(500).send("Internal server Error");
  }
});

app.get("/api/v1/about", (req, res) => {
  res.send(
    "Welcome to cancer care connect (C C C). Never feel lonely, ccc is here to support you"
  );
});

app.get("/api/v1/mission", (req, res) => {
  res.send(
    "Our mission is to build a platform to support people living with cancer ailment and to educate healthy individual on preventive measures"
  );
});

app.get("/api/v1/resources", (req, res) => {
  res.send(
    "Our mission is to build a platform to support people living with cancer ailment and to educate healthy individual on preventive measures"
  );
});

// Journals APIs
app.post("/api/v1/:user/createJournal", async (req, res) => {
  const { title, user, journal } = req.body;

  console.log("res", res.statusCode);
  const timestamp = new Date();

  try { 
    // res.send('juooooooooooo');
    const response = await sql`
      INSERT INTO journals (title, userid, journal, created_at, updated_at)
      VALUES (${title}, ${user}, ${journal}, ${timestamp}, ${timestamp})
      RETURNING *`;

    if (response) {
      res.status(201).send(response);
    } else {
      res.status(500).send("Internal server Error")
    }
    
  } catch (error) {
    // console.error("Error inserting user:", error);
    res.status(500).send("Internal server Error");
  }
});

app.get("/api/v1/:user/getJournals", async (req, res) => {
  try {
    const { user } = req.params;
    const journal = await sql`SELECT * FROM journals WHERE user = ${user}`;
    if (journal) {
      res.status(200).send(journal);

    } else {
      res.status(40).send("No rsources found");
    }
  } catch (error) {
    res.status(500).send("Internal server Error");
  }
});

app.get("/api/v1/getJournals", async (req, res) => {
  
  try {
      // Use default values of 2 for offset and limit if not provided in the query
      const { offset = 2, limit = 5 } = req.query;

    console.log(req.query);
    const journals = await sql`SELECT * FROM journals LIMIT ${limit} OFFSET ${offset}`;
    if (journals?.length < 1) {
      res.status(403).send('Sorry! Resource not found')
    }else if(journals) {
      res.status(200).send(journals);
    }
  } catch (error) {
    res.status(500).send("Internal server Error");
  }
});

app.put("/api/v1/:user/upadateJournal/:id", async (req, res) => {
  try {
    const timestamp = new Date();
    const { user, id } = req.params
    const {journal} = req.body
    const getJournal = await sql`SELECT * FROM journals WHERE id = ${id}`;
    if (getJournal?.length < 1) {
      res.status(403).send('Sorry! Resource not found')
    }else if (getJournal?.[0]?.userid != user) {
         res.status(401).send('You are not authorised to perform this action. The journal belongs to another user')
    };
    
    const updatedJournal = await sql`UPDATE journals SET journal = ${journal}, updated_at = ${timestamp} WHERE id = ${id} RETURNING *`;
    if (updatedJournal && updatedJournal.length > 0) {
      res.status(200).send(updatedJournal);
    } else {
      res.status(40).send("No rsources found");
    }
  } catch (error) {
    // console.error("Error inserting user:", error);
    res.status(500).send("Internal server Error");
  }
});

app.delete("/api/v1/:user/deleteJournal/:id", async (req, res) => {
  try {
    const { user, id } = req.params;
    const deletedJournal =
      await sql`DELETE FROM journals WHERE id = ${id} RETURNING *`;

    if (deletedJournal && deletedJournal.length > 0) {
      res.status(200).json(deletedJournal[0]);
    } else {
      res.status(404).send("journal not found");
    }
  } catch (error) {
    console.error("Error deleting journal:", error);
    res.status(500).send("Internal server error");
  }
});

// OSHO
// Get forum
app.get("/api/v1/forum", async (req, res) => {
  const { userid } = req.params;

  try {
    // Fetch data related to the specified userid
    const response = await sql`
      SELECT * FROM forums`;

    if (response) {
      res.status(200).send(response);
    } else {
      res.status(404).send("No forums found for the specified userid");
    }
  } catch (error) {
    console.error("Error fetching forums:", error);
    res.status(500).send("Internal server error");
  }
});

// Get forum for user
app.get("/api/v1/forum/:userid", async (req, res) => {
  const { userid } = req.params;

  try {
    // Fetch data related to the specified userid
    const response = await sql`
      SELECT * FROM forums WHERE createdby = ${userid}`;

    if (response) {
      res.status(200).send(response);
    } else {
      res.status(404).send("No forums found for the specified userid");
    }
  } catch (error) {
    console.error("Error fetching forums:", error);
    res.status(500).send("Internal server error");
  }
});

// Create forum
app.post("/api/v1/createForum", async (req, res) => {
  const { title, description, createdby } = req.body;

  try {
    const response = await sql`
      INSERT INTO forums (title, description, createdby)
      VALUES (${title}, ${description}, ${createdby})
      RETURNING *`;

    if (response) {
      res.status(201).send(response);
    } else {
      res.status(500).send("Internal server error");
    }
  } catch (error) {
    console.error("Error inserting forum:", error);
    res.status(500).send("Internal server error");
  }
});

// Update forum
app.put("/api/v1/updateForum/:createdby/:id", async (req, res) => {
  // console.log('updateForum', req);
  try {
    const { createdby, id } = req.params;
    const { title, description } = req.body;
    const updateForum = await sql`
      UPDATE forums SET description = ${description}, title = ${title}
      WHERE id = ${id} AND createdby = ${createdby}
      RETURNING *`;

    if (updateForum && updateForum.length > 0) {
      res.status(200).send(updateForum);
    } else {
      res.status(404).send("No resources found");
    }
  } catch (error) {
    console.error("Error updating forum:", error);
    res.status(500).send("Internal server error");
  }
});

// Delete forum
app.delete("/api/v1/deleteForum/:createdby/:id", async (req, res) => {
  try {
    const { createdby, id } = req.params;
    const deleteForum = await sql`
      DELETE FROM forums WHERE id = ${id} AND createdby = ${createdby}
      RETURNING *`;

    if (deleteForum && deleteForum.length > 0) {
      res.status(200).json(deleteForum[0]);
    } else {
      res.status(404).send("Forum not found");
    }
  } catch (error) {
    console.error("Error deleting forum:", error);
    res.status(500).send("Internal server error");
  }
});

// get forum chat
app.get("/api/v1/forumChat/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch data related to the specified userid, forumid, and id
    const response = await sql`
    SELECT * FROM forum WHERE id = ${id}`;

    console.warn('response', response);

    if (response && response.length > 0) {
      res.status(200).send(response);
    } else {
      res.status(404).send("No forum chat found for the specified parameters");
    }
  } catch (error) {
    console.error("Error fetching forum chat:", error);
    res.status(500).send("Internal server error");
  }
});

// Create forum chat
app.post("/api/v1/createForumChat/:forumid", async (req, res) => {
  const { forumid } = req.params;
  const { text, userid, image } = req.body;

  try {
    const response = await sql`
      INSERT INTO forumchat (forumid, text, userid, image)
      VALUES (${forumid}, ${text}, ${userid}, ${image})
      RETURNING *`;

    if (response) {
      res.status(201).send(response);
    } else {
      res.status(500).send("Internal server error");
    }
  } catch (error) {
    console.error("Error inserting forum chat:", error);
    res.status(500).send("Internal server error");
  }
});

// Update forum chat
app.put("/api/v1/updateForumChat/:forumid/:userid/:id", async (req, res) => {
  try {
    const { forumid, userid, id } = req.params;
    const { text, image } = req.body;
    const updateForumChat = await sql`
      UPDATE forumchat SET text = ${text}, image = ${image}
      WHERE id = ${id} AND userid = ${userid} AND forumid = ${forumid}
      RETURNING *`;

    if (updateForumChat && updateForumChat.length > 0) {
      res.status(200).send(updateForumChat);
    } else {
      res.status(404).send("No resources found");
    }
  } catch (error) {
    console.error("Error updating forum chat:", error);
    res.status(500).send("Internal server error");
  }
});

// Delete forum chat
app.delete("/api/v1/deleteForumChat/:forumid/:userid/:id", async (req, res) => {
  try {
    const { forumid, userid, id } = req.params;
    const deleteForumChat = await sql`
      DELETE FROM forumchat WHERE id = ${id} AND userid = ${userid} AND forumid = ${forumid}
      RETURNING *`;

    if (deleteForumChat && deleteForumChat.length > 0) {
      res.status(200).json(deleteForumChat[0]);
    } else {
      res.status(404).send("Forum chat not found");
    }
  } catch (error) {
    console.error("Error deleting forum chat:", error);
    res.status(500).send("Internal server error");
  }
});

// serve from port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
