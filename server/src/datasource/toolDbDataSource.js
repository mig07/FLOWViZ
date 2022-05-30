const ToolContract = require('../schema/toolContract/ToolContract');

module.exports = () => {

    function getTools() {
        return ToolContract.find({})            
    }

    function getTool(toolName) {
        return ToolContract.findOne({ name: toolName })
    }

    function addTool(tool) {    
        return new ToolContract(tool).save()
            
    }

    function updateTool(toolName, updatedTool) {
        return new ToolContract.replaceOne({ name: toolName }, updatedTool)
    }

    return {
        'getTools': getTools,
        'getTool': getTool,
        'addTool': addTool
    }
}