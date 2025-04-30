import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Checkbox, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import { Iconify } from 'src/components/iconify';
import Delete from './modal';
import ClickButton from './clickButton';

// ----------------------------------------------------------------------

export function TaskCard({ item }: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  return (
    <Card sx={{ p: 1, width: '250px' }}>
      <Box
        sx={{
          gap: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'left', gap: 1 }}>
          <Checkbox
            checkedIcon={<CheckCircleIcon />}
            icon={<CircleOutlinedIcon />}
            sx={{
              height: 25,
              width: 20,
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'self-start',
            }}
          >
            <Typography>{item.name}</Typography>
            <Typography
              sx={{
                color: 'gray',
                fontSize: 10,
                display: 'flex',
                justifySelf: 'left',
              }}
            >
              <Iconify icon="uiw:date" sx={{ width: 18, pb: 1 }} />
              {new Date(item.dueDate).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ font: '10px' }}>{item.description}</Box>

        <Box sx={{ display: 'flex', gap: '23px', width: '100%' }}>
          <Box sx={{ gap: 2, display: 'flex' }}>
            <Button
              onClick={handleOpenEdit}
              variant="contained"
              size="small"
              color="info"
              startIcon={<Iconify icon="material-symbols:edit-outline" />}
            >
              Edit
            </Button>

            <ClickButton data={item} open={openEdit} handleClose={handleCloseEdit} />
          </Box>

          <Button
            onClick={handleOpen}
            startIcon={<Iconify icon="material-symbols:delete-outline" />}
            variant="contained"
            size="small"
            color="error"
          >
            Delete
          </Button>
          <Delete open={open} onclose={handleClose} data={item} />
        </Box>
      </Box>
    </Card>
  );
}
