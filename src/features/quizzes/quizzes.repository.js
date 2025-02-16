const fs = require('fs');
const path = require('path');

const quizzesPath = path.join(__dirname, 'quizzes.data.json');

const readData = () => {
    try {
        const data = fs.readFileSync(quizzesPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return [];
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(quizzesPath, JSON.stringify(data));
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    readData,
    writeData
};