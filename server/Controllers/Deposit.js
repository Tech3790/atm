const ApiError = require('../Erros/ApiError');

class Deposit {
    deposit(request, response, next) {
        const { message } = request.body;
        if (!message) {
            next(ApiError.badRequest('Message body cannot be empty.'));
            return;
        }
        response.sendStatus(201);
    }
}

module.exports = new Deposit();