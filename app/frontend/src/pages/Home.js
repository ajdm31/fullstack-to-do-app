import React, { useEffect, useState } from 'react';
import EditModal from '../components/modals/EditModal';
import { Layout } from '../layout';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import FolderIcon from '@mui/icons-material/Folder';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { yellow } from '@mui/material/colors';


const Home = () => {
    const [folders, setFolders] = useState([]);
    const [nameFolder, setNameFolder] = useState('');
    const [ui, setUi] = useState({
        open: false,
        item: null
    });

    useEffect(() => {
        handleFetch()
    }, [])

    const handleValue = (e) => {
        setNameFolder(e.target.value)
    }

    const handleFetch = async () => {
        try {
            const resp = await axios.get('http://127.0.0.1:8000/api/folder/')
            setFolders(resp.data)
        }
        catch (error) {
            console.log("error")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (nameFolder === '') return
        try {
            const resp = await axios.post(
                'http://127.0.0.1:8000/api/folder/', {
                name: nameFolder,
            })
            setFolders([...folders, resp.data])
            setNameFolder('')

        }
        catch (error) {
            console.log("error")
        }
    }

    const handleDelete = async (id) => {

        try {
            await axios.delete(`http://127.0.0.1:8000/api/folder/${id}/`)

            const result = folders.filter(folder => folder.id !== id);
            setFolders(result)
        }
        catch (error) {
            console.log("error")
        }
    }

    const handleUpdate = (element) => {
        const newArr = folders.map(folder => {
            if (folder.id === element.id) return element

            return folder
        })
        setFolders(newArr)
    }

    const handleClose = () => setUi({ ...ui, open: false, item: null })



    return (
        <Layout>
            <Grid
                marginTop="10px"
                marginBottom="20px"
                container
                justifyContent="center"
                spacing={2}

            >
                <Grid item xs={6} style={{ textAlign: 'center' }}>
                    <Card>
                        <CardContent>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Add Folder
                            </Typography>

                            <TextField fullWidth label="Folder Name" value={nameFolder} id="fulWidth" onChange={handleValue} />
                            <Button variant="contained" onClick={(e) => handleSubmit(e)}>Create</Button>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {
                folders.map((folder) => (<div key={folder.id}>
                    <Grid
                        marginBottom="10px"
                        container
                        justifyContent="space-evenly"
                        alignItems="center"
                    >
                        <Grid item xs={6} >
                            <Card >
                                <CardContent style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
                                    <Link to={`/folder/${folder.id}`} style={{ flexGrow: 1, flexDirection: "row", display: 'flex', textDecoration: 'none', color: "black" }}>
                                        <FolderIcon fontSize="large" sx={{ color: yellow[500] }} />
                                        <Typography variant="h5" component="div" style={{ flexGrow: 1 }} >
                                            {folder.name}
                                        </Typography>
                                    </Link>

                                    <div>
                                        <IconButton aria-label="edit" color="primary" onClick={() => setUi({ ...ui, open: true, item: folder })} >
                                            <EditIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton aria-label="delete" color="error" onClick={() => handleDelete(folder.id)}>
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </div>
                                </CardContent>

                            </Card>
                        </Grid >
                    </Grid>
                </div>)).reverse()
            }

            {ui.open && <EditModal open={ui.open} item={ui.item} onClose={handleClose} onUpdate={handleUpdate} folder={true} />}
        </Layout>
    )
};

export default Home;