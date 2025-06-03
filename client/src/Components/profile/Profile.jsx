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
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import Userpost from "../post/Userpost";
import Savepost from "../post/Savepost";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Userinfo from "../../pages/Userinfo";


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
    <Box>
      {/* User Info Section */}
     <Userinfo/>

      {/* Tabs for Posts & Saved */}
     

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
