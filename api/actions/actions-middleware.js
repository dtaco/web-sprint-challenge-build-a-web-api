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

async function validProject(req,res,next){
    const { project_id } = req.body
    const project = await Project.get(project_id)
    try {
        if(project){
            next();
        }else{
            res.status(404).json({
                message: `no project with id of ${project_id}`
            })
        }
    } catch (error) {
        next(error)
    }
}

function validActionInfo (req, res, next){
    const { description, notes } = req.body;
    if(  description &&
         description.trim().length &&
         description.length <= 128 &&
         notes &&
         notes.trim().length){
        next()
    }else{
        res.status(400).json({
            message: 'Action needs a description and notes.'
        })
    }
}

module.exports = {
    validActionId,
    validProject,
    validActionInfo,
}
