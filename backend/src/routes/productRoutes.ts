import express from "express";
import { ProductController } from '../controllers/ProductController';
import { ProductRepository } from '../repositories/productRepository'
import { ProductService } from '../services/product.service';

const router = express.Router();
const repository = new ProductRepository()
const interactor = new ProductService(repository)
const controller = new ProductController(interactor);


router.post('/v1/products', controller.onCreateProduct.bind(controller));
router.get('/v1/products', controller.onGetProducts.bind(controller));
router.get('/v1/products/:id', controller.onGetProductById.bind(controller));
router.get('/v1/products/:id', controller.onDeleteProductById.bind(controller));
router.patch('/v1/products:id', controller.onUpdateStock.bind(controller))

export default router;