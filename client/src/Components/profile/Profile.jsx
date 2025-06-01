import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Grid,
  Tabs,
  Tab,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  CardMedia,
} from "@mui/material";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user, isLoading } = useSelector((state) => state.authreducer);
  const [tabIndex, setTabIndex] = useState(0);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);

  if (isLoading || !user) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box px={2} py={4}>
      {/* User Info Section */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          src={user.profilePicture || ""}
          sx={{ width: 120, height: 120, bgcolor: "#1976d2", fontSize: 40 }}
        >
          {user.name?.charAt(0).toUpperCase() || "U"}
          
        </Avatar>
        <Typography variant="h5" mt={2}>
          {user.name || user.username}
        </Typography>
        <Typography color="text.secondary">{user.email}</Typography>
        <Typography mt={1} textAlign="center">
          {user.bio || "No bio added"}
        </Typography>
        <Box mt={2} display="flex" gap={4}>
          <Box onClick={() => setOpenFollowers(true)} sx={{ cursor: "pointer" }}>
            <Typography fontWeight="bold">{user.followers?.length || 0}</Typography>
            <Typography variant="caption">Followers</Typography>
          </Box>
          <Box onClick={() => setOpenFollowing(true)} sx={{ cursor: "pointer" }}>
            <Typography fontWeight="bold">{user.following?.length || 0}</Typography>
            <Typography variant="caption">Following</Typography>
          </Box>
          <Box>
            <Typography fontWeight="bold">{user.posts?.length || 0}</Typography>
            <Typography variant="caption">Posts</Typography>
          </Box>
        </Box>
        <Chip
          label={user.isVerified ? "Verified" : "Not Verified"}
          color={user.isVerified ? "success" : "warning"}
          size="small"
          sx={{ mt: 2 }}
        />
      </Box>

      {/* Tabs for Posts & Saved */}
      <Box mt={4}>
        <Tabs value={tabIndex} onChange={(e, newVal) => setTabIndex(newVal)} centered>
          <Tab label="Posts" />
          <Tab label="Saved" />
        </Tabs>

        <Divider sx={{ my: 2 }} />

        {/* Posts Section */}
        <Grid container spacing={2}>
          {(tabIndex === 0 ? user.posts : user.savedPosts || []).map((post, index) => (
            <Grid item xs={4} sm={3} md={2} key={index}>
              <CardMedia
                component="img"
                height="140"
                image={post.imageUrl || "https://via.placeholder.com/150"}
                alt="User Post"
                sx={{ borderRadius: 2, cursor: "pointer" }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Followers Dialog */}
      <Dialog open={openFollowers} onClose={() => setOpenFollowers(false)}>
        <DialogTitle>Followers</DialogTitle>
        <DialogContent>
          {user.followers?.map((f, i) => (
            <Typography key={i}>{f.name || f.username}</Typography>
          ))}
        </DialogContent>
      </Dialog>

      {/* Following Dialog */}
      <Dialog open={openFollowing} onClose={() => setOpenFollowing(false)}>
        <DialogTitle>Following</DialogTitle>
        <DialogContent>
          {user.following?.map((f, i) => (
            <Typography key={i}>{f.name || f.username}</Typography>
          ))}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Profile;
