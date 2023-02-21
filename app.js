const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());

const peopleRouter = require('./routes/people')

const people = [];


// app.all("/api/v1/*", (req, res) => {
//   res.json({ error: "That route is not implemented." });
// });

// app.use('/api/v1/people',peopleRouter)

app.post('/api/v1/people',(req,res)=> {
  if(!req.body.name||!req.body.age) {
    res.status(400).json({error:'Please provide name and age'}) 
    return
  }
  if(req.body.age<0) {
    res.status(400).json({error:'The age must be a positive number'})
    return
  }
  people.push(req.body)
  res.status(200).json({msg:'A person entry was added',Index:people.length})
})
app.get('/api/v1/people', (req,res) => res.json({people}))
app.get('/api/v1/people/:id', (req,res) => {
  if(req.params.id>people.length||req.params.id<1) {
    res.status(404).json({error:'The index is out of range'})
    return
  }
  const person = people[req.params.id -1]
  res.json({person})
})
const server = app.listen(3000, () => {
  console.log("listening on port 3000...");
});


module.exports =  { app, server }