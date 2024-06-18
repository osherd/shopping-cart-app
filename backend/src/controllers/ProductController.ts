import { Request, Response, NextFunction, query } from 'express';
import { IProductInteractor } from '../interfaces/product/IProductInteractor';

export class ProductController {
  private interactor: IProductInteractor

  constructor(interactor: IProductInteractor) {
    this.interactor = interactor
  }
  async onCreateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const data = await this.interactor.createProduct(body);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async onGetProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id;
      const data = await this.interactor.getProductById(productId);
      return res.status(200).json(data);
    } catch (error) {
      next(error)

    }
  }
  async onDeleteProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id;
      const data = await this.interactor.deleteProductById(productId);
      return res.status(200).json(data);
    } catch (error) {
      next(error)

    }
  }


  async onGetProducts(req: Request, res: Response, next: NextFunction) {

    try {
      const offset = parseInt(`${req.query.offset}`) | 0;
      const limit = parseInt(`${req.query.limit}`) || 10;
      const data = await this.interactor.getProduct(limit, offset);
      return res.status(200).json(data);
    } catch (error) {
      next(error)

    }
  }

  async onUpdateStock(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(`${req.query.id}`)
      const stock = parseInt(`${req.query.stockQuantity}`);
      const updatedData = await this.interactor.updateStock(id, stock);
      return res.status(200).json(updatedData)

    } catch (error) {
      next(error);

    }
  }
}