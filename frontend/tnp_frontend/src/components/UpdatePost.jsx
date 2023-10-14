import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Grid, TextField, Alert, AlertTitle } from '@mui/material';

const UpdatePost = ({ postId, onUpdate }) => {
  const [postData, setPostData] = useState({
    title: '',
    description: '',
  });
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState(null);
  const alertRef = useRef(null);

  // Fetch existing post data when the component mounts
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${postId}`);
        setPostData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleInputChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/posts/${postId}`, postData);

      // Update state to indicate success
      setUpdated(true);

      // Notify the parent component about the update
      onUpdate();

      // Log the updated post details
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (updated) {
      // Scroll to the success message when it appears
      alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [updated]);

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      {updated && (
        <div ref={alertRef} style={{ marginTop: '20px' }}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Post updated successfully!
          </Alert>
        </div>
      )}
      <Grid item style={{ width: '90%' }}>
        <TextField
          id="outlined-multiline-flexible"
          label="Title"
          multiline
          maxRows={4}
          value={postData.title}
          onChange={handleInputChange}
          fullWidth
          name="title"
        />
      </Grid>
      <Grid item style={{ width: '90%' }}>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={8}
          value={postData.description}
          onChange={handleInputChange}
          fullWidth
          name="description"
        />
      </Grid>
      <Grid item>
        <Button onClick={handleUpdate} variant="outlined">
          Update Post
        </Button>
      </Grid>
    </Grid>
  );
};

export default UpdatePost;
