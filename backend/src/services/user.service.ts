import { IUserService } from '../interfaces/user/IUserService';
import { IUserRepository } from '../interfaces/user/IUserRepository';

export class UserService implements IUserService {

  private repository: IUserRepository;
  constructor(repository: IUserRepository) {
    this.repository = repository
  }
  updateUser(id: number, name: string) {
    return this.repository.update(id, name)
  }
  async createUser(input: any) {

    return this.repository.create(input)
  }
  getUser(limit: number, offset: number) {

    return this.repository.find(limit, offset)
  }
  getUserById(userId: string) {
    return this.repository.findById(userId)
  }
  deleteUserById(userId: string) {
    return this.repository.delete(userId)
  }
}
