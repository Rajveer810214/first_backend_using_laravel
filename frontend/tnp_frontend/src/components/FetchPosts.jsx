import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeletePost from './DeletePost';
import UpdatePost from './UpdatePost';

const FetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null); // Track edit mode and postId

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/fetchallposts');
      // Sort posts by date (assuming created_at is in ISO format, adjust as needed)
      const sortedPosts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setPosts(sortedPosts);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching the posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const handleEditClick = (postId) => {
    setEditMode(postId);
  };

  const handleUpdateComplete = () => {
    setEditMode(null);
    fetchAllPosts();
  };

  if (loading) {
    return <div className="center">Loading...</div>;
  }

  if (error) {
    return <div className="center">Error: {error}</div>;
  }

  const formatCreatedAt = (createdAt) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(createdAt).toLocaleDateString(undefined, options);
  };

  return (
    <Box className="center" style={{width:'90vw'}}>
      <Typography variant="h4" component="div" gutterBottom style={{textAlign: 'center'}}>
        Posts
      </Typography>
      {posts.map((post) => (
        <Card key={post.id} variant="outlined" style={{margin:'33px'}}>
          <CardContent>
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <span style={{ color: 'green' }}>Created at: {formatCreatedAt(post.created_at)}</span>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.description}
            </Typography>
          </CardContent>
          <CardActions>
            {editMode === post.id ? (
              <UpdatePost postId={post.id} onUpdate={handleUpdateComplete} />
            ) : (
              <>
                <Button size="small" startIcon={<EditIcon />} onClick={() => handleEditClick(post.id)} disabled={editMode !== null}>
                  Edit
                </Button>
                {!editMode && <DeletePost startIcon={<DeleteIcon />} postId={post.id} onDelete={() => fetchAllPosts()} />}
              </>
            )}
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default FetchPosts;
