import AppError from '@common/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default function errorHandling(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response | null {
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
}
