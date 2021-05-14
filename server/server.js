const express = require('express');
const router = require('./router');
const apiErrorHandler = require('./Errors/apiErrorHandler');

const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use('/', router);

app.use(apiErrorHandler);
app.listen(8080, () => console.log('server running on port 8080'));