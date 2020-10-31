import { Express } from 'express';

export interface AuthResponse {
  message: string;
  user: Express.User;
}
