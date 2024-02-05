import * as yup from 'yup';
import { EventTypes } from '../../entities/accountEvent';

export const createEventSchema = yup.object({
  body: yup.object({
    type: yup
    .string()
    .oneOf<EventTypes>(['deposit', 'withdraw', 'transfer'])
    .required("Tipo de evento é obrigatório."),
    destination: yup
    .string()
   ,// .required("Identificação da conta de destino é obrigatória."),
   origin: yup
   .string()
  ,// .required("Identificação da conta de origem é obrigatória."),
    amount: yup
    .number()
    .positive()
    .required("Valor do evento é obrigatório.")
  })
});
/* 
se deposito, destino obrigatirio
se withdraw origem obrigatriro
se transferencaia origem obrigatriro
 */