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
  Chip,
  Avatar,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface Props {
  open: boolean;
  onClose: () => void;
}

const NotificationDrawer: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications) || [];
  const unreadNotifications = useAppSelector(selectUnreadNotifications) || [];
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

  const handleNotificationClick = (notification: any) => {
    if (!notification.isRead) {
      dispatch(markNotificationAsRead(notification._id));
    }
  };

  // Safe check for filtered notifications
  const filteredNotifications = showUnreadOnly
    ? (unreadNotifications || [])
    : (notifications || []);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 380,
          bgcolor: "#fdfdfd",
          borderLeft: "1px solid #e2e0df",
          boxShadow: "-8px 0 32px rgba(34, 37, 44, 0.15)",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header with gradient and menu */}
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid #e2e0df",
            bgcolor: "linear-gradient(135deg, #fdfdfd 0%, #e4e2e1 100%)",
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                sx={{
                  bgcolor: "#93c5fd",
                  width: 36,
                  height: 36,
                }}
              >
                <NotificationsIcon sx={{ color: "#1e3a8a", fontSize: 20 }} />
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    background: "linear-gradient(45deg, #3b82f6, #1e3a8a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "1.25rem",
                    lineHeight: 1.2,
                  }}
                >
                  Notifications
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#333333",
                    fontSize: "0.75rem",
                  }}
                >
                  Stay updated
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              {unreadNotifications && unreadNotifications.length > 0 && (
                <Chip
                  label={unreadNotifications.length}
                  size="small"
                  sx={{
                    bgcolor: "#ff9100",
                    color: "#fdfdfd",
                    fontWeight: "bold",
                    fontSize: "0.75rem",
                    height: 24,
                  }}
                />
              )}
              <IconButton onClick={handleMenuOpen} sx={{ color: "#333333" }}>
                <MoreVertIcon />
              </IconButton>
              <IconButton onClick={onClose} sx={{ color: "#333333" }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                bgcolor: "#fdfdfd",
                border: "1px solid #e2e0df",
                borderRadius: 2,
                mt: 1,
                minWidth: 200,
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                dispatch(markAllNotificationsAsRead());
                handleMenuClose();
              }}
              sx={{
                color: "#363636",
                py: 1.5,
                "&:hover": {
                  bgcolor: "#e4e2e1",
                  color: "#3b82f6",
                },
              }}
            >
              <MarkEmailReadIcon sx={{ mr: 2, fontSize: 18 }} />
              Mark All as Read
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={() => {
                setShowUnreadOnly((prev) => !prev);
                handleMenuClose();
              }}
              sx={{
                color: "#363636",
                py: 1.5,
                "&:hover": {
                  bgcolor: "#e4e2e1",
                  color: "#3b82f6",
                },
              }}
            >
              {showUnreadOnly ? "Show All" : "Show Unread"}
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={() => {
                dispatch(deleteAllNotifications());
                handleMenuClose();
              }}
              sx={{
                color: "#ff9100",
                py: 1.5,
                "&:hover": {
                  bgcolor: "#ff9100",
                  color: "#fdfdfd",
                },
              }}
            >
              <DeleteIcon sx={{ mr: 2, fontSize: 18 }} />
              Delete All
            </MenuItem>
          </Menu>
        </Box>

        {/* Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            p: 2,
          }}
        >
          {/* Loading State */}
          {loading && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 8,
              }}
            >
              <CircularProgress
                sx={{
                  color: "#3b82f6",
                  mb: 2,
                }}
              />
              <Typography sx={{ color: "#333333", fontSize: "0.9rem" }}>
                Loading notifications...
              </Typography>
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Box
              sx={{
                p: 3,
                bgcolor: "#ff9100",
                borderRadius: 2,
                border: "1px solid #ff9100",
                mb: 2,
              }}
            >
              <Typography sx={{ color: "#fdfdfd", fontWeight: "medium", fontSize: "0.9rem" }}>
                Error: {error}
              </Typography>
            </Box>
          )}

          {/* Empty State */}
          {!loading && !error && filteredNotifications && filteredNotifications.length === 0 && (
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                px: 2,
              }}
            >
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: "#e4e2e1",
                  mx: "auto",
                  mb: 3,
                }}
              >
                <NotificationsIcon sx={{ color: "#333333", fontSize: 32 }} />
              </Avatar>
              <Typography
                variant="h6"
                sx={{
                  color: "#22252c",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                {showUnreadOnly ? "No unread notifications" : "No notifications"}
              </Typography>
              <Typography sx={{ color: "#333333", fontSize: "0.9rem" }}>
                {showUnreadOnly
                  ? "You've read all your notifications!"
                  : "You're all caught up!"
                }
              </Typography>
            </Box>
          )}

          {/* Notifications List */}
          {!loading && !error && filteredNotifications && filteredNotifications.length > 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {filteredNotifications.map((n: any) => (
                <Box
                  key={n._id || Math.random()}
                  onClick={() => handleNotificationClick(n)}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: n.isRead ? "#e4e2e1" : "#fdfdfd",
                    border: n.isRead ? "1px solid #e2e0df" : "2px solid #93c5fd",
                    color: "#363636",
                    boxShadow: n.isRead ? "0 2px 8px rgba(0,0,0,0.08)" : "0 4px 16px rgba(59, 130, 246, 0.15)",
                    position: "relative",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: n.isRead
                        ? "0 4px 16px rgba(0,0,0,0.12)"
                        : "0 8px 24px rgba(59, 130, 246, 0.25)",
                      borderColor: n.isRead ? "#e2e0df" : "#3b82f6",
                    },
                  }}
                >
                  {/* Unread indicator */}
                  {!n.isRead && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        width: 10,
                        height: 10,
                        bgcolor: "#ff9100",
                        borderRadius: "50%",
                        border: "2px solid #fdfdfd",
                        boxShadow: "0 0 0 1px #93c5fd",
                      }}
                    />
                  )}

                  {/* Unread badge */}
                  {!n.isRead && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        bgcolor: "#ff9100",
                        color: "#fdfdfd",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      New
                    </Box>
                  )}

                  <Box sx={{ pr: 8 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: n.isRead ? "normal" : "600",
                        lineHeight: 1.5,
                        mb: 2,
                        color: n.isRead ? "#363636" : "#22252c",
                        fontSize: "0.95rem",
                      }}
                    >
                      {n.message || "No message"}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                      {n.sender?.name && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <PersonIcon sx={{ fontSize: 14, color: "#333333" }} />
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#333333",
                              fontSize: "0.8rem",
                              fontWeight: "medium",
                            }}
                          >
                            {n.sender.name}
                          </Typography>
                        </Box>
                      )}

                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <AccessTimeIcon sx={{ fontSize: 14, color: "#333333" }} />
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#333333",
                            fontSize: "0.8rem",
                          }}
                        >
                          {n.createdAt ? new Date(n.createdAt).toLocaleString() : "Unknown time"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Action buttons */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      display: "flex",
                      gap: 0.5,
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0";
                    }}
                  >
                    {!n.isRead && (
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: "#fdfdfd",
                          color: "#3b82f6",
                          border: "1px solid #e2e0df",
                          "&:hover": {
                            bgcolor: "#3b82f6",
                            color: "#fdfdfd",
                          },
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(markNotificationAsRead(n._id));
                        }}
                      >
                        <MarkEmailReadIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: "#fdfdfd",
                        color: "#ff9100",
                        border: "1px solid #e2e0df",
                        "&:hover": {
                          bgcolor: "#ff9100",
                          color: "#fdfdfd",
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(deleteNotification(n._id));
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default NotificationDrawer;