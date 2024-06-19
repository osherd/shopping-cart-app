export class Product {
  constructor(
    public readonly sku: string,
    public readonly name: string,
    public readonly sellingPrice: number,
    public readonly stockQuantity: number,
    public readonly expirationDate: Date,
    public readonly id: string,
  ) { }
}
