import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(50).required()
    .messages({
      'string.base': 'Name should be a type of text',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name should have a minimum length of {#limit}',
      'string.max': 'Name should have a maximum length of {#limit}',
      'any.required': 'Name is a required field'
    }),
  description: Joi.string().min(10).max(1000).required()
    .messages({
      'string.base': 'Description should be a type of text',
      'string.empty': 'Description cannot be empty',
      'string.min': 'Description should have a minimum length of {#limit}',
      'string.max': 'Description should have a maximum length of {#limit}',
      'any.required': 'Description is a required field'
    }),
  price: Joi.number().positive().precision(2).required()
    .messages({
      'number.base': 'Price should be a type of number',
      'number.positive': 'Price should be a positive number',
      'number.precision': 'Price should have at most {#limit} decimal places',
      'any.required': 'Price is a required field'
    }),
  category: Joi.string().valid('Electronics', 'Clothing', 'Home', 'Beauty', 'Toys', 'Sports', 'Automotive', 'Books').required()
    .messages({
      'string.base': 'Category should be a type of text',
      'any.only': 'Category must be one of {#valids}',
      'any.required': 'Category is a required field'
    }),
  tags: Joi.array().items(Joi.string().min(1).max(30)).min(1).required()
    .messages({
      'array.base': 'Tags should be an array of strings',
      'array.min': 'Tags should have at least {#limit} items',
      'string.min': 'Each tag should have a minimum length of {#limit}',
      'string.max': 'Each tag should have a maximum length of {#limit}',
      'any.required': 'Tags is a required field'
    }),
  variants: Joi.array().items(
    Joi.object({
      type: Joi.string().valid('Color', 'Size', 'Storage Capacity', 'Style').required()
        .messages({
          'string.base': 'Variant type should be a type of text',
          'any.only': 'Variant type must be one of {#valids}',
          'any.required': 'Variant type is a required field'
        }),
      value: Joi.string().min(1).max(50).required()
        .messages({
          'string.base': 'Variant value should be a type of text',
          'string.empty': 'Variant value cannot be empty',
          'string.min': 'Variant value should have a minimum length of {#limit}',
          'string.max': 'Variant value should have a maximum length of {#limit}',
          'any.required': 'Variant value is a required field'
        })
    })
  ).min(1).required()
    .messages({
      'array.base': 'Variants should be an array of objects',
      'array.min': 'Variants should have at least {#limit} items',
      'any.required': 'Variants is a required field'
    }),
  inventory: Joi.object({
    quantity: Joi.number().integer().min(0).required()
      .messages({
        'number.base': 'Quantity should be a type of number',
        'number.integer': 'Quantity should be an integer',
        'number.min': 'Quantity should be at least {#limit}',
        'any.required': 'Quantity is a required field'
      }),
    inStock: Joi.boolean().required()
      .messages({
        'boolean.base': 'InStock should be a type of boolean',
        'any.required': 'InStock is a required field'
      })
  }).required()
    .messages({
      'object.base': 'Inventory should be an object',
      'any.required': 'Inventory is a required field'
    })
});
