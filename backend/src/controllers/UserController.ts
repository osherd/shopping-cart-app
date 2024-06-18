import { Request, Response, NextFunction, query } from 'express';
import { IUserInteractor } from '../interfaces/user/IUserInteractor';

export class UserController {
  private interactor: IUserInteractor

  constructor(interactor: IUserInteractor) {
    this.interactor = interactor
  }
  async onCreateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const data = await this.interactor.createUser(body);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async onGetUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const data = await this.interactor.deleteUserById(userId);
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
      const data = await this.interactor.getUser(limit, offset);
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