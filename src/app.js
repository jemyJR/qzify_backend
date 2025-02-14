const express = require('express');
const { loadEnv } = require('./shared/config/loadEnv');

const app = express();

loadEnv();

module.exports = { app };
