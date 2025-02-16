const { readData, writeData } = require('./users.repository');

class UserService {
    static getUsers() {
        const users = readData();
        return users;
    }

    static getUser(id) {
        const users = readData();
        const user = users.find(user => user.id === id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    static createUser(newUser) {
        const users = readData();

        const existingUser = users.find(user => user.email === newUser.email);
        if (existingUser) {
            throw new Error('Email already exists');
        }

        const lastUser = users[users.length - 1];
        newUser.id = lastUser.id + 1;
        users.push(newUser);
        writeData(users);
        return newUser;
    }

    static updateUser(id, updatedUser) {
        const users = readData();
        const index = users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new Error('User not found');
        }
        updatedUser.id = id;
        users[index] = updatedUser;
        writeData(users);
        return updatedUser;
    }

    static deleteUser(id) {
        const users = readData();
        const index = users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new Error('User not found');
        }
        users.splice(index, 1);
        writeData(users);
        return users;
    }
}

module.exports = UserService;
