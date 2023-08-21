import * as yup from 'yup';

export const ftpUserValidationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  rights: yup.string().required(),
  folder_path: yup.string().nullable(),
  active: yup.boolean().required(),
  ftp_server_id: yup.string().nullable().required(),
});
