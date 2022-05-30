const ToolContract = require('../schema/toolContract/ToolContract');

module.exports = (toolDb, ApiException) => {
    
    async function getTools() {

        const tools = await toolDb.getTools()

        return tools.map(tool => {
            return {
                name: tool.name,
                description: tool.description,
            }
        })
    }

    async function getTool(toolName) {

        const tool = await toolDb.getTool(toolName)

        if (!tool) {
            throw ApiException.notFound(`The library with name ${toolName} does not exist.`)
        }

        return tool
    }

    async function addTool(tool) {

        const name = tool.name

        const t = await toolDb.getTool(name)

        if (t) {
            throw ApiException.conflict(`A library with name ${name} already exists.`)
        }

        const contract = new ToolContract({
            name: tool.name,
            description: tool.description,
            api: tool.api,
            library: tool.library
        })

        return await toolDb.addTool(contract)
    }

    return {
        'getTools': getTools,
        'getTool': getTool,
        'addTool': addTool
    }
}