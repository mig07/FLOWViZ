const process = require('../schema/process-schema.json')

module.exports = (workflowDb, validator, ApiException) => {

    async function getWorkflows() {
        return await workflowDb.getWorkflows()
    }

    async function getWorkflow(name) {
        return await workflowDb.getWorkflow(name)
    }

    async function postWorkflow(workflow) {
        
        const isWorkflowValid = validator.isValid(workflow, ProcessContract)

        if (!isWorkflowValid) {
            throw ApiException.badRequest("This workflow request is not valid!")
        }

        return await workflowDb.postWorkflow(workflow)
    }

    return {
        'getWorkflows': getWorkflows,
        'getWorkflow': getWorkflow,
        'postWorkflow': postWorkflow
    }
}