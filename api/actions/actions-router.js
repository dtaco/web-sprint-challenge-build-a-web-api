// Write your "actions" router here!
const express = require('express');

// const {

// } = require('./actions-middlware');

const Action = require('./actions-model')

const router = express.Router();




router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'something tragic inside actions router happened',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router;
