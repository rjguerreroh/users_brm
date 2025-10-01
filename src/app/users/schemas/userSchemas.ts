import * as Joi from 'joi';

/**
 * Schemas de validación para usuarios usando Joi
 */

// Schema para crear usuario
export const createUserSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(255)
    .trim()
    .required()
    .messages({
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede exceder 255 caracteres',
      'string.empty': 'El nombre es requerido',
      'any.required': 'El nombre es requerido'
    }),
  
  email: Joi.string()
    .email()
    .max(255)
    .trim()
    .lowercase()
    .required()
    .messages({
      'string.email': 'El email debe tener un formato válido',
      'string.max': 'El email no puede exceder 255 caracteres',
      'string.empty': 'El email es requerido',
      'any.required': 'El email es requerido'
    }),
  
  age: Joi.number()
    .integer()
    .min(1)
    .max(120)
    .required()
    .messages({
      'number.base': 'La edad debe ser un número',
      'number.integer': 'La edad debe ser un número entero',
      'number.min': 'La edad debe ser al menos 1',
      'number.max': 'La edad no puede exceder 120 años',
      'any.required': 'La edad es requerida'
    })
});

// Schema para actualizar usuario
export const updateUserSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(255)
    .trim()
    .optional()
    .messages({
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede exceder 255 caracteres'
    }),
  
  email: Joi.string()
    .email()
    .max(255)
    .trim()
    .lowercase()
    .optional()
    .messages({
      'string.email': 'El email debe tener un formato válido',
      'string.max': 'El email no puede exceder 255 caracteres'
    }),
  
  age: Joi.number()
    .integer()
    .min(1)
    .max(120)
    .optional()
    .messages({
      'number.base': 'La edad debe ser un número',
      'number.integer': 'La edad debe ser un número entero',
      'number.min': 'La edad debe ser al menos 1',
      'number.max': 'La edad no puede exceder 120 años'
    })
}).min(1).messages({
  'object.min': 'Debe proporcionar al menos un campo para actualizar'
});

// Schema para validar ID de usuario
export const userIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'El ID debe ser un número',
      'number.integer': 'El ID debe ser un número entero',
      'number.positive': 'El ID debe ser un número positivo',
      'any.required': 'El ID es requerido'
    })
});

// Schema para query parameters (paginación, filtros, etc.)
export const userQuerySchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .optional()
    .messages({
      'number.base': 'La página debe ser un número',
      'number.integer': 'La página debe ser un número entero',
      'number.min': 'La página debe ser al menos 1'
    }),
  
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .optional()
    .messages({
      'number.base': 'El límite debe ser un número',
      'number.integer': 'El límite debe ser un número entero',
      'number.min': 'El límite debe ser al menos 1',
      'number.max': 'El límite no puede exceder 100'
    }),
  
  search: Joi.string()
    .max(255)
    .trim()
    .optional()
    .messages({
      'string.max': 'El término de búsqueda no puede exceder 255 caracteres'
    }),

  name: Joi.string()
    .max(255)
    .trim()
    .optional()
    .messages({
      'string.max': 'El nombre no puede exceder 255 caracteres'
    }),

  email: Joi.string()
    .email()
    .max(255)
    .trim()
    .optional()
    .messages({
      'string.email': 'El email debe tener un formato válido',
      'string.max': 'El email no puede exceder 255 caracteres'
    }),

  ageMin: Joi.number()
    .integer()
    .min(1)
    .max(120)
    .optional()
    .messages({
      'number.base': 'La edad mínima debe ser un número',
      'number.integer': 'La edad mínima debe ser un número entero',
      'number.min': 'La edad mínima debe ser al menos 1',
      'number.max': 'La edad mínima no puede exceder 120'
    }),

  ageMax: Joi.number()
    .integer()
    .min(1)
    .max(120)
    .optional()
    .messages({
      'number.base': 'La edad máxima debe ser un número',
      'number.integer': 'La edad máxima debe ser un número entero',
      'number.min': 'La edad máxima debe ser al menos 1',
      'number.max': 'La edad máxima no puede exceder 120'
    }),
  
  sortBy: Joi.string()
    .valid('name', 'email', 'age', 'createdAt', 'updatedAt')
    .default('createdAt')
    .optional()
    .messages({
      'any.only': 'El campo de ordenamiento debe ser: name, email, age, createdAt, updatedAt'
    }),
  
  sortOrder: Joi.string()
    .valid('ASC', 'DESC')
    .default('DESC')
    .optional()
    .messages({
      'any.only': 'El orden debe ser ASC o DESC'
    })
});

// Schema específico para búsqueda avanzada
export const searchQuerySchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .optional()
    .messages({
      'number.base': 'La página debe ser un número',
      'number.integer': 'La página debe ser un número entero',
      'number.min': 'La página debe ser al menos 1'
    }),
  
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .optional()
    .messages({
      'number.base': 'El límite debe ser un número',
      'number.integer': 'El límite debe ser un número entero',
      'number.min': 'El límite debe ser al menos 1',
      'number.max': 'El límite no puede exceder 100'
    }),
  
  search: Joi.string()
    .max(255)
    .trim()
    .optional()
    .messages({
      'string.max': 'El término de búsqueda no puede exceder 255 caracteres'
    }),

  name: Joi.string()
    .max(255)
    .trim()
    .optional()
    .messages({
      'string.max': 'El nombre no puede exceder 255 caracteres'
    }),

  email: Joi.string()
    .email()
    .max(255)
    .trim()
    .optional()
    .messages({
      'string.email': 'El email debe tener un formato válido',
      'string.max': 'El email no puede exceder 255 caracteres'
    }),

  ageMin: Joi.number()
    .integer()
    .min(1)
    .max(120)
    .optional()
    .messages({
      'number.base': 'La edad mínima debe ser un número',
      'number.integer': 'La edad mínima debe ser un número entero',
      'number.min': 'La edad mínima debe ser al menos 1',
      'number.max': 'La edad mínima no puede exceder 120'
    }),

  ageMax: Joi.number()
    .integer()
    .min(1)
    .max(120)
    .optional()
    .messages({
      'number.base': 'La edad máxima debe ser un número',
      'number.integer': 'La edad máxima debe ser un número entero',
      'number.min': 'La edad máxima debe ser al menos 1',
      'number.max': 'La edad máxima no puede exceder 120'
    }),
  
  sortBy: Joi.string()
    .valid('name', 'email', 'age', 'createdAt', 'updatedAt')
    .default('createdAt')
    .optional()
    .messages({
      'any.only': 'El campo de ordenamiento debe ser: name, email, age, createdAt, updatedAt'
    }),
  
  sortOrder: Joi.string()
    .valid('ASC', 'DESC')
    .default('DESC')
    .optional()
    .messages({
      'any.only': 'El orden debe ser ASC o DESC'
    })
});

// Función helper para validar datos
export const validateUserData = (schema: Joi.ObjectSchema, data: any) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false, // Mostrar todos los errores
    stripUnknown: true, // Eliminar campos no definidos en el schema
    convert: true // Convertir tipos automáticamente
  });

  return {
    isValid: !error,
    data: value,
    error: error?.details.map(err => ({
      field: err.path.join('.'),
      message: err.message
    })) || []
  };
};
