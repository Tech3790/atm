const express = require('express');
const DepositController = require('./Controllers/DepositController.js');
const WithdrawController = require('./Controllers/WithdrawController.js');
const TransactionsController = require('./Controllers/TransactionsController.js');
const UsersController = require('./Controllers/UsersController.js');

const router = express();
router.post('/deposit', DepositController.deposit)
router.post('/withdraw', WithdrawController.withdraw)
router.get('/transactions', TransactionsController.listTransactions)
router.post('/users', UsersController.createUser)

module.exports = router;