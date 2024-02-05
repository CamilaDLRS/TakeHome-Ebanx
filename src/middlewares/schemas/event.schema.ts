import * as yup from 'yup';
import { EventTypes } from '../../entities/accountEvent';

export const createEventSchema = yup.object({
  body: yup.object({
    type: yup
    .string()
    .oneOf<EventTypes>(['deposit', 'withdraw', 'transfer'])
    .required("Tipo de evento é obrigatório."),
    destination: yup
    .string(),
   origin: yup
   .string(),
    amount: yup
    .number()
    .positive()
    .required("Valor do evento é obrigatório.")
  })
});