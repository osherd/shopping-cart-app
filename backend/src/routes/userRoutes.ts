import express from "express";
import { UserRepository } from '../repositories/userRepository'
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/UserController';

const router = express.Router();
const repository = new UserRepository()
const interactor = new UserService(repository)
const controller = new UserController(interactor);


router.post('/v1/users', controller.onCreateUser.bind(controller));
router.get('/v1/users', controller.onGetUsers.bind(controller));
router.get('/v1/users/:id', controller.onGetUserById.bind(controller));
router.get('/v1/users/:id', controller.onDeleteUserById.bind(controller));
router.patch('/v1/users:id', controller.onUpdateUser.bind(controller))

export default router;