import * as yup from 'yup';

const validOrderKeys = ['deposit', 'withdraw'];

export const createEventSchema = yup.object({
  body: yup.object({
    type: yup
    .string()
    .oneOf(validOrderKeys)
    .required("Tipo de evento é obrigatório."),
    destination: yup
    .string()
    .required("Identificação da conta de destino é obrigatória."),
    amount: yup
    .number()
    .positive()
    .required("Valor do evento é obrigatório.")
  })
});