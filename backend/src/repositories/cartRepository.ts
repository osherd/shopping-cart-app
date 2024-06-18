import { Pool } from "pg";
import { pgClient } from "../config/dbConnection";
import { ICartRepository } from '../interfaces/cart/ICartRepository';
import { Cart } from '../entities/cart';

export class CartRepository implements ICartRepository {
  private client: Pool;

  constructor() {
    this.client = pgClient();
  }

  async create({ id, userId, productId, productName, sellingPrice, stockQuantity }: Cart): Promise<Cart> {
    const cart = await this.client.query(
      `INSERT INTO cart (id,userId,productId, productName,sellingPrice,stockQuantity) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [id, userId, productId, productName, sellingPrice, stockQuantity]
    );
    return cart.rows[0];
  }
  async update(id: number, stockQuantity: number): Promise<Cart> {
    const cart = await this.client.query(
      `UPDATE cart SET stockQuantity=$1 WHERE id=$2 RETURNING *`,
      [stockQuantity, id]
    );
    return cart.rows[0];
  }
  async findById(userId: number): Promise<Cart> {

    const cart = await this.client.query(
      `SELECT * FROM cart WHERE id = $1`,
      [userId]
    );
    return cart.rows[0];
  }

  async find(limit: number, offset: number): Promise<Cart[]> {
    const users = await this.client.query(
      `SELECT * FROM cart OFFSET $1 LIMIT $2`,
      [offset, limit]
    );
    return users.rows;
  }
  async delete(cartId: string): Promise<Cart> {
    const user = await this.client.query(
      `DELETE FROM cart WHERE id = $1`,
      [cartId]
    );
    return user.rows[0];
  }
}
