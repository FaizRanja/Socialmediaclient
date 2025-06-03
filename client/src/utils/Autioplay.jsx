import React, { useEffect, useRef, useState } from 'react';
import UseInview from './UseInview';
import { Box, Typography, CardMedia } from '@mui/material';
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";

const Autioplay = ({ type, src }) => {
  const [ref, isInView] = UseInview({ threshold: 0.5 });
  const mediaRef = useRef(null);

  // ✅ Initial mute state from localStorage (default: true)
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem("globalMute") === "false" ? false : true;
  });

  // ✅ Jab user mute/unmute kare to global state update karo
  const handleVolumeChange = () => {
    if (mediaRef.current) {
      const currentMuted = mediaRef.current.muted;
      setIsMuted(currentMuted);
      localStorage.setItem("globalMute", currentMuted); // Save preference
    }
  };

  // ✅ Jab isMuted change ho to media pe apply karo
  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // ✅ Jab component view me ho to play, warna pause
  useEffect(() => {
    if (isInView && mediaRef.current) {
      mediaRef.current.play().catch(() => {});
    } else if (mediaRef.current) {
      mediaRef.current.pause();
    }
  }, [isInView]);

  // ✅ VIDEO rendering
  if (type === "video") {
    return (
      <CardMedia
        component="video"
        ref={(el) => {
          ref.current = el;
          mediaRef.current = el;
        }}
        onVolumeChange={handleVolumeChange}
        src={src}
        controls
        muted={isMuted}
        sx={{ width: "100%", height: 350, objectFit: "cover" }}
      />
    );
  }

  // ✅ AUDIO rendering
  if (type === "audio") {
    return (
      <Box
        ref={ref}
        sx={{
          height: 350,
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          p: 2,
        }}
      >
        <SlowMotionVideoIcon sx={{ fontSize: 60, mb: 1, color: "gray" }} />
        <audio
          ref={(el) => {
            mediaRef.current = el;
          }}
          onVolumeChange={handleVolumeChange}
          controls
          src={src}
          muted={isMuted}
          style={{ width: "100%" }}
        />
      </Box>
    );
  }

  // ✅ Fallback for unsupported types
  return (
    <Box
      sx={{
        height: 350,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eee",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        Unsupported media type
      </Typography>
    </Box>
  );
};

export default Autioplay;