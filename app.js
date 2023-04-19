const e = require("express");
const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());

const people = [];

app.post('/api/v1/people', (req, res) => {
  const {name, age} = req.body;

  if(!name){
      res.status(400).json({error: "Please enter a name."});
  }else if(!age){
    res.status(400).json({error: "Please enter an age."});
  }
  else if(isNaN(age) || age < 0 ){
      res.status(400).json({message:"Age must be nonnegative number"});
  }else {
    req.body.age = age;
    req.body.index = people.length;
    people.push(req.body);

    res.status(201).json({message: `A person was added`, index: req.body.index});
  }
});


app.get('/api/v1/people', (req, res) => {
  res.status(200).json({people});
});

app.get('/api/v1/people/:id', (req, res) => {
  const index = Number(req.params.id);

  if (isNaN(index) || !Number.isInteger(index) || index < 0 || index >= people.length) {
    res.status(404).json({message: "Person not found"});
    return;
  } 
  res.status(200).json(people[index]);
});


app.all("/api/v1/*", (req, res) => {
  res.json({ error: "That route is not implemented." });
});

const server = app.listen(3000, () => {
  console.log("listening on port 3000...");
});

module.exports =  { app, server }