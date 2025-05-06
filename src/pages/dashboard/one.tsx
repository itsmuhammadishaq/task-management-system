import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { Box, Button, Container, Typography } from '@mui/material';

import useData from 'src/hooks/useData';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';

import { TaskCard } from './TaskCard';
import ClickButton from './clickButton';

// ----------------------------------------------------------------------

const metadata = { title: `Page one | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const [open, setOpen] = useState(false);

  const { data } = useData();

  // @ts-ignore
  console.log(data?.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', px: 2 }}>
        <Typography variant="h3"> Task Management</Typography>
        <Button size="small" variant="contained" onClick={handleOpen}>
          <Iconify icon="ic:round-plus" />
          Add Task
        </Button>
        <ClickButton open={open} handleClose={handleClose} />
      </Box>
      <Container>
        <Box sx={{ display: 'flex', gap: '23px' }}>
          {data
            // @ts-ignore
            ?.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))

            .map((item, key) => <TaskCard key={key} item={item} />)}
        </Box>
      </Container>
    </>
  );
}
