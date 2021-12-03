import React, { useEffect, useState } from 'react';
import EditModal from '../components/modals/EditModal';
import { Layout } from '../layout';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useParams } from 'react-router';

const TodoList = () => {

    const folderId = useParams();

    const [items, setItems] = useState([])
    const [body, setBody] = useState('')
    const [ui, setUi] = useState({
        open: false,
        item: null
    })

    useEffect(() => {
        handleFetch()
        // eslint-disable-next-line
    }, [])


    const handleFetch = async () => {
        try {
            let resp = await axios.get(`http://127.0.0.1:8000/api/folder/${folderId.id}/`)

            setItems(resp.data)
        }
        catch (error) {
            console.log("error", error)
        }
    }

    const handleChangeCheckBox = async (item) => {
        try {
            const resp = await axios.put(
                `http://127.0.0.1:8000/api/todo/${item.id}/`, {
                is_complete: !item.is_complete,
            })
            handleUpdate(resp.data)
        }
        catch (error) {
            console.log("error")
        }
    };



    const handleValue = (e) => {
        setBody(e.target.value)
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)

            const result = items.filter(item => item.id !== id);
            setItems(result)
        }
        catch (error) {
            console.log("error")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (body === '') return
        try {
            const resp = await axios.post(
                'http://127.0.0.1:8000/api/todo/', {
                body: body,
                folder: folderId.id
            })
            setItems([...items, resp.data])
            setBody('')

        }
        catch (error) {
            console.log("error")
        }
    }

    const handleUpdate = (element) => {
        const newArr = items.map(item => {
            if (item.id === element.id) return element

            return item
        })

        setItems(newArr)
    }

    const handleClose = () => setUi({ ...ui, open: false, item: null })

    return (
        <Layout>
            <Grid
                marginBottom="20px"
                container
                justifyContent="center"
                spacing={2}
            >
                <Grid item xs={6} style={{ textAlign: 'center' }}>
                    <Card >
                        <CardContent >
                            <Typography id="modal-modal-title" variant="h6" component="h2" >
                                Add To-Do
                            </Typography>

                            <TextField fullWidth label="Task Name" value={body} id="fullWidth" onChange={handleValue} />
                            <Button variant="contained" onClick={(e) => handleSubmit(e)} >Add</Button>

                        </CardContent>
                    </Card>
                </Grid >
            </Grid >

            {
                items.map((item) => (<div key={item.id}>
                    <Grid
                        marginBottom="10px"
                        container
                        justifyContent="space-evenly"
                        alignItems="center"
                    >
                        <Grid item xs={6} >
                            <Card >
                                <CardContent style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>

                                    <Checkbox
                                        checked={item.is_complete}
                                        onChange={() => handleChangeCheckBox(item)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <div style={{ flexGrow: 1 }}>
                                        <Typography variant="h5" component="div" style={{ textDecoration: item.is_complete ? 'line-through' : "none" }}>
                                            {item.body}
                                        </Typography>
                                    </div>
                                    <div>
                                        <IconButton aria-label="edit" color="primary" onClick={() => setUi({ ...ui, open: true, item: item })} >
                                            <EditIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton aria-label="delete" color="error" onClick={() => handleDelete(item.id)}>
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid >
                    </Grid>
                </div>)).reverse()
            }

            {ui.open && <EditModal open={ui.open} item={ui.item} onClose={handleClose} onUpdate={handleUpdate} />}
        </Layout >
    )
};

export default TodoList;