const fs = require('fs');
const path = require('path');

const attemptsPath = path.join(__dirname, 'attempts.data.json');

const readData = () => {
    try {
        const data = fs.readFileSync(attemptsPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return [];
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(attemptsPath, JSON.stringify(data));
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    readData,
    writeData
};