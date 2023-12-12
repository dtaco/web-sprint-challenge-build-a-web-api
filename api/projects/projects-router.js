// Write your "projects" router here!
const express = require('express');

// const {

// } = require('./projects-middleware');

const Project = require('./projects-model')

const router = express.Router();

router.get('/api/projects', (req, res, next) => {
    Project.get()
        .then(projects => {
            console.log(projects)
        })
        .catch(next)
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'something tragic inside projects router happened',
        message: err.message,
        stack: err.stack,
    })
})


module.exports = router