export interface IProductService {
  createProduct(input: any): any;
  getProduct(limit: number, offset: number): any;
  getProductById(productId: string): any;
  deleteProductById(productId: string): any;
}

