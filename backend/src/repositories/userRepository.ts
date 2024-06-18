import { Pool } from "pg";
import { pgClient } from "../config/dbConnection";
import { IUserRepository } from '../interfaces/user/IUserRepository';
import { User } from '../entities/User';

export class UserRepository implements IUserRepository {
  private client: Pool;

  constructor() {
    this.client = pgClient();
  }

  async create({ email, password, id, resetToken, resetTokenExpiration }: User): Promise<User> {
    const user = await this.client.query(
      `INSERT INTO users (id, email,password,resetToken,resetTokenExpiration) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [id, email, password, resetToken, resetTokenExpiration]
    );
    return user.rows[0];
  }
  async update(userId: number, email: string): Promise<User> {
    const user = await this.client.query(
      `UPDATE users SET email=$1 WHERE id=$2 RETURNING *`,
      [email, userId]
    );
    return user.rows[0];
  }
  async findById(userId: string): Promise<User> {

    const users = await this.client.query(
      `SELECT * FROM Users WHERE id = $1`,
      [userId]
    );
    return users.rows[0];
  }

  async find(limit: number, offset: number): Promise<User[]> {
    const users = await this.client.query(
      `SELECT * FROM users OFFSET $1 LIMIT $2`,
      [offset, limit]
    );
    return users.rows;
  }
  async delete(userId: string): Promise<User> {
    const user = await this.client.query(
      `DELETE FROM users WHERE id = $1`,
      [userId]
    );
    return user.rows[0];
  }
}
