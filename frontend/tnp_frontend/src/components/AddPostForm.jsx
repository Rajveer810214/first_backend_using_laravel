import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import TextField from '@mui/material/TextField';
import { Alert, AlertTitle, Button, Grid } from '@mui/material';

export default function MultilineTextFields() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [alert, setAlert] = useState(false);
  const alertRef = useRef(null);

  useEffect(() => {
    if (alertRef.current) {
      alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [alert]);

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {

      await axios.post('http://localhost:8000/api/addpost', {
        title: title,
        description: description,
      });

      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    } catch (error) {
    }
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', marginTop: '22px' }}
    >
      <Navbar />
      <h1>Create a Post</h1>
      <Grid item style={{ width: '90%' }}>
        {alert ? (
          <div ref={alertRef}>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              You have <strong>Created Post successfully</strong>
            </Alert>
          </div>
        ) : (
          ''
        )}
        <TextField
          id="outlined-multiline-flexible"
          label="Title"
          multiline
          maxRows={6}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%' }}
        />
      </Grid>
      <Grid item style={{ width: '90%' }}>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={19}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%' }}
        />
      </Grid>
      <Grid item>
        <Button onClick={handleAddPost} variant="outlined">
          Create Post
        </Button>
      </Grid>
    </Grid>
  );
}
