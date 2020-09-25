declare namespace Express {
  export interface Request {
    user: Object<{
      id: string;
    }>;
  }
}
