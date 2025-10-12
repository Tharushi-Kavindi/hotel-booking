import ForbiddenError from "../../domain/errors/forbidden-error";
import NotFoundError from "../../domain/errors/not-found-error";
import UnauthorizedError from "../../domain/errors/unauthorized-error";
import ValidationError from "../../domain/errors/validation-error";
import { Request, Response, NextFunction } from "express";

const globalErrorHandlingMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  if (error instanceof NotFoundError) {
    return res.status(404).json({ message: error.message });
  } else if (error instanceof UnauthorizedError) {
    return res.status(401).json({ message: error.message });
  } else if (error instanceof ValidationError) {
    return res.status(400).json({ message: error.message });
  } else if (error instanceof ForbiddenError) {
    return res.status(403).json({ message: error.message });
  } else {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default globalErrorHandlingMiddleware;
