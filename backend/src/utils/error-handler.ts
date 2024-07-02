import { createLogger, transports } from 'winston';
import { AppError } from './app-errors';
import { Request, Response, NextFunction } from 'express';


export const LogErrors = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app_error.log' })
  ]
})



export class ErrorLogger {
  constructor() {
  }
  async logError(err: any) {
    console.log('==================== Start Error Logger ===============');
    LogErrors.log({
      private: true,
      level: 'error',
      message: `${new Date()}-${JSON.stringify(err)}`
    });
    console.log('==================== End Error Logger ===============');
    // log error with Logger plugins
    return false;

  }
  isTrustError(error: any) {
    if (error instanceof AppError) {
      return error.isOperational;
    } else {
      return false;
    }
  }
}

export const ErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {

  const errorLogger = new ErrorLogger();

  process.on('uncaughtException', (reason, promise) => {
    console.log(reason, 'UNHANDLED');
    throw reason; // need to take care
  })

  process.on('uncaughtException', (error: any) => {
    errorLogger.logError(error);
    if (errorLogger.isTrustError(err)) {
      //process exist // need restart
    }
  })
  if (err) {
    await errorLogger.logError(err);
    if (errorLogger.isTrustError(err)) {
      if (err.errorStack) {
        const errorDescription = err.errorStack;
        return res.status(err.statusCode).json({ 'message': errorDescription })
      }
      return res.status(err.statusCode).json({ 'message': err.message })
    } else {
      //process exit // terriablly wrong with flow need restart
    }
    return res.status(err.statusCode).json({ 'message': err.message })
  }
}
