const getPeople = async (req,res) =>{
    res.json({msg:'List of people'})
}

const getPerson = async (req,res) =>{
    res.json({msg:'Single Person'})
}

const createPerson = async (req,res) =>{
    res.json({msg:'Create person'})
}

module.exports ={
    getPeople,
    getPerson,
    createPerson
}