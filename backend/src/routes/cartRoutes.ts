import express from "express";
import { CartRepository } from '../repositories/cartRepository';
import { CartService } from '../services/cart.service';
import { CartController } from '../controllers/CartController';

const router = express.Router();
const repository = new CartRepository()
const interactor = new CartService(repository)
const controller = new CartController(interactor);


router.post('/v1/cart', controller.onCreateCart.bind(controller));
router.get('/v1/cart/:id', controller.onGetCartById.bind(controller));
router.get('/v1/cart/:id', controller.onDeleteCart.bind(controller));
router.patch('/v1/cart:id', controller.onUpdateCart.bind(controller))

export default router;