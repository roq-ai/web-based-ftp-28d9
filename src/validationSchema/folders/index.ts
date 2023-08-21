import * as yup from 'yup';

export const folderValidationSchema = yup.object().shape({
  name: yup.string().required(),
  path: yup.string().nullable(),
  size: yup.number().integer().nullable(),
  last_modified: yup.date().required(),
  ftp_user_id: yup.string().nullable().required(),
});
