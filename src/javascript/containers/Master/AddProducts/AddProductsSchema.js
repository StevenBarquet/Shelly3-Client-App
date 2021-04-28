// ---Dependencys
import Joi from 'joi';
// ---Other
import { invalidMessages, validateSchema } from 'Others/joi-stuff';

// ---schema JS File
export const messagesSchema = {
  _id: {
    status: 'success',
    message: 'Ingresa un ID válido'
  },
  marca: {
    status: 'success',
    message: invalidMessages.optional
  },
  nombre: {
    status: 'success',
    message: invalidMessages.isString
  },
  imagesCover: {
    status: 'success',
    message: invalidMessages.isString
  },
  imagesExtra1: {
    status: 'success',
    message: invalidMessages.optional
  },
  imagesExtra2: {
    status: 'success',
    message: invalidMessages.optional
  },
  imagesExtra3: {
    status: 'success',
    message: invalidMessages.optional
  },
  imagesMini: {
    status: 'success',
    message: invalidMessages.optional
  },
  costo: {
    status: 'success',
    message: invalidMessages.isNumber
  },
  precioPlaza: {
    status: 'success',
    message: invalidMessages.isNumber
  },
  precioOnline: {
    status: 'success',
    message: invalidMessages.isNumber
  },
  disponibles: {
    status: 'success',
    message: invalidMessages.isNumber
  },
  online: {
    status: 'success',
    message: invalidMessages.isRequired
  },
  nuevo: {
    status: 'success',
    message: invalidMessages.isRequired
  },
  descripcion: {
    status: 'success',
    message: invalidMessages.optional
  },
  estetica: {
    status: 'success',
    message: invalidMessages.optional
  },
  categoria: {
    status: 'success',
    message: invalidMessages.isString
  },
  subcategoria: {
    status: 'success',
    message: invalidMessages.optional
  },
  descuento: {
    status: 'success',
    message: invalidMessages.notEmptySelect
  }
};

export function joiFormValidate(formData) {
  const schema = Joi.object({
    _id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    marca: Joi.string().optional(),
    nombre: Joi.string().required(),
    imagesCover: Joi.string().required(),
    imagesExtra1: Joi.string().optional(),
    imagesExtra2: Joi.string().optional(),
    imagesExtra3: Joi.string().optional(),
    imagesMini: Joi.string().optional(),
    costo: Joi.number().required(),
    precioPlaza: Joi.number().required(),
    precioOnline: Joi.number().required(),
    disponibles: Joi.number().required(),
    online: Joi.boolean().required(),
    nuevo: Joi.boolean().required(),
    descripcion: Joi.string().optional(),
    estetica: Joi.string().optional(),
    categoria: Joi.string().required(),
    subcategoria: Joi.string().optional(),
    descuento: Joi.number()
      .min(0)
      .max(99)
      .required()
  });
  return validateSchema(schema, formData, messagesSchema);
}
