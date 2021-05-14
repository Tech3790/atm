const ApiError = require("./ApiError");

const apiErrorHandler = (error, request, response, next) => {
    console.error(error);

    if (error instanceof ApiError) {
        response.status(error.code).json(error.message);
        return;
    }

    response.status(500).json('Something went wrong.')
}
module.exports = apiErrorHandler;