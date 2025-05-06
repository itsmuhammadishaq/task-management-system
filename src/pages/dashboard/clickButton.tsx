import * as yup from 'yup';
import * as React from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { doc, addDoc, updateDoc, collection } from 'firebase/firestore';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';

import { queryKeys } from 'src/utils/querykeys';

import { Form, RHFTextField } from 'src/components/hook-form';
import { RHFSelect } from 'src/components/hook-form/rhf-select';
import { RHFDatePicker } from 'src/components/hook-form/rhf-date-picker';

import { DB } from 'src/auth/context/FirebaseContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
type propsAdd = {
  open: boolean;
  data?: any;
  handleClose: () => void;
};

export default function ClickButton({ open, data, handleClose }: propsAdd) {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const schema = yup.object().shape({
    name: yup.string().required('name is required'),
    status: yup.string().required('status is required'),
    description: yup.string().required('Description is required'),
    dueDate: yup.date().required('Due Date is required').nullable(),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      status: data?.status || '',
      description: data?.description || '',
      name: data?.name || '',
      dueDate: null,
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  React.useEffect(() => {
    reset({
      status: data?.status || '',
      description: data?.description || '',
      name: data?.name || '',
      dueDate: data?.dueDate || null,
    });
  }, [data, reset]);

  async function submitform(values: any) {
    try {
      if (!data?.id) {
        // const url = `http://localhost:3000/tasks/${data.id}`;
        // const response = await fetch(url, { method: 'PUT', body: JSON.stringify(values) });
        // await response.json();
        const { dueDate, ...rest } = values;

        const docRef = await addDoc(collection(DB, 'tasks'), {
          ...rest,
          dueDate: new Date(dueDate).toLocaleDateString(),
        });
        console.log(docRef.id);

        enqueueSnackbar({ message: 'Task Added Successfully', variant: 'success' });
        queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
      } else {
        // const url = 'http://localhost:3000/tasks';
        // const response = await fetch(url, { method: 'POST', body: JSON.stringify(values) });
        // await response.json();
        const washingtonRef = doc(DB, `tasks/${data.id}`);
        console.log(data.id);
        await updateDoc(washingtonRef, {
          ...values,
        });

        enqueueSnackbar({ message: 'Task Added Successfully', variant: 'success' });
        queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar({ message: 'Operation Failed', variant: 'error' });
    } finally {
      reset();
      handleClose();
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Form methods={methods} onSubmit={handleSubmit(submitform)}>
          <RHFTextField name="name" label="Title" sx={{ my: 1 }} />

          <RHFTextField name="description" label="Description" sx={{ my: 1 }} />

          <RHFSelect name="status" label="Status" sx={{ my: 1 }}>
            <MenuItem value="to do">To Do</MenuItem>
            <MenuItem value="in Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Complete</MenuItem>
          </RHFSelect>

          <RHFDatePicker name="dueDate" label="Due Date" sx={{ my: 1 }} disablePast />

          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'end' }}>
            <Button onClick={handleClose} variant="outlined">
              cancel
            </Button>
            <LoadingButton loading={isSubmitting} type="submit" variant="contained">
              {data ? 'Update' : 'Submit'}
            </LoadingButton>
          </Box>
        </Form>
      </Box>
    </Modal>
  );
}
