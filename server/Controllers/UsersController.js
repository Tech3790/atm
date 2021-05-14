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
            response.status(400).json('Last name is required.')
            return
        }

        if (!initialBalance) {
            response.status(400).json('Initial balance is required.')
            return
        }

        if (!cardNumber) {
            response.status(400).json('Card number is required.')
            return
        }

        if (!PIN) {
            response.status(400).json('PIN number is required.')
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
