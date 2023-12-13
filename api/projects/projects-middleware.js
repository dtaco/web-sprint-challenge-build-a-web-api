// add middlewares here related to projects
const Project = require('./projects-model')

async function validProjectId (req, res, next) {
    try {
        const project = await Project.get(req.params.id);
        if (project) {
            req.project = project;
            next();
        } else {
            res.status(404).json({
                message: `No project with id ${req.params.id}`
            })
        }
    } catch (err) {
        next(err)
    }
}

async function validProjectInfo (req,res, next) {
    const { name, description, completed } = req.body;
    if (
        name &&
        name.trim().length &&
        description &&
        description.trim().length &&
        completed !== undefined){
        next()
    } else {
        res.status(400).json({
            message: 'project needs a name and description'
        })
    }
}

module.exports = {
    validProjectId,
    validProjectInfo,
}