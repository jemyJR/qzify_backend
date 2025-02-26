const { readData, writeData } = require('./attempts.repository');

class AttemptsService {
    static getAttempts() {
        const attempts = readData();
        return attempts;
    }

    static getAttempt(id) {
        const attempts = readData();
        const attempt = attempts.find(attempt => attempt.id === id);
        if (!attempt) {
            throw new Error('Attempt not found');
        }
        return attempt;
    }

    static createAttempt(newAttempt) {
        const attempts = readData();

        const lastAttempt = attempts[attempts.length - 1];
        newAttempt.id = lastAttempt.id + 1;
        attempts.push(newAttempt);
        writeData(attempts);
        return newAttempt;
    }

    static updateAttempt(id, updatedAttempt) {
        const attempts = readData();
        const index = attempts.findIndex(attempt => attempt.id === id);
        if (index === -1) {
            throw new Error('Attempt not found');
        }
        updatedAttempt.id = id;
        attempts[index] = updatedAttempt;
        writeData(attempts);
        return updatedAttempt;
    }

    static deleteAttempt(id) {
        const attempts = readData();
        const index = attempts.findIndex(attempt => attempt.id === id);
        if (index === -1) {
            throw new Error('Attempt not found');
        }
        attempts.splice(index, 1);
        writeData(attempts);
        return attempts;
    }
}

module.exports = AttemptsService;