import express from "express";
import sql from "./db.js";
import cors from "cors";

const app = express();
const PORT = 3100;

app.use(express.json());
app.use(
  cors({
    origin: ["*"],
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
  const { register } = req.body;
  const response =
    await sql`INSERT INTO users (register) VALUES (${register}) RETURNING *`;
  if (response) {
    res.status(201).send(response);
  } else {
    res.status(500).send("Internal server Error");
  }
});

app.get("/api/v1/about", (req, res) => {
    res.send('Welcome to cancer care connect (C C C). Never feel lonely, ccc is here to support you')
})

app.get("/api/v1/mission", (req, res) => {
    res.send('Our mission is to build a platform to support people living with cancer ailment and to educate healthy individual on preventive measures')
})

app.get("/api/v1/resources", (req, res) => {
    res.send('Our mission is to build a platform to support people living with cancer ailment and to educate healthy individual on preventive measures')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
