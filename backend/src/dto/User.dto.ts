
export class CreateUserInput {
  email?: string;
  password?: string;
  resetToken?: string;
}



export class UserLoginInput {
  email?: string;
  password?: string;
}



export interface UserPayload {
  _id: string;
  email: string;
  verified: boolean;
}


export class CartItem {
  id!: string;
  unit!: number;
}
