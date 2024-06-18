import { Request, Response, NextFunction, query } from 'express';
import { IUserService } from '../interfaces/user/IUserService';
import { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } from '../utils/password';

export class UserController {
  private interactor: IUserService

  constructor(interactor: IUserService) {
    this.interactor = interactor
  }

  async onUserSignup(req: Request, res: Response, next: NextFunction) {
    try {
      const userInputs = req.body;

      const { password, id } = userInputs;
      const salt = await GenerateSalt();
      const userPassword = await GeneratePassword(password, salt);
      const existingUser = await this.interactor.getUserById(id);

      if (existingUser) {
        return res.status(400).json({ message: 'User already exist!' });
      }

      const body: any = req.body;
      body.password = userPassword;
      body.salt = salt;
      const result = await this.interactor.createUser(body);

      //Generate the Signature
      const signature = await GenerateSignature({
        _id: result._id,
        email: result.email,
        verified: result.verified
      })

      // Send the result
      return res.status(201).json({ signature, verified: result.verified, email: result.email })
    } catch (error) {
      next(error);
    }
  }

  async onUserLogin(req: Request, res: Response, next: NextFunction) {
    const userInputs = req.body;
    const { password, email, id } = userInputs;
    const user = await this.interactor.getUserById(id);
    if (user) {
      const validation = await ValidatePassword(password, user.password, user.salt);

      if (validation) {

        const signature = await GenerateSignature({
          _id: user.id,
          email: user.email,
          verified: user.verified
        })

        return res.status(200).json({
          signature,
          email: user.email,
          verified: user.verified
        })
      }
    }



  }


  async onGetUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const data = await this.interactor.getUserById(userId);
      return res.status(200).json(data);
    } catch (error) {
      next(error)

    }
  }
  async onDeleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const data = await this.interactor.deleteUserById(userId);
      return res.status(200).json(data);
    } catch (error) {
      next(error)

    }
  }


  async onGetUsers(req: Request, res: Response, next: NextFunction) {

    try {
      const offset = parseInt(`${req.query.offset}`) | 0;
      const limit = parseInt(`${req.query.limit}`) || 10;
      const data = await this.interactor.getUsers(limit, offset);
      return res.status(200).json(data);
    } catch (error) {
      next(error)

    }
  }

  async onUpdateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(`${req.query.id}`)
      const name = (`${req.query.name}`);
      const updatedData = await this.interactor.updateUser(id, name);
      return res.status(200).json(updatedData)

    } catch (error) {
      next(error);

    }
  }
}