import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { CircularProgress, Stack, TextField } from '@mui/material';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../auth/firebase/firebase";
import Iconify from '../../../components/Iconify';

import CustomAlert from './CustomAlert';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, addNewData } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const [projectName, setProjectName] = React.useState('');
  const [techStack, setTechStack] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const addNewProject = async (projectName, techStack, url, description, imageUrl) => {
    await addDoc(collection(db, "projects"), {
      name: projectName,
      techStack: [...techStack],
      url,
      description,
      imageUrl
    })
      .then(res => {
        console.log("success adding project ", res);
        setIsSuccess(true);
        setShowAlert(true);
        // window.location.reload();
      })
      .catch(err => {
        console.log("error adding project : ", err);
        setIsSuccess(false);
        setShowAlert(true);
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTechStack(techStack);
    setIsLoading(true);
    setTimeout(() => {
      addNewProject(projectName, handleTechStack(techStack), url, description, imageUrl);
      addNewData();
      setIsLoading(false);
    }, 1500)
  }

  const handleTechStack = (value) => {
    const unseparated = value;
    const splitted = unseparated.split(',');

    return splitted;
  }

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth PaperProps={{
      style: {
        padding: '20px 50px 50px 50px'
      },
    }}>
      <DialogTitle sx={{ padding: "0", marginBottom: "30px" }}>Add new project</DialogTitle>
      <List sx={{ pt: 0 }}>
        {showAlert && <CustomAlert severity={isSuccess ? "success" : "error"} sx={{ marginBottom: "20px" }} onClose={() => { setShowAlert(false) }}>{isSuccess ? "Success adding project" : "Error adding project"}</CustomAlert>}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Stack>
            <TextField label="Project Name" type="text" onChange={(e) => setProjectName(e.target.value)} sx={{ marginBottom: "20px" }} required />
            <TextField label="Tech Stacks" type="text" onChange={(e) => setTechStack(e.target.value)} sx={{ marginBottom: "20px" }} required />
            <TextField label="Url" type="text" onChange={(e) => setUrl(e.target.value)} sx={{ marginBottom: "20px" }} required />
            <TextField label="Description" type="text" onChange={(e) => setDescription(e.target.value)} sx={{ marginBottom: "20px" }} required />
            <TextField label="Image URL" type="text" onChange={(e) => setImageUrl(e.target.value)} sx={{ marginBottom: "20px" }} />
          </Stack>
          {
            isLoading ? <LoadingButton variant="contained"><CircularProgress size={30} sx={{ color: "white" }} /><span style={{ marginLeft: "10px" }}>Loading</span></LoadingButton> : <Button type="submit" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>Add Project</Button>
          }
        </form>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  addNewData: PropTypes.func
};

FormDialog.propTypes = {
  addNewData: PropTypes.func
}

function FormDialog({ addNewData }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
        New Project
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        addNewData={addNewData}
      />
    </div>
  );
}

export { FormDialog }
