import React, { useEffect, useState } from 'react';
import { Layout } from '../layout';
import axios from 'axios';

// const axios = require('axios');

const Home = () => {

    const [items, setItems] = useState([])
    const [body, setBody] = useState('')

    useEffect(() => {
        handleFetch()
    }, [])

    const handleFetch = async () => {
        try {
            const resp = await axios.get('http://127.0.0.1:8000/api/todo/')
            setItems(resp.data)
        }
        catch (error) {
            console.log("error")
        }
    }

    const handleValue = (e) => {
        setBody(e.target.value)
    }

    const handleDelete = async (id) => {
        try {
            const resp = await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)
            console.log("response: ", resp.data)
            // setItems(resp.data)
            const result = items.filter(item => item.id !== id);
            setItems(result)
        }
        catch (error) {
            console.log("error")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const resp = await axios.post(
                'http://127.0.0.1:8000/api/todo/', {
                body: body,
            })

            console.log("response: ", resp)
            setItems([...items, resp.data])
            setBody('')

        }
        catch (error) {
            console.log("error")
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const resp = await axios.put(
                'http://127.0.0.1:8000/api/todo/3/', {
                body: 'updated nuevamente new new ',

            })
            const newArr = items.map(item => {
                if (item.id === resp.data.id) return resp.data

                return item
            })
            setItems(newArr)

        }
        catch (error) {
            console.log("error")
        }
    }


    return (
        <Layout>
            <h1>This is the Homepage</h1>
            <form >
                <p>body</p>
                <input type="text" value={body} onChange={handleValue} />
                <button type='submit' onClick={(e) => handleSubmit(e)}>Submit</button>
                <button type='submit' onClick={(e) => handleUpdate(e)}>Update</button>
            </form>

            {items.map((item) => (<div key={item.id}>
                {item.body}<button type="button" onClick={() => handleDelete(item.id)}>DELETE</button>
            </div>))
            }
        </Layout >
    )
};

export default Home;