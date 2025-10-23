import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error", err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Invalid request payload",
      details: err.flatten()
    });
  }

  if (err.status && err.message) {
    return res.status(err.status).json({
      message: err.message,
      code: err.code
    });
  }

  return res.status(500).json({
    message: "Internal server error"
  });
};
