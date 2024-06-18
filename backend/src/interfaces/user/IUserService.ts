export interface IUserService {
  createUser(userData: any): any;
  getUser(limit: number, offset: number): any;
  getUserById(id: string): any;
  deleteUserById(id: string): any;
  updateUser(id: number, name: string): any;
}

