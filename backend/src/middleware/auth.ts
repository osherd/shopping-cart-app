import { Request, Response, NextFunction } from 'express';
import { ValidateSignature } from '../utils/password';

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {

  const signature = await ValidateSignature(req);
  if (signature) {
    return next()
  } else {
    return res.json({ message: "User Not authorised" });
  }
}