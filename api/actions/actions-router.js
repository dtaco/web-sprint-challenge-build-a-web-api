// Write your "actions" router here!
const express = require('express');

const {
 validActionId,
 validProject,
 validActionInfo,
} = require('./actions-middleware');
 
const Action = require('./actions-model')

const router = express.Router();

router.get('/', async (req, res, next) => {
    const actions = await Action.get();
    try {
        res.json(actions)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validActionId, async (req, res, next) => {
    res.json(req.action);
})

router.post('/', validProject, validActionInfo, async (req, res, next) => {
    const newAction = await Action.insert(req.body)
    try {
        res.status(201).json(newAction)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validActionId, validActionInfo, async (req, res, next) => {
    const update = await Action.update(req.params.id, req.body)
    try{
        res.json(update)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validActionId, (req, res, next) => {
    Action.remove(req.params.id)
        .then(() => {
            res.json()
        })
        .catch(next)
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'something tragic inside actions router happened',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router;
