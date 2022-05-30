module.exports = () => {

    const ok = { code: 200 }
    const created = { code: 201 }

    function getTools() {
        return Promise.resolve(contractsMock)
    }

    function getTool(toolName) {
        const tool = contractsMock.find(tool => tool.name === toolName)
        return Promise.resolve(tool)
    }

    function addTool(body) {
        const uri = dataSourceOperations.addLibrary(body.name)
        const options = buildRequest(
            "POST",
            { 'Content-Type': 'application/json' },
            JSON.stringify(body)
        )        
        return fetch(uri, options).catch(err => { throw err })
    }

    function updateTool() {
        // TODO
    }

    function buildRequest(method, headers, requestBody) {
        return {
            "method": method,
            "headers": headers,
            "body": requestBody
        }
    }

    return {
        'getTools': getTools,
        'getTool': getTool,
        'addTool': addTool
    }    
}

const contractsMock = 
    [
		{
			"_id": "626176bee3bbe98eeca5eeea",
			"name": "Phylolib",
			"description": "A library of efficient algorithms for phylogenetic analysis",
			"library": {
				"machineAddress": "localhost:5555",
				"image": "luanab/phylolib",
				"name": "phylolib",
				"arguments": [
					{
						"name": "help",
						"areOptionsAllowed": false,
						"valueType": [],
						"_id": "626176bee3bbe98eeca5eeec"
					},
					{
						"name": "distance",
						"areOptionsAllowed": true,
						"valueType": [],
						"_id": "626176bee3bbe98eeca5eeed"
					},
					{
						"name": "correction",
						"areOptionsAllowed": true,
						"valueType": [],
						"_id": "626176bee3bbe98eeca5eeee"
					},
					{
						"name": "algorithm",
						"areOptionsAllowed": true,
						"valueType": [],
						"_id": "626176bee3bbe98eeca5eeef"
					},
					{
						"name": "optimization",
						"areOptionsAllowed": true,
						"valueType": [],
						"_id": "626176bee3bbe98eeca5eef0"
					}
				],
				"options": [
					{
						"name": "File Output",
						"arguments": [
							"-o",
							"--out"
						],
						"valueType": "String",
						"_id": "626176bee3bbe98eeca5eef1"
					},
					{
						"name": "Dataset Input",
						"arguments": [],
						"valueType": "String",
						"_id": "626176bee3bbe98eeca5eef2"
					},
					{
						"name": "Distance Matrix Input",
						"arguments": [],
						"valueType": "String",
						"_id": "626176bee3bbe98eeca5eef3"
					},
					{
						"name": "Limit of focus variants",
						"arguments": [],
						"valueType": "Number",
						"_id": "626176bee3bbe98eeca5eef4"
					}
				],
				"_id": "626176bee3bbe98eeca5eeeb"
			},
			"__v": 0
		}
	]