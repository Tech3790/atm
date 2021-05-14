const ApiError = require('../Errors/ApiError');
const knex = require("../Models/accountsModel");

class TransactionsController {
    listTransactions(request, response, next) {
        const { cardNumber, PIN } = request.query

        if (!cardNumber) {
            next(ApiError.badRequest('Card number is required.'))
            return
        }

        if (!PIN) {
            response.status(400).json('PIN number is required.')
            return
        }

        knex.getBalanceAndTransactions(request.query).then(data => {
            response.send(data);
        });
    }
}

module.exports = new TransactionsController();
