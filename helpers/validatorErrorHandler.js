import { validationResult } from "express-validator";

const validatorErrorHandler = (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) next();
  else
    res.status(400).json({
      bodyValidationErrors: error.array({ onlyFirstError: true }),
    });
};

export default validatorErrorHandler;
