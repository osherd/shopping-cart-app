import { ICartService } from '../interfaces/cart/ICartService';
import { ICartRepository } from '../interfaces/cart/ICartRepository';

export class CartService implements ICartService {

  private repository: ICartRepository;
  constructor(repository: ICartRepository) {
    this.repository = repository
  }
  async createCart(cartData: any) {
    return this.repository.create(cartData)
  }
  async findCart(limit: number, offset: number) {
    return this.repository.find(limit, offset)
  }
  async findCartById(id: number) {
    return this.repository.findById(id)

  }

  async updateCart(id: number, qty: number) {
    return this.repository.update(id, qty)
  }

  async deleteCart(id: string) {
    return this.repository.delete(id)
  }
  async editCart(id: number, qty: number) {
    return this.repository.update(id, qty)
  }
}
