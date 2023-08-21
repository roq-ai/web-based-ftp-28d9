import * as yup from 'yup';

export const ftpServerValidationSchema = yup.object().shape({
  name: yup.string().required(),
  ip_address: yup.string().required(),
  port: yup.number().integer().required(),
  username: yup.string().nullable(),
  password: yup.string().nullable(),
  organization_id: yup.string().nullable().required(),
});
