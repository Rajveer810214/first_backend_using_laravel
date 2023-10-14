import React, { useState } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const DeletePost = ({ postId, onDelete }) => {
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      // Make a DELETE request to delete the post
      await axios.delete(`http://localhost:8000/api/posts/${postId}`);
      
      // Update state to indicate success
      setDeleted(true);

      // Trigger the onDelete callback passed from FetchPosts
      onDelete && onDelete();
    } catch (err) {
      // Handle errors
      setError(err.message);
    }
  };

  return (
    <div>
      {deleted ? (
        <p>Post deleted successfully!</p>
      ) : (
        <>
 <IconButton onClick={handleDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>          {error && <p>Error: {error}</p>}
        </>
      )}
    </div>
  );
};
export default DeletePost;
