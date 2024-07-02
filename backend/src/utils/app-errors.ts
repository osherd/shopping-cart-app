export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
}

export const Internal_Server_Error = 'Internal Server Error'

export class AppError extends Error {

  statusCode: any;
  description: string | undefined;
  isOperational: any;
  errorStack: any;
  logingErrorResponse: any

  constructor(name: string, statusCode: any, description: string | undefined, isOperational: any, errorStack: any, logingErrorResponse: any) {

    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.description = description;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logingErrorResponse = logingErrorResponse;
  }
}

//api Specific Errors
export class APIError extends AppError {

  constructor(name: string, statusCode = STATUS_CODES.INTERNAL_ERROR, description = Internal_Server_Error, isOperational = true, errorStack: any, logingErrorResponse: any) {
    super(name, statusCode, description, isOperational, errorStack, logingErrorResponse);
  }
}

//400
export class BadRequestError extends AppError {
  constructor(description = 'Bad request', logingErrorResponse: any) {
    super('NOT FOUND', STATUS_CODES.BAD_REQUEST, description, true, false, logingErrorResponse);
  }
}

//400
export class ValidationError extends AppError {
  constructor(description = 'Validation Error', errorStack: any, logingErrorResponse: any) {
    super('BAD REQUEST', STATUS_CODES.BAD_REQUEST, description, true, errorStack, logingErrorResponse);
  }
}

