const express = require('express')
const router = express.Router()

const { 
    getPeople,
    getPerson,
    createPerson,
    } = require('../controllers/people')

router.route('/').post(createPerson).get(getPeople)
router.route('/:id').get(getPerson)

module.exports = router