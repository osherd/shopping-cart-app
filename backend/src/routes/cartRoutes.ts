import express from "express";
import { CartRepository } from '../repositories/cartRepository';
import { CartService } from '../services/cart.service';
import { CartController } from '../controllers/CartController';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/userRepository';
import { ProductRepository } from '../repositories/productRepository';
import { ProductService } from '../services/product.service';

const router = express.Router();

const userRepository = new UserRepository()
const userInteractor = new UserService(userRepository)

const productRepository = new ProductRepository()
const productInteractor = new ProductService(productRepository)


const repository = new CartRepository()
const interactor = new CartService(repository)
const controller = new CartController(interactor, userInteractor, productInteractor);


router.post('/v1/cart', controller.onCreateCart.bind(controller));
router.get('/v1/cart/:id', controller.onGetCartById.bind(controller));
router.delete('/v1/cart/:id', controller.onDeleteCart.bind(controller));
router.patch('/v1/cart', controller.onUpdateCart.bind(controller))


export default router;