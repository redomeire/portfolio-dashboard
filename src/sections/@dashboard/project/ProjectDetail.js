import React from "react";
import PropTypes from 'prop-types';
import { Box, Button, CircularProgress, Dialog, DialogTitle, List, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../auth/firebase/firebase";
import CustomAlert from "./CustomAlert";
import Iconify from "../../../components/Iconify";
import DeleteConfirmation from "./DeleteConfirmation";

ProjectDetail.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    techStack: PropTypes.array,
    url: PropTypes.string,
    id: PropTypes.string,
    open: PropTypes.bool,
    setOpen: PropTypes.func
};

function ProjectDetail({ id, name, description, techStack, url, open, setOpen }) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [newName, setName] = React.useState(name);
    const [newDescription, setDescription] = React.useState(description);
    const [newUrl, setUrl] = React.useState(url);
    const [newTechStack, setTechStack] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);


    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const ref = doc(db, "projects", id);
        updateDoc(ref, {
            "name": newName,
            "techStack": newTechStack,
            "url": newUrl,
            "description": newDescription
        })
            .then(res => {
                console.log(res);
                setIsSuccess(true);
                setIsLoading(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1500)
            })
            .catch(err => {
                setIsSuccess(false);
                setIsLoading(false);
                console.log(err)
            })
    }

    const handleTechStack = (arr) => {
        setTechStack(arr.split(','))
    }

    const handleDelete = async () => {
        await deleteDoc(doc(db, "projects", id))
            .then(res => {
                console.log("success delete : ", res);
                window.location.reload();
            })
            .catch(err => {
                console.log("error from delete : ", err);
            })
    }

    return (
        <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth PaperProps={{
            style: {
                padding: '20px 50px 50px 50px'
            },
        }}>
            <DialogTitle sx={{ padding: "0", marginBottom: "30px" }}>Edit Existing Project</DialogTitle>
            <List sx={{ pt: 0 }}>
                {showAlert && <CustomAlert severity={isSuccess ? "success" : "error"} sx={{ marginBottom: "20px" }} onClose={() => { setShowAlert(false) }}>{isSuccess ? "Success adding project" : "Error adding project"}</CustomAlert>}
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Stack>
                        <TextField label="Project Name" type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} sx={{ marginBottom: "20px" }} required />
                        <TextField label="Tech Stacks" type="text" defaultValue={techStack} onChange={(e) => handleTechStack(e.target.value)} sx={{ marginBottom: "20px" }} required />
                        <TextField label="Url" type="text" defaultValue={url} onChange={(e) => setUrl(e.target.value)} sx={{ marginBottom: "20px" }} required />
                        <TextField label="Description" type="text" defaultValue={description} onChange={(e) => setDescription(e.target.value)} sx={{ marginBottom: "20px" }} required />
                    </Stack>
                    {
                        isLoading ? 
                            <Box> 
                                <LoadingButton variant="contained">
                                    <CircularProgress size={30} sx={{ color: "white" }} /><span style={{ marginLeft:    "10px" }}>Loading</span>
                                </LoadingButton>
                                <Button color="error" sx={{ marginLeft: "10px" }} startIcon={<Iconify       icon="fluent:delete-12-filled" />} onClick={() => setOpenDialog(true)}>Delete</Button>
                            </Box> 
                            :
                            <Box>
                                <Button type="submit" variant="contained" startIcon={<Iconify icon="bx:edit" />}>Edit</Button>
                                <Button color="error" sx={{ marginLeft: "10px" }} startIcon={<Iconify icon="fluent:delete-12-filled" />} onClick={() => setOpenDialog(true)}>Delete</Button>
                                <DeleteConfirmation handleDelete={handleDelete} setOpenDialog={setOpenDialog} openDialog={openDialog} />
                            </Box>
                    }
                </form>
            </List>
        </Dialog>
    );
}

export default ProjectDetail;