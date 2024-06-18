import { IProductInteractor } from '../interfaces/product/IProductInteractor';
import { IProductRepository } from '../interfaces/product/IProductRepository';

export class ProductInteractor implements IProductInteractor {

  private repository: IProductRepository;
  constructor(repository: IProductRepository) {
    this.repository = repository
  }
  async createProduct(input: any) {

    return this.repository.create(input)
  }
  getProduct(limit: number, offset: number) {

    return this.repository.find(limit, offset)
  }
  getProductById(productId: string) {

    return this.repository.findById(productId)
  }
  deleteProductById(productId: string) {
    return this.repository.delete(productId)
  }
  updateStock(id: number, stock: number) {

    return this.repository.update(id, stock)
  }

}