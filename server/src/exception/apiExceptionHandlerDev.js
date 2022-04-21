const ApiException = require('./apiException')

function apiExceptionHandler(err, req, res, next) {
    
    console.log(err)

    if (err instanceof ApiException) {
        res.status(err.statusCode).json(err.message)
    }

    res.status(500).json('Something went wrong');
}

module.exports = apiExceptionHandler