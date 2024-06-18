import { Request, Response, NextFunction, query } from 'express';
import { ICartService } from '../interfaces/cart/ICartService';
import { IUserService } from '../interfaces/user/IUserService';
import { IProductService } from '../interfaces/product/IProductService';
import { CartItem } from '../dto/User.dto';

export class CartController {
  private cartInteractor: ICartService
  private userInteractor: IUserService
  private productInteractor: IProductService

  constructor(cartInteractor: ICartService, userInteractor: IUserService, productInteractor: IProductService) {
    this.cartInteractor = cartInteractor
    this.userInteractor = userInteractor
    this.productInteractor = productInteractor
  }
  async onCreateCart(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const user = req.user;

      if (user) {

        const user = await this.userInteractor.getUserById(req.body.id);
        let cartItems = Array();

        const { id, stockQuantity } = <CartItem>req.body;

        const product = await this.productInteractor.getProductById(req.body.productId);

        if (product) {

          if (user) {
            cartItems.push(product)


            if (cartItems.length > 0) {
              // check and update
              const existProductItems = cartItems.filter((item) => item.id.toString() === id.toString());

              if (existProductItems.length > 0) {

                const index = cartItems.indexOf(existProductItems[0]);

                if (stockQuantity > 0) {
                  cartItems[index] = { product, stockQuantity };
                } else {
                  cartItems.splice(index, 1);
                }

              } else {
                cartItems.push(product)
              }

            } else {
              // add new Item
              cartItems.push(product);
            }

            if (cartItems) {
              user.cart = cartItems as any;
              const cartResult = await this.userInteractor.updateUser(user.id, user);
              return res.status(200).json(cartResult.cart);
            }

          }
        }

      }

    } catch (error) {
      next(error);
    }
  }

  async onGetCartById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(`${req.query.id}`)
      const data = await this.cartInteractor.findCartById(id);
      return res.status(200).json(data);
    } catch (error) {
      next(error)

    }
  }
  async onDeleteCart(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = await this.cartInteractor.deleteCart(id);
      return res.status(200).json(data);
    } catch (error) {
      next(error)

    }
  }


  async onGetCarts(req: Request, res: Response, next: NextFunction) {

    try {
      const offset = parseInt(`${req.query.offset}`) | 0;
      const limit = parseInt(`${req.query.limit}`) || 10;
      const data = await this.cartInteractor.findCart(limit, offset);
      return res.status(200).json(data);
    } catch (error) {
      next(error)

    }
  }

  async onUpdateCart(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(`${req.query.id}`)
      const stockQuantity = parseInt(`${req.query.stockQuantity}`)
      const updatedData = await this.cartInteractor.updateCart(id, stockQuantity);
      return res.status(200).json(updatedData)

    } catch (error) {
      next(error);

    }
  }
  async onEditCard(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(`${req.query.id}`)
      const stockQuantity = parseInt(`${req.query.stockQuantity}`)
      const updatedData = await this.cartInteractor.updateCart(id, stockQuantity);
      return res.status(200).json(updatedData)

    } catch (error) {
      next(error);

    }
  }
}