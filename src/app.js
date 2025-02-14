const express = require('express');
const { loadEnv } = require('./shared/config/loadEnv');
const { loggerMiddleware } = require('./shared/middleware/logger.middleware');

const app = express();

loadEnv();

app.use(express.json());
app.use(loggerMiddleware);


module.exports = { app };
