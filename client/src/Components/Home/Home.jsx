import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  CardContent,
  Stack,
  Avatar,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPosts,
  followuser,
  unfollowuser,
} from "../../store/reducer/Userpost";
import Autioplay from "../../utils/Autioplay";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.Userpost);
  const { user } = useSelector((state) => state.authreducer);
  const [followingStatus, setFollowingStatus] = useState({}); // userId: true/false (loading state)

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  const handleFollowToggle = async (userId) => {
    // Set loading state for this user
    setFollowingStatus((prev) => ({ ...prev, [userId]: true }));

    const isFollowing = user?.following?.includes(userId);
    try {
      if (isFollowing) {
        await dispatch(unfollowuser(userId));
      } else {
        await dispatch(followuser(userId));
      }
    } catch (err) {
      console.error("Follow/Unfollow error:", err);
    } finally {
      // Remove loading state
      setFollowingStatus((prev) => ({ ...prev, [userId]: false }));
    }
  };

  if (isLoading) {
    return <Typography textAlign="center">Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center">
        Error: {error}
      </Typography>
    );
  }

  if (!Array.isArray(posts)) {
    return (
      <Typography color="error" textAlign="center">
        Error: Posts data is invalid
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} direction="column">
      {posts.map((post, index) => {
        const userId = post.user._id;
        const isFollowing = user?.following?.includes(userId);
        const isLoadingFollow = followingStatus[userId];

        return (
          <Grid item key={index}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                },
              }}
            >
              {/* User Info */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px={2}
                py={1}
              >
                <Box display="flex" alignItems="center">
                  <Avatar
                    src={post.user?.profilePicture || ""}
                    sx={{
                      width: 50,
                      height: 50,
                      bgcolor: "#1976d2",
                      fontSize: 40,
                      mr: 2,
                    }}
                  >
                    {post.user?.username?.charAt(0).toUpperCase() || "U"}
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {post.user?.username || user.username}
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={
                    <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                      {isFollowing ? "-" : "+"}
                    </Typography>
                  }
                  sx={{
                    borderRadius: 5,
                    textTransform: "none",
                    fontWeight: 500,
                    px: 2,
                    "&:hover": {
                      backgroundColor: "#e8f0fe",
                      borderColor: "#1a73e8",
                    },
                  }}
                  disabled={isLoadingFollow}
                  onClick={() => handleFollowToggle(userId)}
                >
                  {isLoadingFollow
                    ? "Loading..."
                    : isFollowing
                    ? "Unfollow"
                    : "Follow"}
                </Button>
              </Box>

              {/* Post Text */}
              <Stack sx={{ px: 2, pb: 1 }}>
                <Typography variant="subtitle1" fontWeight={600} fontSize="small">
                  {post.text || "Untitled Post"}
                </Typography>
              </Stack>

              {/* Post Media */}
              {["video", "audio"].includes(post.contentType) ? (
                <Autioplay type={post.contentType} src={post.mediaUrl} />
              ) : post.contentType === "image" ? (
                <CardMedia
                  component="img"
                  image={post.mediaUrl}
                  alt="user post"
                  sx={{ width: "100%", height: 350, objectFit: "cover" }}
                />
              ) : (
                <Typography textAlign="center">Unsupported media</Typography>
              )}

              {/* Action Buttons */}
              <CardContent>
                <Stack direction="row" spacing={2} mt={1}>
                  <Button
                    startIcon={<FavoriteBorderIcon />}
                    variant="outlined"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      px: 2,
                      "&:hover": {
                        backgroundColor: "#e8f0fe",
                        borderColor: "#1a73e8",
                      },
                    }}
                  >
                    Like
                  </Button>
                  <Button
                    startIcon={<ChatBubbleOutlineIcon />}
                    variant="outlined"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      px: 2,
                      "&:hover": {
                        backgroundColor: "#e8f0fe",
                        borderColor: "#1a73e8",
                      },
                    }}
                  >
                    Comments
                  </Button>
                  <Button
                    startIcon={<VisibilityIcon />}
                    variant="outlined"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      px: 2,
                      "&:hover": {
                        backgroundColor: "#e8f0fe",
                        borderColor: "#1a73e8",
                      },
                    }}
                  >
                    Views
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Home;
