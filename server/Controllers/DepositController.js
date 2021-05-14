const ApiError = require('../Errors/ApiError');
const knex = require("../Models/accountsModel");

class DepositController {
    deposit(request, response, next) {
        const { cardNumber, amount, PIN } = request.body

        if (!cardNumber) {
            next(ApiError.badRequest('Card number is required.'))
            return
        }
        if (!amount) {
            response.status(400).json('Amount is required.')
            return
        }
        if (!PIN) {
            response.status(400).json('PIN number is required.')
            return
        }
        knex.deposit(request.body).then(data => {
            if (data !== 1) {
                response.status(500).json('Could not deposit money.')
                return
            }
            response.sendStatus(201);
        });
    }
}

module.exports = new DepositController();
