
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
  id: string;
  email: string;
  verified: boolean;
}


export class CartItem {
  id!: string;
  stockQuantity!: number;
}
