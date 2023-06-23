'use strict';
const express = require('express');
const router = express.Router();

const { createPerson, getPeople, getPerson } = require('../controllers/person');

router.route('/').post(createPerson).get(getPeople);
router.route('/:id').get(getPerson);

module.exports = router;

