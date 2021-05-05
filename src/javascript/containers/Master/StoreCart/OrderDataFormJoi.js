// ---Dependencys
import Joi from 'joi';
// ---Other
import { invalidMessages, validateSchema } from 'Others/joi-stuff';

// ---schema JS File
export const messagesSchema = {
  concepto: {
    status: 'success',
    message: invalidMessages.optional
  },
  cantidad: {
    status: 'success',
    message: invalidMessages.isNumber
  },
  notaVenta: {
    status: 'success',
    message: invalidMessages.optional
  },
  metodoPago: {
    status: 'success',
    message: invalidMessages.isRequired
  },
  montoCliente: {
    status: 'success',
    message: invalidMessages.isNumber
  },
  correo: {
    status: 'success',
    message: invalidMessages.optional
  },
  nombre: {
    status: 'success',
    message: invalidMessages.optional
  },
  apellido: {
    status: 'success',
    message: invalidMessages.optional
  },
  telefono: {
    status: 'success',
    message: invalidMessages.isNumber
  }
};

export function joiFormValidate(formData) {
  const schema = Joi.object({
    concepto: Joi.string().allow(''),
    cantidad: Joi.number(),
    notaVenta: Joi.string().allow(''),
    metodoPago: Joi.string().required(),
    montoCliente: Joi.number().min(0),
    correo: Joi.string().allow(''),
    nombre: Joi.string().allow(''),
    apellido: Joi.string().allow(''),
    telefono: Joi.number()
  });
  return validateSchema(schema, formData, messagesSchema);
}
