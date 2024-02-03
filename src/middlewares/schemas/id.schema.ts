import * as yup from 'yup';

export const checkAccountId = yup.object({
  query: yup.object({
    account_id: yup
    .number()
    .positive()
    .required("Identificação da conta é obrigatória.")
  })
});