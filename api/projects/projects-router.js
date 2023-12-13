// Write your "projects" router here!
const express = require('express');


const Project = require('./projects-model');
const { validProjectId, validProjectInfo, } = require('./projects-middleware');
const { PromiseKind } = require('@sinclair/typebox');

const router = express.Router();

router.get('/', async (req,res, next) => {
    const projects = await Project.get()
    try {
        res.status(200).json(projects)
    } catch (error) {
        next(error)
    }
});

router.get('/:id', validProjectId, (req, res, next) => {
    res.status(200).json(req.project);
})

router.post('/', validProjectInfo, async (req, res, next) => {
    const newProj = await Project.insert(req.body)
    try {
        res.status(201).json(newProj)
    } catch (err) {
        next(err);
    }
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'something tragic inside projects router happened',
        message: err.message,
        stack: err.stack,
    })
})




module.exports = router