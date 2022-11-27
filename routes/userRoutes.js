const express = require('express');

const userController = require('../controllers/userController');

const userRouter = express.Router();

//Users Router
userRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createNewUser);
userRouter
  .route('/:id')
  .get(userController.getUserByID)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
