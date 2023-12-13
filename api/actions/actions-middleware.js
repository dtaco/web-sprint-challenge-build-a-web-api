// add middlewares here related to actions
const Action = require('./actions-model');
const Project = require('../projects/projects-model');

async function validActionId(req, res, next){
    try {
        const action = await Action.get(req.params.id);

        if(action){
            req.action = action;
            next();
        }else{
            res.status(404).json({
                message: `No action with id of ${req.params.id}`
            })
        }
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    validActionId,
}
