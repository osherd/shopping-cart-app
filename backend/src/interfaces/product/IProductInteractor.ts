export interface IProductInteractor {
  createProduct(input: any): any;
  getProduct(limit: number, offset: number): any;
  getProductById(productId: string): any;
  deleteProductById(productId: string): any;
  updateStock(id: number, stock: number): any;
}

