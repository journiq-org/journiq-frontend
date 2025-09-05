"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  deleteAllNotifications,
  selectNotifications,
  selectUnreadNotifications,
} from "@/redux/slices/notificationSlice";

import {
  Drawer,
  Typography,
  IconButton,
  CircularProgress,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AdminNotificationDrawer: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  const unreadNotifications = useAppSelector(selectUnreadNotifications);
  const { loading, error } = useAppSelector((state) => state.notifications);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  useEffect(() => {
    if (open) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, open]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // ✅ use unreadNotifications from redux
  const filteredNotifications = showUnreadOnly
    ? unreadNotifications
    : notifications;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 360,
          p: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fafafa",
        }}
      >
        {/* Header with 3-dots menu */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Notifications
          </Typography>

          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem
              onClick={() => {
                dispatch(markAllNotificationsAsRead());
                handleMenuClose();
              }}
            >
              Mark All as Read
            </MenuItem>
            <MenuItem
              onClick={() => {
                setShowUnreadOnly((prev) => !prev);
                handleMenuClose();
              }}
            >
              {showUnreadOnly ? "Show All" : "Show Unread"}
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(deleteAllNotifications());
                handleMenuClose();
              }}
            >
              Delete All
            </MenuItem>
          </Menu>
        </Box>

        {/* Loader */}
        {loading && (
          <Box textAlign="center" mt={3}>
            <CircularProgress />
          </Box>
        )}

        {/* Error */}
        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}

        {/* Notifications List */}
        <Box
          flexGrow={1}
          overflow="auto"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {!loading && filteredNotifications.length === 0 && (
            <Typography textAlign="center" color="text.secondary">
              No notifications found
            </Typography>
          )}

          {filteredNotifications.map((n) => (
            <Box
              key={n._id}
              sx={{
                alignSelf: n.isRead ? "flex-start" : "flex-end",
                maxWidth: "80%",
                p: 1.5,
                borderRadius: 3,
                bgcolor: n.isRead
                  ? "#e4e6eb"
                  : "linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045)",
                color: n.isRead ? "black" : "white",
                boxShadow: 2,
                position: "relative",
              }}
            >
              <Typography variant="body2">{n.message}</Typography>
              <Typography
                variant="caption"
                sx={{ opacity: 0.8, display: "block", mt: 0.5 }}
              >
                {new Date(n.createdAt).toLocaleString()}
              </Typography>

              {/* Action buttons */}
              <Box
                sx={{
                  position: "absolute",
                  top: 4,
                  right: -40,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                {!n.isRead && (
                  <IconButton
                    size="small"
                    sx={{ color: "#4cafef" }}
                    onClick={() => dispatch(markNotificationAsRead(n._id))}
                  >
                    <MarkEmailReadIcon fontSize="small" />
                  </IconButton>
                )}
                <IconButton
                  size="small"
                  sx={{ color: "#f44336" }}
                  onClick={() => dispatch(deleteNotification(n._id))}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default AdminNotificationDrawer;
