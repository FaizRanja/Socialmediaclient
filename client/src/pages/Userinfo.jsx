import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Chip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useDispatch, useSelector } from "react-redux";
import { getuserdetalis, updateprofilepic } from "../store/reducer/User";

const Userinfo = () => {
  const { user, isLoading } = useSelector((state) => state.authreducer);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState(""); // For image preview
  const [uploading, setUploading] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    setUploading(true);

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      await dispatch(updateprofilepic(formData)); // Your Redux action must handle FormData
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };


    // useEffect(() => {
    // dispatch(getuserdetalis());
    // },[])

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" position="relative">
      <Box position="relative" onClick={handleAvatarClick} sx={{ cursor: "pointer" }}>
        <Avatar
          src={previewImage || user.profilePicture || ""}
          sx={{ width: 120, height: 120, bgcolor: "#1976d2", fontSize: 40 }}
        >
          {user.name?.charAt(0).toUpperCase() || "U"}
        </Avatar>

        {uploading ? (
          <CircularProgress
            size={24}
            sx={{ position: "absolute", bottom: 0, right: 0 }}
          />
        ) : (
          <IconButton
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              bgcolor: "white",
              boxShadow: 2,
            }}
            size="small"
          >
            <CameraAltIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Typography variant="h5" mt={2}>
        {user.name || user.username}
      </Typography>
      <Typography color="text.secondary">{user.email}</Typography>
      <Typography mt={1} textAlign="center">
        {user.bio || "No bio added"}
      </Typography>

      <Box mt={2} display="flex" gap={4}>
        <Box>
          <Typography fontWeight="bold">{user.followers?.length || 0}</Typography>
          <Typography variant="caption">Followers</Typography>
        </Box>
        <Box>
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
  );
};

export default Userinfo;
