import express from "express";
import { ProductController } from '../controllers/ProductController';
import { ProductRepository } from '../repositories/productRepository'
import { ProductInteractor } from '../interactors/ProductInteractor';

const router = express.Router();
const repository = new ProductRepository()
const interactor = new ProductInteractor(repository)
const controller = new ProductController(interactor);


router.post('/v1/products', controller.onCreateProduct.bind(controller));
router.get('/v1/products', controller.onGetProducts.bind(controller));
router.get('/v1/products/:id', controller.onGetProductById.bind(controller));
router.get('/v1/products/:id', controller.onDeleteProductById.bind(controller));
router.patch('/v1/products:id', controller.onUpdateStock.bind(controller))

export default router;