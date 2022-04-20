const Docker = require('dockerode')

const docker = new Docker({host: 'localhost', port: 5555});

module.exports = (workflowSystemConfig, fetch) => {

    function getWorkflows() {

    }

    function getWorkflow(name) {
        
    }

    function postWorkflow(workflow) {
        docker.run(testImage, workflow, process.stdout)
            .then(data => {
                var output = data[0];
                //var container = data[1];
                console.log(output.StatusCode);
                //return container.remove();
            }).catch(function(err) {
                console.log(err);
            });
    }

    return {
        'getWorkflows': getWorkflows,
        'getWorkflow': getWorkflow,
        'postWorkflow': postWorkflow
    }

}