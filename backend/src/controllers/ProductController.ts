import { Request, Response, NextFunction, query } from 'express'
import { IProductService } from '../interfaces/product/IProductService'

export class ProductController {
  private interactor: IProductService

  constructor(interactor: IProductService) {
    this.interactor = interactor
  }
  async onCreateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body
      const data = await this.interactor.createProduct(body)
      return res.status(200).json(data)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async onGetProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id
      const data = await this.interactor.getProductById(productId)
      return res.status(200).json(data)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
  async onDeleteProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id
      const data = await this.interactor.deleteProductById(productId)
      return res.status(200).json(data)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async onGetProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const offset = parseInt(`${req.query.offset}`) | 0
      const limit = parseInt(`${req.query.limit}`) || 10
      const data = await this.interactor.getProduct(limit, offset)
      return res.status(200).json(data)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
}
