export class Cart {
  constructor(
    public readonly userId: string,
    public readonly productId: string,
    public readonly productName: string,
    public readonly stockQuantity: number,
    public readonly sellingPrice: number,
    public readonly id?: string,

  ) { }
}
