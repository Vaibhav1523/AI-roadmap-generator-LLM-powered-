import { Request, Response } from 'express';
import { authService } from './auth.service';
import { sendSuccess } from '../utils/apiResponse';
import { env } from '../config/env';

function getCookieOptions(maxAge: number) {
  const options: Record<string, unknown> = {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: 'lax',
    maxAge,
  };
  if (env.COOKIE_DOMAIN && env.COOKIE_DOMAIN !== 'localhost') {
    options.domain = env.COOKIE_DOMAIN;
  }
  return options;
}

function setTokenCookies(res: Response, accessToken: string, refreshToken: string): void {
  const refreshMaxAge = 7 * 24 * 60 * 60 * 1000;
  const accessMaxAge = 15 * 60 * 1000;

  res.cookie('accessToken', accessToken, getCookieOptions(accessMaxAge));
  res.cookie('refreshToken', refreshToken, getCookieOptions(refreshMaxAge));
}

function clearTokenCookies(res: Response): void {
  const options = getCookieOptions(0);
  res.clearCookie('accessToken', options);
  res.clearCookie('refreshToken', options);
}

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const result = await authService.register(req.body);
    setTokenCookies(res, result.accessToken, result.refreshToken);
    sendSuccess(res, { user: result.user, accessToken: result.accessToken, refreshToken: result.refreshToken }, 'Registration successful', 201);
  }

  async login(req: Request, res: Response): Promise<void> {
    const result = await authService.login(req.body);
    setTokenCookies(res, result.accessToken, result.refreshToken);
    sendSuccess(res, { user: result.user, accessToken: result.accessToken, refreshToken: result.refreshToken }, 'Login successful');
  }

  async refresh(req: Request, res: Response): Promise<void> {
    const refreshToken = req.body.refreshToken ?? req.cookies?.refreshToken;
    const tokens = await authService.refresh(refreshToken);
    setTokenCookies(res, tokens.accessToken, tokens.refreshToken);
    sendSuccess(res, tokens, 'Token refreshed');
  }

  async logout(req: Request, res: Response): Promise<void> {
    const refreshToken = req.body.refreshToken ?? req.cookies?.refreshToken;
    await authService.logout(refreshToken, req.user?.id);
    clearTokenCookies(res);
    sendSuccess(res, null, 'Logged out successfully');
  }

  async verifyEmail(req: Request, res: Response): Promise<void> {
    const result = await authService.verifyEmail(req.body.token);
    sendSuccess(res, result);
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    const result = await authService.forgotPassword(req.body.email);
    sendSuccess(res, result);
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    const result = await authService.resetPassword(req.body.token, req.body.password);
    sendSuccess(res, result);
  }
}

export const authController = new AuthController();
