import PropTypes from 'prop-types';
import React, { useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import { Card, Stack, Divider, Checkbox, MenuItem, IconButton, CardHeader, FormControlLabel, Button, Box, TextField } from '@mui/material';
// components
import { getDocs, query, collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db, tasksRef } from '../../auth/firebase/firebase';
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';

// ----------------------------------------------------------------------

AppTasks.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppTasks({ title, subheader, ...other }) {
  const [taskName, setTaskName] = React.useState('');
  const [open, setOpen] = useState(null);
  const [newId, setNewId] = React.useState('');
  const [role, setRole] = React.useState('');
  const [editValue, setEditValue] = React.useState('');

  // task query
  const taskQuery = query(tasksRef);
  const [tasks] = useCollectionData(taskQuery, { idField: 'id' });

  const addNewTask = async (name) => {
    await addDoc(collection(db, "tasks"), {
      id: '',
      name,
      isDone: false
    })
      .then(docRef => {
        console.log(docRef.id)
        updateTask(docRef.id, name, false)
      })
  }

  const updateTask = async (id, newName) => {
    getDocs(tasksRef)
      .then(snapshot => {
        snapshot.docs.forEach(task => {
          if (task.id === id) {
            updateDoc(doc(db, "tasks", id), {
              id,
              name: newName,
              isDone: task._document.data.value.mapValue.fields.isDone.booleanValue
            })
          }
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  const toggleTask = (id) => {
    getDocs(tasksRef)
      .then(snapshot => {
        snapshot.docs.forEach(task => {
          if (task.id === id) {
            updateDoc(doc(db, "tasks", id), {
              id: task._document.data.value.mapValue.fields.id.stringValue,
              name: task._document.data.value.mapValue.fields.name.stringValue,
              isDone: !task._document.data.value.mapValue.fields.isDone.booleanValue
            })
          }
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  const deleteTask = (id) => {
    getDocs(tasksRef)
      .then(snapshot => {
        snapshot.docs.forEach(task => {
          if (task.id === id) {
            deleteDoc(doc(db, 'tasks', id))
            setOpen(null)
          }
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  const { control } = useForm({
    defaultValues: {
      taskCompleted: ['2'],
    },
  });

  return (
    <Card {...other}>
      <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '17px 0 10px 15px' }}>
        <CardHeader title={title} subheader={subheader} sx={{ padding: '0' }} />
        <Button variant="outlined" sx={{ marginLeft: '20px', marginRight: '20px' }} onClick={() => addNewTask(taskName)}>Add Task</Button>
      </Box>
      <TextField sx={{ padding: '15px', width: '100%' }} onChange={(e) => setTaskName(e.target.value)} />
      <Controller
        name="taskCompleted"
        control={control}
        render={({ field }) => {
          const onSelected = (task) =>
            field.value.includes(task) ? field.value.filter((value) => value !== task) : [...field.value, task];

          return (
            <>
              {
                tasks?.map((task, index) => (
                  role === 'edit' && task.id === newId ? <form style={{display: 'flex', flexDirection: 'column', alignItems:'center', marginBottom: '10px'}} className='w-full' onSubmit={(e) => { 
                    e.preventDefault();
                    updateTask(task.id, editValue);
                    setRole('')
                    }}>
                    <TextField sx={{width: '95%'}} onChange={(e) => setEditValue(e.target.value)} />
                    <TextField type="submit" sx={{ display: 'none' }} />
                  </form> :
                    <TaskItem
                      key={index}
                      task={task}
                      id={task.id}
                      checked={task.isDone}
                      // onChange={() => field.onChange(onSelected(task.id))}
                      onChange={() => toggleTask(task.id)}
                      deleteTask={() => deleteTask(task.id)}
                      open={open}
                      setOpen={setOpen}
                      setNewId={setNewId}
                      newId={newId}
                      editValue={editValue}
                      setEditValue={setEditValue}
                      role={role}
                      setRole={setRole}
                    />
                ))}
            </>
          );
        }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

TaskItem.propTypes = {
  checked: PropTypes.bool,
  open: PropTypes.bool,
  id: PropTypes.string,
  setOpen: PropTypes.func,
  onChange: PropTypes.func,
  deleteTask: PropTypes.func,
  task: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  setNewId: PropTypes.func,
  editValue: PropTypes.string,
  setEditValue: PropTypes.func,
  role: PropTypes.string,
  setRole: PropTypes.func
};

function TaskItem({ task, checked, onChange, deleteTask, open, setOpen, id, setNewId, editValue, setEditValue, role, setRole }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const divRef = React.useRef();

  const handleOpenMenu = (event) => {
    setAnchorEl(divRef.current)
    setOpen(event.currentTarget);
    setNewId(id)
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setAnchorEl(null);
  };

  const handleMarkComplete = () => {
    handleCloseMenu();
    // console.log('MARK COMPLETE', task.id);
  };

  const handleShare = () => {
    handleCloseMenu();
    // console.log('SHARE', task.id);
  };

  const handleEdit = () => {
    setRole('edit');

    // console.log('EDIT', task.id);
  };

  return (
    <Stack
      ref={divRef}
      direction="row"
      sx={{
        px: 2,
        py: 0.75,
        position: 'relative',
        ...(checked && {
          color: 'text.disabled',
          textDecoration: 'line-through',
        }),
      }}
    >
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange} />}
        label={task.name}
        sx={{ flexGrow: 1, m: 0 }}
      />

      <MoreMenuButton
        open={open && task.id === id}
        onClose={handleCloseMenu}
        onOpen={handleOpenMenu}
        anchorEl={anchorEl}
        actions={
          <>
            <MenuItem onClick={handleMarkComplete}>
              <Iconify icon={'eva:checkmark-circle-2-fill'} />
              Mark Complete {task.name}
            </MenuItem>

            <MenuItem onClick={handleEdit}>
              <Iconify icon={'eva:edit-fill'} />
              Edit
            </MenuItem>

            <MenuItem onClick={handleShare}>
              <Iconify icon={'eva:share-fill'} />
              Share
            </MenuItem>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <MenuItem onClick={() => { deleteTask(task.id) }} sx={{ color: 'error.main' }}>
              <Iconify icon={'eva:trash-2-outline'} />
              Delete
            </MenuItem>
          </>
        }
      />
    </Stack>
  );
}

// ----------------------------------------------------------------------

MoreMenuButton.propTypes = {
  actions: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  anchorEl: PropTypes.object
};

function MoreMenuButton({ actions, open, onOpen, onClose, anchorEl }) {
  return (
    <>
      <IconButton size="large" color="inherit" sx={{ opacity: 0.48 }} onClick={onOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(anchorEl) && open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 'auto',
          position: 'absolute',
          top: '0',
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
            '& svg': { mr: 2, width: 20, height: 20 },
          },
        }}
      >
        {actions}
      </MenuPopover>
    </>
  );
}
