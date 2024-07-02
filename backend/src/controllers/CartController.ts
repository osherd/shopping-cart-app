import { Request, Response, NextFunction, query } from 'express'
import { ICartService } from '../interfaces/cart/ICartService'
import { IUserService } from '../interfaces/user/IUserService'
import { IProductService } from '../interfaces/product/IProductService'

export class CartController {
  private cartInteractor: ICartService
  private userInteractor: IUserService
  private productInteractor: IProductService

  constructor(
    cartInteractor: ICartService,
    userInteractor: IUserService,
    productInteractor: IProductService,
  ) {
    this.cartInteractor = cartInteractor
    this.userInteractor = userInteractor
    this.productInteractor = productInteractor
  }
  async onCreateCart(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userInteractor.getUserById(req.body.userId)
      if (!user) {
        throw new Error('Incorect user')
      }
      const { id, stockQuantity } = req.body

      const product = await this.productInteractor.getProductById(
        req.body.productId,
      )
      if (!product) {
        throw new Error('Incorrect product id')
      }
      if (product.stockQuantity < stockQuantity) {
        throw new Error('Not enough quantity in stock')
      }

      const cartItem = await this.cartInteractor.createCart({
        id,
        userId: user.id,
        productId: product.id,
        stockQuantity,
      })

      res.status(200).json(cartItem)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async onGetCartById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(`${req.params.id}`)
      const data = await this.cartInteractor.findCartById(id)
      return res.status(200).json(data)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
  async onDeleteCart(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const data = await this.cartInteractor.deleteCart(id)
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  async onGetCarts(req: Request, res: Response, next: NextFunction) {
    try {
      const offset = parseInt(`${req.query.offset}`) | 0
      const limit = parseInt(`${req.query.limit}`) || 10
      const data = await this.cartInteractor.findCart(limit, offset)
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  async onUpdateCart(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(`${req.query.id}`)
      const stockQuantity = parseInt(`${req.query.stockQuantity}`)
      const userId = parseInt(`${req.query.userId}`)
      const productId = parseInt(`${req.query.productId}`)
      const updatedData = await this.cartInteractor.updateCart(
        id,
        userId,
        productId,
        stockQuantity,
      )
      return res.status(200).json(updatedData)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
}
