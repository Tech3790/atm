const ApiError = require('../Errors/ApiError');
const knex = require("../Models/usersModel");

class UsersController {
    async createUser(request, response, next) {
        const { firstname, lastname, initialBalance, cardNumber, PIN } = request.body

        if (!firstname) {
            next(ApiError.badRequest('First name is required.'))
            return
        }

        if (!lastname) {
            next(ApiError.badRequest('Last name is required.'))
            return
        }

        if (!initialBalance) {
            next(ApiError.badRequest('Initial balance is required.'))
            return
        }

        if (!cardNumber) {
            next(ApiError.badRequest('Card number is required.'))
            return
        }

        if (!PIN) {
            next(ApiError.badRequest('PIN number is required.'))
            return
        }

        if (await knex.createUser(request.body)) {
            response.sendStatus(201);
          } else {
            response.sendStatus(500);
          }
    }
}

module.exports = new UsersController();
