import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';

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
    padding: '25px',
};

const EditModal = ({ open, item, onClose, onUpdate }) => {

    const [body, setBody] = useState(item ? item.body : '')

    const handleSubmit = async (e) => {

        let id = item.id
        try {
            const resp = await axios.put(
                `http://127.0.0.1:8000/api/todo/${id}/`, {
                body: body,

            })
            onUpdate(resp.data)
            onClose()

        }
        catch (error) {
            console.log("error")
        }
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Element
                    </Typography>
                    <form>
                        <TextField style={{ padding: '25px' }} fullWidth value={body} id="fullWidth" onChange={(e) => setBody(e.target.value)} />
                        <Button variant="contained" onClick={() => handleSubmit()} >Save</Button>
                        <Button variant="contained" color="error" onClick={() => onClose()} >Cancel</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default EditModal
