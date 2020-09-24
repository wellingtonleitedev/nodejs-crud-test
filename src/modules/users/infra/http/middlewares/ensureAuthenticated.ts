import AppError from '@common/errors/AppError';
import auth from '@config/auth';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('You must be have authenticated', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decode = verify(token, auth.jwt.secret);

    const { sub } = decode as TokenPayload;

    request.user = {
      id: sub,
    };

    next();
  } catch {
    throw new AppError('You must be have authenticated', 401);
  }
}
