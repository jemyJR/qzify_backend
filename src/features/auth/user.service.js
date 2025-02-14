const { v4: generateId } = require("uuid");
const fs = require("fs");
const path = require("path");
const rootPath = __dirname;
const userFilePath = path.join(rootPath, "user.data.json");

const readUsersFromFile = () => {
    try {
        const data = fs.readFileSync(userFilePath, "utf8");
        return JSON.parse(data);
    } catch (e) {
        throw new Error("Error: Reading User Data__", e.message);
    }

}
const writeUsersToFile = (usersData) => {
    try {
        const data = JSON.stringify(usersData)
        fs.writeFileSync(userFilePath, data)
    } catch (e) {
        throw new Error("Error: Writing User Data__", e.message);
    }
}
const getAllUsers = () => {
    try {
        return readUsersFromFile();
    } catch (e) {
        throw { status: 404, message: "Users Not Found" }
    }

}
const getUserById = (id) => {
    const users = readUsersFromFile();
    const user = users.find((user) => user.id === id);
    if (!user)
        throw { status: 404, message: "User Not Found" }
    return user;
}
const getUserIndex = (id) => {
    const users = readUsersFromFile();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1)
        throw { status: 404, message: "User Not Found" }
    return userIndex;
}
const addUser = (user) => {
    const users = readUsersFromFile();
    const newUser = {
        id: generateId(),
        ...user
    }
    users.push(newUser);
    writeUsersToFile(users);
    return newUser;
}
const editUser = (userId, userEditRequest) => {
    const users = readUsersFromFile();
    const userIndex = getUserIndex(userId);
    users[userIndex] = { ...users[userIndex], ...userEditRequest }
    writeUsersToFile(users);
    return users[userIndex];
}
const deleteUser = (userId) => {
    const users = readUsersFromFile();
    const userIndex = getUserIndex(userId);
    if (userIndex === -1) return false;
    users.splice(userIndex, 1);
    writeUsersToFile(users);
    return true;
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    editUser,
    deleteUser
}