const { readData, writeData } = require('../users/users.repository');

class UserService{
    static login(email, password){
        const users = readData();
        const user = users.find(user => user.email === email && user.password === password);
        if (!user) {
            throw new Error('Email or password is incorrect');
        }
        return user;
    }

    static register(newUser){
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

    static changePassword(email, oldPassword, newPassword){
        const users = readData();
        const user = users.find(user => user.email === email && user.password === oldPassword);
        if (!user) {
            throw new Error('Email or password is incorrect');
        }
        if (oldPassword === newPassword) {
            throw new Error('New password must be different');
        }
        user.password = newPassword;
        writeData(users);
        return user;
    }
}

module.exports = UserService;