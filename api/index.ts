import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../backend/src/app';
import { connectDatabase } from '../backend/src/database/prisma';

const app = createApp();
let isDbConnected = false;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isDbConnected) {
    try {
      await connectDatabase();
      isDbConnected = true;
    } catch (err) {
      console.error('Database connection error in Vercel function:', err);
    }
  }

  return app(req, res);
}
