import { Pool } from "pg";
import { pgClient } from "../config/dbConnection";
import { ICartRepository } from '../interfaces/cart/ICartRepository';
import { Cart } from '../entities/cart';

export class CartRepository implements ICartRepository {
  private client: Pool;

  constructor() {
    this.client = pgClient();
  }

  async create({ id, userId, productId, stockQuantity }: Cart): Promise<Cart> {
    // when we add a product to a cart we remove its quantity and doing it atomically via DB transactions

    try {
      await this.client.query('BEGIN');
      await this.client.query(
        `UPDATE products SET stockQuantity=stockQuantity-$2 WHERE id=$1`,
        [productId, stockQuantity]
      )
      const cart = await this.client.query(
        `INSERT INTO cart (id,userId,productId,stockQuantity) VALUES ($1,$2,$3,$4) RETURNING *`,
        [id, userId, productId, stockQuantity]
      );
      await this.client.query('COMMIT')
      return cart.rows[0];
    } catch (err: any) {
      await this.client.query('ROLLBACK')
      throw err
    }

  }
  async update(id: string, userId: number, productId: number, stockQuantity: number): Promise<Cart> {
    // when we update a product quantity in a cart we remove its quantity and doing it atomically via DB transactions

    try {
      await this.client.query('BEGIN');
      const amountCurrentlyHaveInCartRaw = await this.client.query(
        `SELECT stockQuantity from cart WHERE id=$1 AND userId=$2 AND productId=$3`,
        [id, userId, productId]
      )
      const amountCurrentlyHaveInCart = amountCurrentlyHaveInCartRaw.rows[0];
      const quantityDiff = stockQuantity - amountCurrentlyHaveInCart

      await this.client.query(
        `UPDATE products SET stockQuantity=stockQuantity-$2 WHERE id=$1`,
        [productId, quantityDiff]
      )
      const cart = await this.client.query(
        `UPDATE cart SET stockQuantity=$4 WHERE id=$1 AND userId=$2 AND productId=$3 RETURNING *`,
        [id, userId, productId, stockQuantity]
      );
      await this.client.query('COMMIT')
      return cart.rows[0];
    } catch (err: any) {
      await this.client.query('ROLLBACK')
      throw err
    }
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
