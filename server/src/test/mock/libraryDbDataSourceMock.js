module.exports = () => {

    const ok = { code: 200 }
    const created = { code: 201 }

    function getLibraries() {
        return Promise.resolve(contractsMock)
    }

    function getLibrary(libraryName) {
        const library = contractsMock.hits.hits.find(library => library._id === libraryName)
        return Promise.resolve(library)
    }

    function addLibrary(body) {
        const uri = dataSourceOperations.addLibrary(body.name)
        const options = buildRequest(
            "POST",
            { 'Content-Type': 'application/json' },
            JSON.stringify(body)
        )        
        return fetch(uri, options).catch(err => { throw err })
    }

    function updateLibrary() {
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
        'getLibraries': getLibraries,
        'getLibrary': getLibrary,
        'addLibrary': addLibrary
    }    
}

const contractsMock = {
    "hits": {
		"total": {
			"value": 1,
			"relation": "eq"
		},
		"max_score": 1.0,
		"hits": [
			{
				"_index": "library",
				"_id": "Phylolib",
				"_score": 1.0,
				"_source": {
					"name": "Phylolib",
					"description": "A library of efficient algorithms for phylogenetic analysis",
					"library": {
						"callCommand": "phylolib",
						"arguments": [
							{
								"name": "help",
								"areOptionsAllowed": false
							},
							{
								"name": "distance",
								"areOptionsAllowed": true,
								"allowedCommands": [
									"hamming",
									"grapetree",
									"kimura"
								]
							},
							{
								"name": "correction",
								"areOptionsAllowed": true,
								"allowedCommands": [
									"jukescantor"
								]
							},
							{
								"name": "algorithm",
								"areOptionsAllowed": true,
								"allowedCommands": [
									"goeburst",
									"edmonds",
									"sl",
									"cl",
									"upgma",
									"upgmc",
									"wpgma",
									"wpgmc",
									"saitounei",
									"studierkepler",
									"unj"
								]
							},
							{
								"name": "optimization",
								"areOptionsAllowed": true,
								"allowedCommands": [
									"lbr"
								]
							}
						],
						"options": [
							{
								"name": "File Output",
								"argument": "-o",
								"alias": [
									"--out"
								],
								"valueType": "String"
							},
							{
								"name": "Dataset Input",
								"argument": "-d",
								"alias": [
									"--dataset"
								],
								"valueType": "String"
							},
							{
								"name": "Distance Matrix Input",
								"argument": "-m",
								"alias": [
									"--matrix"
								],
								"valueType": "String"
							},
							{
								"name": "Limit of focus variants",
								"argument": "-l",
								"alias": [
									"--lvs"
								],
								"valueType": "Number"
							}
						]
					}
				}
			}
		]
	}
}