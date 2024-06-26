export interface ICartService {
  createCart(cartData: any): any;
  findCart(limit: number, offset: number): any;
  findCartById(id: number): any;
  deleteCart(id: string): any;
  updateCart(id: number, userId: number, productId: number, qty: number): any;
}

