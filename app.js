require('dotenv').config();
const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());

const people = [];

// Route to add a new person
app.post("/api/v1/people", (req, res) => {
  const { name, age } = req.body;
  if (!name) {
    res.status(400).json({ error: "Please enter a name." });
    return;
  } if (!age) {
    res.status(400).json({ error: "Please enter an age." });
    return;
  }

  req.body.index = people.length;
  const newPerson = { name, age };
  people.push(newPerson);
  res
    .status(201)
    .json({ message: "A person record was added", index: req.body.index });
});

// Route to retrieve the list of people entries
app.get("/api/v1/people", (req, res) => {
  res.json(people);
});

// Route to retrieve a single person by ID
app.get("/api/v1/people/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id < 0 || id >= people.length) {
    res.status(404).json({ message: "The person record was not found." });
    return;
  }
  const person = people[id];
  res.json(person);
});

// Not implemented routes
app.all("/api/v1/*", (req, res) => {
  res.status(404).json({ error: "That route is not implemented." });
});

const server = app.listen(3000, () => {
  console.log("listening on port 3000...");
});

module.exports =  { app, server }