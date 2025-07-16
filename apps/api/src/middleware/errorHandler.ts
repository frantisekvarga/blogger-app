import { NextFunction, Request, Response } from 'express';
import {
  ArticleException,
  AuthException,
  FileException,
  ServerException,
  ValidationException,
} from '../types/exceptions';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', error);

  if (error instanceof AuthException) {
    return res.status(error.statusCode).json({
      error: error.message,
      code: error.code,
    });
  }

  if (error instanceof ArticleException) {
    return res.status(error.statusCode).json({
      error: error.message,
      code: error.code,
    });
  }

  if (error instanceof ValidationException) {
    return res.status(error.statusCode).json({
      error: error.message,
      code: error.code,
    });
  }

  if (error instanceof FileException) {
    return res.status(error.statusCode).json({
      error: error.message,
      code: error.code,
    });
  }

  if (error instanceof ServerException) {
    return res.status(error.statusCode).json({
      error: error.message,
      code: error.code,
    });
  }

  return res.status(500).json({
    error: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR',
  });
}
