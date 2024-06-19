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
        id: result.id,
        email: result.email,
      })

      // Send the result
      return res.status(201).json({ signature, email: result.email })
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async onUserLogin(req: Request, res: Response, next: NextFunction) {
    const userInputs = req.body;
    const { password, id } = userInputs;
    try {
      const user = await this.interactor.getUserById(id);
      if (user) {
        const validation = await ValidatePassword(password, user.password, user.salt);

        if (validation) {

          const signature = await GenerateSignature({
            id: user.id,
            email: user.email,
          })

          return res.status(200).json({
            signature,
            email: user.email
          })
        }
      }
    } catch (error: any) {
      res.status(500).send(error.message)
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
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async onGetUsers(req: Request, res: Response, next: NextFunction) {

    try {
      const offset = parseInt(`${req.query.offset}`) | 0;
      const limit = parseInt(`${req.query.limit}`) || 10;
      const data = await this.interactor.getUsers(limit, offset);
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async onUpdateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(`${req.query.id}`)
      const name = (`${req.query.name}`);
      const updatedData = await this.interactor.updateUser(id, name);
      return res.status(200).json(updatedData)

    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
}