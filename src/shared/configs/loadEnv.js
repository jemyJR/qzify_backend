const process = require("process");

const loadEnv = () => {
    process.loadEnvFile();
}
module.exports = { loadEnv }