import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createFtpUser } from 'apiSdk/ftp-users';
import { ftpUserValidationSchema } from 'validationSchema/ftp-users';
import { FtpServerInterface } from 'interfaces/ftp-server';
import { getFtpServers } from 'apiSdk/ftp-servers';
import { FtpUserInterface } from 'interfaces/ftp-user';

function FtpUserCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FtpUserInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFtpUser(values);
      resetForm();
      router.push('/ftp-users');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FtpUserInterface>({
    initialValues: {
      username: '',
      password: '',
      rights: '',
      folder_path: '',
      active: false,
      ftp_server_id: (router.query.ftp_server_id as string) ?? null,
    },
    validationSchema: ftpUserValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Ftp Users',
              link: '/ftp-users',
            },
            {
              label: 'Create Ftp User',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Ftp User
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.username}
            label={'Username'}
            props={{
              name: 'username',
              placeholder: 'Username',
              value: formik.values?.username,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.password}
            label={'Password'}
            props={{
              name: 'password',
              placeholder: 'Password',
              value: formik.values?.password,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.rights}
            label={'Rights'}
            props={{
              name: 'rights',
              placeholder: 'Rights',
              value: formik.values?.rights,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.folder_path}
            label={'Folder Path'}
            props={{
              name: 'folder_path',
              placeholder: 'Folder Path',
              value: formik.values?.folder_path,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="active" display="flex" alignItems="center" mb="4" isInvalid={!!formik.errors?.active}>
            <FormLabel htmlFor="switch-active">Active</FormLabel>
            <Switch
              id="switch-active"
              name="active"
              onChange={formik.handleChange}
              value={formik.values?.active ? 1 : 0}
            />
            {formik.errors?.active && <FormErrorMessage>{formik.errors?.active}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<FtpServerInterface>
            formik={formik}
            name={'ftp_server_id'}
            label={'Select Ftp Server'}
            placeholder={'Select Ftp Server'}
            fetcher={getFtpServers}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/ftp-users')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'ftp_user',
    operation: AccessOperationEnum.CREATE,
  }),
)(FtpUserCreatePage);
