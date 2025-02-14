const { Router } = require("express");
const userController = require("./user.controller");
const userRouter = new Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/register", userController.addUser);
userRouter.put("/:id", userController.editUser);
userRouter.delete("/:id", userController.deleteUser);

module.exports = { userRouter }