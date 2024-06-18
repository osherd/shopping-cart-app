import express from "express";
import { UserRepository } from '../repositories/userRepository'
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/UserController';
import { Authenticate } from '../middleware/auth';

const router = express.Router();
const repository = new UserRepository()
const serviceInteractor = new UserService(repository)
const controller = new UserController(serviceInteractor);


//Suignup / Create User
router.post('/v1/users/signup', controller.onUserSignup.bind(controller))

//Login 
router.post('/v1/users/login', controller.onUserLogin.bind(controller));

//Authentication
router.use(Authenticate);

router.get('/v1/users', controller.onGetUsers.bind(controller));
router.get('/v1/users/:id', controller.onGetUserById.bind(controller));
router.get('/v1/users/:id', controller.onDeleteUserById.bind(controller));
router.patch('/v1/users:id', controller.onUpdateUser.bind(controller))





export default router;