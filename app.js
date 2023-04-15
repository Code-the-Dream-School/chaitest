const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json()); 

const people = [];
 
app.get("/api/v1/people", (req, res) => {
  res.status(200).json({entries: people});
});

app.get("/api/v1/people/:id", (req, res) => {
  const { id } = req.params;


  if (Number(id) >= people.length || Number(id) < 0) { 
    return res.status(404).json({error: "Entry not found."});
  }

  res.status(200).json({entry: people[id]});
});

app.post("/api/v1/people", (req, res) => {
  const { name, age } = req.body;

  if (!name) {
    return res.status(400).json({error: "Please enter a name."});
  }

  if(!age) {
    return res.status(400).json({ error: "Please enter an age." });
  }

  if (Number(age) < 0) {
    return res.status(400).json({error: "Age cannot be less than zero."});
  }

  people.push({name, age});

  res.status(201).json({message: "A person entry was added", index: people.indexOf(people[people.length - 1])});
});

const server = app.listen(3000, () => {
  console.log("listening on port 3000...");
});

module.exports = {
  app, 
  server
};
