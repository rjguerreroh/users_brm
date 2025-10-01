import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { validateUserData } from '../schemas/userSchemas';

/**
 * Middleware de validación genérico
 */
export const validate = (schema: Joi.ObjectSchema, source: 'body' | 'params' | 'query' = 'body') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = source === 'body' ? req.body : 
                 source === 'params' ? req.params : 
                 req.query;

    const validation = validateUserData(schema, data);

    if (!validation.isValid) {
      res.status(400).json({
        success: false,
        error: 'Datos de validación inválidos',
        details: validation.error
      });
      return;
    }

    // Reemplazar los datos originales con los datos validados y limpiados
    if (source === 'body') {
      req.body = validation.data;
    } else if (source === 'params') {
      req.params = validation.data;
    } else {
      req.query = validation.data;
    }

    next();
  };
};

/**
 * Middleware específico para validar creación de usuario
 */
export const validateCreateUser = validate;

/**
 * Middleware específico para validar actualización de usuario
 */
export const validateUpdateUser = validate;

/**
 * Middleware específico para validar ID de usuario
 */
export const validateUserId = validate;

/**
 * Middleware específico para validar query parameters
 */
export const validateUserQuery = validate;
