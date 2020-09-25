import AppError from '@common/errors/AppError';
import auth from '@config/auth';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  master: boolean;
  iat: number;
  exp: number;
  sub: string;
}

export default function masterAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): void {
  let errorMessage = 'You must be have authenticated';
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(errorMessage, 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decode = verify(token, auth.jwt.secret);

    const { master, sub } = decode as TokenPayload;

    if (!master) {
      errorMessage = "You don't have permission";
      throw new Error();
    }

    request.user = {
      id: sub,
    };

    next();
  } catch {
    throw new AppError(errorMessage, 401);
  }
}
