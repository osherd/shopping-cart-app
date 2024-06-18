export interface ICartInteractor {
  createCart(cartData: any): any;
  findCart(limit: number, offset: number): any;
  findCartById(id: number): any;
  deleteCart(id: string): any;
  updateCart(id: number, qty: number): any;

}

