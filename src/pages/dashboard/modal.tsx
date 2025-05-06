import { doc, deleteDoc } from 'firebase/firestore';
import { useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { queryKeys } from 'src/utils/queryKeys';

import { DB } from 'src/auth/context/FirebaseContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  Height: 200,
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};
type PropDelete = {
  open: boolean;
  onclose: () => void;
  data: any;
};

export default function Delete({ open, onclose, data }: PropDelete) {
  const queryClient = useQueryClient();
  async function deleteUser(id: string) {
    try {
      // const url = `http://localhost:3000/tasks/${id}`;
      // await fetch(url, { method: 'delete' });
      await deleteDoc(doc(DB, `tasks/${data.id}`));
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
      onclose();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Modal open={open} onClose={onclose}>
      <Box sx={style}>
        <Typography>Are you sure,you want to delete your data</Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end', p: 3 }}>
          <Button variant="outlined" onClick={onclose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={() => deleteUser(data.id)}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
