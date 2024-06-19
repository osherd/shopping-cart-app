import { Cart } from '../../entities/cart';
export interface ICartRepository {

  create(data: Cart): Promise<Cart>;
  update(id: number, userId: number, productId: number, name: number): Promise<Cart>;
  find(limit: number, offset: number): Promise<Cart[]>;
  findById(id: number): Promise<Cart>;
  delete(id: string): Promise<Cart>;
}