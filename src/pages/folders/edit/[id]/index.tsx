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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getFolderById, updateFolderById } from 'apiSdk/folders';
import { folderValidationSchema } from 'validationSchema/folders';
import { FolderInterface } from 'interfaces/folder';
import { FtpUserInterface } from 'interfaces/ftp-user';
import { getFtpUsers } from 'apiSdk/ftp-users';

function FolderEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<FolderInterface>(
    () => (id ? `/folders/${id}` : null),
    () => getFolderById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: FolderInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateFolderById(id, values);
      mutate(updated);
      resetForm();
      router.push('/folders');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<FolderInterface>({
    initialValues: data,
    validationSchema: folderValidationSchema,
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
              label: 'Folders',
              link: '/folders',
            },
            {
              label: 'Update Folder',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Folder
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
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
            error={formik.errors.path}
            label={'Path'}
            props={{
              name: 'path',
              placeholder: 'Path',
              value: formik.values?.path,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Size"
            formControlProps={{
              id: 'size',
              isInvalid: !!formik.errors?.size,
            }}
            name="size"
            error={formik.errors?.size}
            value={formik.values?.size}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('size', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="last_modified" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Last Modified
            </FormLabel>
            <DatePicker
              selected={formik.values?.last_modified ? new Date(formik.values?.last_modified) : null}
              onChange={(value: Date) => formik.setFieldValue('last_modified', value)}
            />
          </FormControl>
          <AsyncSelect<FtpUserInterface>
            formik={formik}
            name={'ftp_user_id'}
            label={'Select Ftp User'}
            placeholder={'Select Ftp User'}
            fetcher={getFtpUsers}
            labelField={'username'}
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
              onClick={() => router.push('/folders')}
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
    entity: 'folder',
    operation: AccessOperationEnum.UPDATE,
  }),
)(FolderEditPage);
