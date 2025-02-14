const userService = require("./user.service");

const getAllUsers = (req, res, next) => {
    try {
        res.send(userService.getAllUsers());
    } catch (e) {
        next(e)
    }
}
const getUserById = (req, res, next) => {
    try {
        const user = userService.getUserById(req.params.id);
        res.send(user);
    } catch (e) {
        next(e)
    }
}
const addUser = (req, res, next) => {
    try {
        const newUser = userService.addUser(req.body);
        res.send(newUser);
    } catch (e) {
        next(e)
    }
}
const editUser = (req, res, next) => {
    try {
        const updatedUser = userService.editUser(req.params.id, req.body);
        res.send(updatedUser);
    } catch (e) {
        next(e)
    }
}
const deleteUser = (req, res, next) => {
    try {
        const userDeleted = userService.deleteUser(req.params.id);
        userDeleted ? res.send("User Has Been Deleted Successfully") : res.send("Couldn't Delete the User")
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    editUser,
    deleteUser
}