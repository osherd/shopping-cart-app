export interface IUserService {
  createUser(userData: any): any;
  getUsers(limit: number, offset: number): any;
  getUserById(id: string): any;
  deleteUserById(id: string): any;
  updateUser(id: number, data: any): any;
}

