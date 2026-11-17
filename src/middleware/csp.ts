import { Request, Response, NextFunction } from "express";

export function cspMiddleware(req: Request, res: Response, next: NextFunction) {
  res.setHeader(
    "Content-Security-Policy",
    `default-src 'self'; ` +
      `frame-src 'self' vkvideo.ru youtube.com vimeo.com; ` +
      `script-src 'self' 'unsafe-inline' 'unsafe-eval'; ` +
      `style-src 'self' 'unsafe-inline'; ` +
      `img-src 'self' data:;`,
  );
  next();
}
