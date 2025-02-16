const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, 'users.data.json');

const readData = () => {
    try {
        const data = fs.readFileSync(usersPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return [];
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(usersPath, JSON.stringify(data));
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    readData,
    writeData
};