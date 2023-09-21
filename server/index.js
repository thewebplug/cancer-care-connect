import express from "express";
import sql from "./db.js";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3100;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
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
    const passwordRegex =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      res.status(400).send("Password does not meet requirements.");
      return;
    }

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
