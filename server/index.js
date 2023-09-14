import express from "express";
// const express = require("express");
// import sql from "./db.js";
import cors from "cors"
// import data from "../server/data";

const app = express();

app.use(
    cors({
      origin: ["http://localhost:5173"],
    })
  );

  app.get("/api/v1", (req, res) => {
    res.send("Hello")
})

app.use(express.json())

app.get("/api/v1/about", (req, res) => {
    res.send('Welcome to cancer care connect (C C C). Never feel lonely, ccc is here to support you')
})

app.get("/api/v1/mission", (req, res) => {
    res.send('Our mission is to build a platform to support people living with cancer ailment and to educate healthy individual on preventive measures')
})

app.get("/api/v1/resources", (req, res) => {
    res.send('Our mission is to build a platform to support people living with cancer ailment and to educate healthy individual on preventive measures')
    // res.send(`${data.resources}`)
})

  const PORT = 32000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
