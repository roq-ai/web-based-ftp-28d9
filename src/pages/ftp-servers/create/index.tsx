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

import { createFtpServer } from 'apiSdk/ftp-servers';
import { ftpServerValidationSchema } from 'validationSchema/ftp-servers';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { FtpServerInterface } from 'interfaces/ftp-server';

function FtpServerCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FtpServerInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFtpServer(values);
      resetForm();
      router.push('/ftp-servers');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FtpServerInterface>({
    initialValues: {
      name: '',
      ip_address: '',
      port: 0,
      username: '',
      password: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: ftpServerValidationSchema,
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
              label: 'Ftp Servers',
              link: '/ftp-servers',
            },
            {
              label: 'Create Ftp Server',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Ftp Server
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.ip_address}
            label={'Ip Address'}
            props={{
              name: 'ip_address',
              placeholder: 'Ip Address',
              value: formik.values?.ip_address,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Port"
            formControlProps={{
              id: 'port',
              isInvalid: !!formik.errors?.port,
            }}
            name="port"
            error={formik.errors?.port}
            value={formik.values?.port}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('port', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

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

          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
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
              onClick={() => router.push('/ftp-servers')}
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
    entity: 'ftp_server',
    operation: AccessOperationEnum.CREATE,
  }),
)(FtpServerCreatePage);
