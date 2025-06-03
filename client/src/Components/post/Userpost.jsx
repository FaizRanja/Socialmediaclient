import React, { useEffect } from 'react';
import { Box, Grid, Card, CardMedia, Typography } from '@mui/material';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts } from '../../store/reducer/Userpost';

const Userpost = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.Userpost);

  useEffect(() => {
    dispatch(fetchUserPosts());
  }, [dispatch]);

  if (isLoading) {
    return <Typography textAlign="center">Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error" textAlign="center">Error: {error}</Typography>;
  }

  if (posts.length === 0) {
    return <Typography textAlign="center">No posts available.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {posts.map((post, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              height: 250,
              overflow: 'hidden',
              borderRadius: 2,
              boxShadow: 3,
              position: 'relative',
            }}
          >
            {/* Image Post */}
            {post.contentType === 'image' && (
              <CardMedia
                component="img"
                image={post.mediaUrl}
                alt="user post"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}

            {/* Video Post */}
            {post.contentType === 'video' && (
              <CardMedia
                component="video"
                src={post.mediaUrl}
                controls
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}

            {/* Audio Post */}
            {post.contentType === 'audio' && (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  p: 2,
                }}
              >
                <SlowMotionVideoIcon sx={{ fontSize: 50, mb: 1, color: 'gray' }} />
                <audio controls src={post.mediaUrl} style={{ width: '100%' }} />
              </Box>
            )}

            {/* Fallback (unknown type) */}
            {!['image', 'video', 'audio'].includes(post.contentType) && (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#eee',
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Unsupported media type
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Userpost;
