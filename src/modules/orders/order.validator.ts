import Joi from 'joi';

export const orderSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.base': 'Email should be a type of text',
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is a required field'
    }), 
  productId: Joi.string().hex().length(24).required()
    .messages({
      'string.base': 'Product ID should be a type of text',
      'string.hex': 'Product ID must be a valid hexadecimal string',
      'string.length': 'Product ID must be exactly {#limit} characters long',
      'any.required': 'Product ID is a required field'
    }), 
  price: Joi.number().positive().precision(2).required()
    .messages({
      'number.base': 'Price should be a type of number',
      'number.positive': 'Price should be a positive number',
      'number.precision': 'Price should have at most {#limit} decimal places',
      'any.required': 'Price is a required field'
    }),
  quantity: Joi.number().integer().min(1).required()
    .messages({
      'number.base': 'Quantity should be a type of number',
      'number.integer': 'Quantity should be an integer',
      'number.min': 'Quantity should be at least {#limit}',
      'any.required': 'Quantity is a required field'
    })
});
