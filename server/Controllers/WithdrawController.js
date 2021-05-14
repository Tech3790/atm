const ApiError = require('../Errors/ApiError');
const knex = require("../Models/accountsModel");

class WithdrawController {
    withdraw(request, response, next) {
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
        knex.withdraw(request.body).then(data => {
            if (typeof data === "object") {
              response.send(data);
            } else if (typeof data === "string") {
              response.send(data);
            } else {
              response.sendStatus(401);
            }
          });
    }
}

module.exports = new WithdrawController();