'use strict';

const people = [];
let index = 0;

const createPerson = (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  if (!name || !age) {
    res.status(400).json({ msg: 'Kindly provide both name and age.' });
  } else if (age < 1) {
    res.status(400).json({ msg: 'Kindly provide an non-negative age.' });
  } else {
    index += 1;
    const person = {name: name, age: age, index: index};
    people.push(person);
    res.json({ msg: 'A person entry was successfully added.', index: index });
  }
};

const getPeople = (req, res) => {
  if (people.length > 0) {
    res.status(200).json({ people: people, total: people.length });
  } else {
    res.status(200).json({ msg: 'There are no people to show' });
  }
};

const getPerson = (req, res) => {
  const index = Number(req.params.id);
  console.log(index);
  if (!index) {
    res.status(400).json({ msg: "Kindly provide the person's index number." });
  } else {
    let keyPerson;
    for (let person of people) {
      console.log(person);
      if (person.index === index) {
        res.status(200).json({ result: person });
      }
    }    
  }  
};

module.exports = {
  createPerson,
  getPeople,
  getPerson,
};