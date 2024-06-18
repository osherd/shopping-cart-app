import { Request, Response, NextFunction, query } from 'express';
import { ICartInteractor } from '../interfaces/cart/ICartInteractor';

export class CartController {
  private interactor: ICartInteractor

  constructor(interactor: ICartInteractor) {
    this.interactor = interactor
  }
  async onCreateCart(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const data = await this.interactor.createCart(body);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async onGetCartById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(`${req.query.id}`)
      const data = await this.interactor.findCartById(id);
      return res.status(200).json(data);
    } catch (error) {
      next(error)

    }
  }
  async onDeleteCart(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = await this.interactor.deleteCart(id);
      return res.status(200).json(data);
    } catch (error) {
      next(error)

    }
  }


  async onGetCarts(req: Request, res: Response, next: NextFunction) {

    try {
      const offset = parseInt(`${req.query.offset}`) | 0;
      const limit = parseInt(`${req.query.limit}`) || 10;
      const data = await this.interactor.findCart(limit, offset);
      return res.status(200).json(data);
    } catch (error) {
      next(error)

    }
  }

  async onUpdateCart(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(`${req.query.id}`)
      const stockQuantity = parseInt(`${req.query.stockQuantity}`)
      const updatedData = await this.interactor.updateCart(id, stockQuantity);
      return res.status(200).json(updatedData)

    } catch (error) {
      next(error);

    }
  }
  async onEditCard(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(`${req.query.id}`)
      const stockQuantity = parseInt(`${req.query.stockQuantity}`)
      const updatedData = await this.interactor.updateCart(id, stockQuantity);
      return res.status(200).json(updatedData)

    } catch (error) {
      next(error);

    }
  }
}