const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());

let people = [
  
];

// This condition will always return 'true' since JavaScript compares objects by reference, not value.
// if (people !== []) {
//   "blah blah"
// }

// In other words, you cannot use the value of an object including an array to create a conditional in javascript. You can however, use the length of an array to create a conditional/decision for it.

app.get("/api/v1/people", (req, res) => {
  try {
    if (people.length === 0) {
      return res.status(401).json("No people exist at this time.");
    }

    return res.status(200).json({ count: people.length, people });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/v1/people/:id", (req, res) => {
  try {
    const index = parseInt(req.params.id);
    if (
      isNaN(index) ||
      !Number.isInteger(index) ||
      index < 0 ||
      index >= people.length
    ) {
      return res
        .status(404)
        .json({ success: false, message: "The person record was not found." });
    }

    return res.status(200).json(people[index]);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/v1/people", (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Please enter a name." });
    }

    const age = parseInt(req.body.age);
    if (isNaN(age) || age < 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a non-negative number.",
      });
    }

    req.body.age = age;
    req.body.index = people.length;
    people.push(req.body);

    return res.status(201).json({
      success: true,
      message: "A person was added.",
      index: req.body.index,
      person: req.body,
    });
  } catch (error) {
    console.log(error);
  }
});

app.patch("/api/v1/people/:name", (req, res) => {
  try {
    const { name } = req.params;
    const person = people.filter((personObj) => personObj.name === name);

    if (person.length === 0) {
      return res.status(404).json("This person does not exist!");
    }

    people = people.map((personObj) => {
      if (personObj.name === name) {
        personObj = { ...personObj, ...req.body };
        return personObj;
      }
      return personObj;
    });

    return res
      .status(200)
      .json({ success: true, message: `Updated ${name}`, people });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/v1/people/:name", (req, res) => {
  try {
    const { name } = req.params;
    const person = people.filter((personObj) => personObj.name === name);
    if (person.length === 0) {
      return res.status(404).json("This person does not exist!");
    }
    people = people.filter((personObj) => personObj.name !== name);
    return res.status(200).json(people);
  } catch (error) {
    console.log(error);
  }
});

app.all("/api/v1/*", (req, res) => {
  res.json({ error: "That route is not implemented." });
});

const server = app.listen(3000, () => {
  console.log("listening on port 3000...");
});

module.exports = { app, server };
