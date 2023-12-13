// Write your "actions" router here!
const express = require('express');

const {
 validActionId,
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


router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'something tragic inside actions router happened',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router;
