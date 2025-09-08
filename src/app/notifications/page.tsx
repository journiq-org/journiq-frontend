// // "use client";

// // import { useEffect, useState } from "react";
// // import { useAppDispatch, useAppSelector } from "@/redux/hook";
// // import {
// //   fetchNotifications,
// //   markNotificationAsRead,
// //   deleteNotification,
// //   deleteAllNotifications,
// //   selectNotifications,
// //   selectUnreadNotifications,
// //   markAllNotificationsAsRead,
// //   markAsReadLocally,   // ✅ add this
// // } from "@/redux/slices/notificationSlice";


// // import {
// //   List,
// //   ListItem,
// //   ListItemText,
// //   Divider,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogContentText,
// //   DialogTitle,
// //   Button,
// //   IconButton,
// //   Typography,
// //   Toolbar,
// //   AppBar,
// //   Badge,
// //   Menu,
// //   MenuItem,
// // } from "@mui/material";

// // import DeleteIcon from "@mui/icons-material/Delete";
// // import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// // import MoreVertIcon from "@mui/icons-material/MoreVert";

// // // ✅ Import Navbars
// // import TravellerNavbar from "@/components/TravellerNavbar";
// // import GuideNavbar from "@/components/GuideNavbar";

// // export default function NotificationsPage() {
// //   const dispatch = useAppDispatch();
// //   const notifications = useAppSelector(selectNotifications);
// //   const unread = useAppSelector(selectUnreadNotifications);
// //   const loading = useAppSelector((state) => state.notifications.loading);

// //   const [role, setRole] = useState<string | null>(null);
// //   const [selectedNotification, setSelectedNotification] = useState<any | null>(null);
// //   const [deleteId, setDeleteId] = useState<string | null>(null);
// //   const [confirmOpen, setConfirmOpen] = useState(false);
// //   const [confirmAll, setConfirmAll] = useState(false);

// //   // 🔹 For 3-dot menu
// //   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// //   const menuOpen = Boolean(anchorEl);

// //   // ✅ Fetch role once
// //   useEffect(() => {
// //     async function fetchRole() {
// //       try {
// //         const res = await fetch("/api/auth/get-cookie", {
// //           method: "GET",
// //           credentials: "include",
// //         });
// //         const data = await res.json();
// //         setRole(data.role || "Traveller"); // default Traveller
// //       } catch (err) {
// //         console.error("Error fetching role:", err);
// //         setRole("Traveller");
// //       }
// //     }
// //     fetchRole();
// //   }, []);

// //   // ✅ Fetch notifications
 
// // useEffect(() => {
// //   if (role) {
// //     dispatch(fetchNotifications());
// //   }
// // }, [role, dispatch]);



// //   // 🔹 Automatically mark as read when dialog opens and update list instantly
// //   // useEffect(() => {
// //   //   if (selectedNotification && !selectedNotification.isRead) {
// //   //     dispatch(markNotificationAsRead(selectedNotification._id));

// //   //     // Optimistically update local notification list for instant UI change
// //   //     const index = notifications.findIndex((n) => n._id === selectedNotification._id);
// //   //     if (index !== -1) {
// //   //       notifications[index].isRead = true;
// //   //     }
// //   //   }
// //   // }, [selectedNotification, dispatch, notifications]);

// // useEffect(() => {
// //   if (selectedNotification && !selectedNotification.isRead) {
// //     // dispatch(markAsReadLocally(selectedNotification._id)); // instant UI change
// //     dispatch(markNotificationAsRead(selectedNotification._id)); // sync with server
// //   }
// // }, [selectedNotification, dispatch]);

// //   const handleDelete = (id: string) => {
// //     setDeleteId(id);
// //     setConfirmOpen(true);
// //   };

// //   const confirmDelete = () => {
// //     if (deleteId) dispatch(deleteNotification(deleteId));
// //     setConfirmOpen(false);
// //     setDeleteId(null);
// //   };

// //   const confirmDeleteAll = () => {
// //     dispatch(deleteAllNotifications());
// //     setConfirmAll(false);
// //   };

// //   // 🔹 Menu handlers
// //   const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
// //   const handleMenuClose = () => setAnchorEl(null);
// //   const handleMarkAllAsRead = () => {
// //     dispatch(markAllNotificationsAsRead());
// //     handleMenuClose();
// //   };
// //   const handleShowUnread = () => {
// //     console.log("Show Unread clicked"); // replace with actual filtering if needed
// //     handleMenuClose();
// //   };

// //   return (
// //     <div className="h-screen flex flex-col">
// //       {/* ✅ Show navbar depending on role */}
// //       {role === "Guide" ? <GuideNavbar /> : <TravellerNavbar />}

// //       {/* 🔹 Notification Header */}
// //       <AppBar position="static" color="default" className="shadow-md">
// //         <Toolbar className="flex justify-between">
// //           <Typography variant="h6" className="font-bold text-gray-800">
// //             NOTIFICATIONS
// //           </Typography>

// //           <div className="flex items-center gap-2">
// //             <IconButton color="inherit" onClick={handleShowUnread}>
// //               <Badge badgeContent={unread.length} color="error" />
// //             </IconButton>

// //             <IconButton color="inherit" onClick={handleMenuClick}>
// //               <MoreVertIcon />
// //             </IconButton>

// //             <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
// //               <MenuItem
// //                 onClick={() => {
// //                   handleShowUnread();
// //                   handleMenuClose();
// //                 }}
// //               >
// //                 Show Unread
// //               </MenuItem>
// //               <MenuItem
// //                 onClick={() => {
// //                   handleMarkAllAsRead();
// //                   handleMenuClose();
// //                 }}
// //               >
// //                 Mark All as Read
// //               </MenuItem>
// //               <MenuItem
// //                 onClick={() => {
// //                   setConfirmAll(true);
// //                   handleMenuClose();
// //                 }}
// //               >
// //                 Delete All
// //               </MenuItem>
// //             </Menu>
// //           </div>
// //         </Toolbar>
// //       </AppBar>

// //       {/* Notification List */}
// //       <div className="flex-grow overflow-y-auto bg-gray-100">
// //         {loading ? (
// //           <Typography className="p-4">Loading...</Typography>
// //         ) : notifications.length === 0 ? (
// //           <Typography className="p-4">No notifications found</Typography>
// //         ) : (
// //           <List>
// //             {notifications.map((n) => (
// //               <div key={n._id}>
// //                 <ListItem
// //                   component="div"
// //                   onClick={() => setSelectedNotification(n)}
// //                   sx={{
// //                     cursor: "pointer",
// //                     backgroundColor: n.isRead ? "white" : "#ebf8ff",
// //                     fontWeight: n.isRead ? "normal" : "bold",
// //                     "&:hover": {
// //                       backgroundColor: n.isRead ? "#f5f5f5" : "#dbeafe",
// //                     },
// //                   }}
// //                 >
// //                   <ListItemText
// //                     primary={n.message}
// //                     secondary={`From: ${n.sender?.name || "System"} • ${new Date(
// //                       n.createdAt
// //                     ).toLocaleString()}`}
// //                   />
// //                   <IconButton
// //                     edge="end"
// //                     aria-label="delete"
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                       handleDelete(n._id);
// //                     }}
// //                   >
// //                     <DeleteIcon />
// //                   </IconButton>
// //                 </ListItem>
// //                 <Divider />
// //               </div>
// //             ))}
// //           </List>
// //         )}
// //       </div>

// //       {/* Single Notification Dialog */}
// //       <Dialog open={!!selectedNotification} onClose={() => setSelectedNotification(null)} fullWidth>
// //         <DialogTitle>
// //           <IconButton edge="start" onClick={() => setSelectedNotification(null)}>
// //             <ArrowBackIcon />
// //           </IconButton>
// //           Notification
// //         </DialogTitle>
// //         <DialogContent>
// //           <DialogContentText>{selectedNotification?.message}</DialogContentText>
// //           <Typography variant="caption" color="text.secondary">
// //             From: {selectedNotification?.sender?.name || "System"} •{" "}
// //             {selectedNotification ? new Date(selectedNotification.createdAt).toLocaleString() : ""}
// //           </Typography>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={() => setSelectedNotification(null)}>Close</Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* Confirm Single Delete */}
// //       <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
// //         <DialogTitle>Delete Notification</DialogTitle>
// //         <DialogContent>
// //           <DialogContentText>Are you sure you want to delete this notification?</DialogContentText>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
// //           <Button color="error" onClick={confirmDelete}>
// //             Delete
// //           </Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* Confirm Delete All */}
// //       <Dialog open={confirmAll} onClose={() => setConfirmAll(false)}>
// //         <DialogTitle>Delete All Notifications</DialogTitle>
// //         <DialogContent>
// //           <DialogContentText>
// //             This will remove all your notifications permanently. Continue?
// //           </DialogContentText>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={() => setConfirmAll(false)}>Cancel</Button>
// //           <Button color="error" onClick={confirmDeleteAll}>
// //             Delete All
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </div>
// //   );
// // }



// "use client";

// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import {
//   fetchNotifications,
//   markNotificationAsRead,
//   // markAsReadLocally,
//   deleteNotification,
//   deleteAllNotifications,
//   markAllNotificationsAsRead,
//   selectNotifications,
//   selectUnreadNotifications,
// } from "@/redux/slices/notificationSlice";

// import {
//   List, ListItem, ListItemText, Divider, Dialog, DialogActions,
//   DialogContent, DialogContentText, DialogTitle, Button, IconButton,
//   Typography, Toolbar, AppBar, Badge, Menu, MenuItem,
// } from "@mui/material";

// import DeleteIcon from "@mui/icons-material/Delete";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

// import TravellerNavbar from "@/components/TravellerNavbar";
// import GuideNavbar from "@/components/GuideNavbar";

// export default function NotificationsPage() {
//   const dispatch = useAppDispatch();
//   const notifications = useAppSelector(selectNotifications);
//   const unread = useAppSelector(selectUnreadNotifications);
//   const loading = useAppSelector((state) => state.notifications.loading);

//   const [role, setRole] = useState<string | null>(null);
//   const [selectedNotification, setSelectedNotification] = useState<any | null>(null);
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [confirmAll, setConfirmAll] = useState(false);

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const menuOpen = Boolean(anchorEl);

//   useEffect(() => {
//     async function fetchRole() {
//       const res = await fetch("/api/auth/get-cookie", { credentials: "include" });
//       const data = await res.json();
//       setRole(data.role || "Traveller");
//     }
//     fetchRole();
//   }, []);

//   useEffect(() => {
//     if (role) dispatch(fetchNotifications());
//   }, [role, dispatch]);

//   // 🔹 Mark as read instantly & sync with server
//   useEffect(() => {
//     if (selectedNotification && !selectedNotification.isRead) {
//       // dispatch(markAsReadLocally(selectedNotification._id));
//       dispatch(markNotificationAsRead(selectedNotification._id));
//     }
//   }, [selectedNotification, dispatch]);

//   const handleDelete = (id: string) => { setDeleteId(id); setConfirmOpen(true); };
//   const confirmDelete = () => { if (deleteId) dispatch(deleteNotification(deleteId)); setConfirmOpen(false); setDeleteId(null); };
//   const confirmDeleteAll = () => { dispatch(deleteAllNotifications()); setConfirmAll(false); };
//   const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);
//   const handleMarkAllAsRead = () => { dispatch(markAllNotificationsAsRead()); handleMenuClose(); };

//   return (
//     <div className="h-screen flex flex-col">
//       {/* {role === "Guide" ? <GuideNavbar /> : <TravellerNavbar />} */}
//       {role ? (role === "Guide" ? <GuideNavbar /> : <TravellerNavbar />) : null}


//       <AppBar position="static" color="default" className="shadow-md">
//         <Toolbar className="flex justify-between">
//           <Typography variant="h6">NOTIFICATIONS</Typography>
//           <div className="flex items-center gap-2">
//             <IconButton color="inherit">
//               {/* <Badge badgeContent={unread.length} color="error" /> */}
//             </IconButton>
//             <IconButton color="inherit" onClick={handleMenuClick}>
//               <MoreVertIcon />
//             </IconButton>
//             <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
//               <MenuItem onClick={handleMarkAllAsRead}>Mark All as Read</MenuItem>
//               <MenuItem onClick={() => setConfirmAll(true)}>Delete All</MenuItem>
//             </Menu>
//           </div>
//         </Toolbar>
//       </AppBar>

//       <div className="flex-grow overflow-y-auto bg-gray-100">
//         {loading ? <Typography className="p-4">Loading...</Typography> :
//         notifications.length === 0 ? <Typography className="p-4">No notifications found</Typography> :
//         <List>
//           {notifications.map((n) => (
//             <div key={n._id}>
//               <ListItem
//                 onClick={() => setSelectedNotification(n)}
//                 sx={{
//                   cursor: "pointer",
//                   backgroundColor: n.isRead ? "white" : "#ebf8ff",
//                   "&:hover": { backgroundColor: n.isRead ? "#f5f5f5" : "#dbeafe" },
//                 }}
//               >
//                 <ListItemText
//                   primary={n.message}
//                   secondary={`From: ${n.sender?.name || "System"} • ${new Date(n.createdAt).toLocaleString()}`}
//                 />
//                 <IconButton
//                   edge="end"
//                   onClick={(e) => { e.stopPropagation(); handleDelete(n._id); }}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </ListItem>
//               <Divider />
//             </div>
//           ))}
//         </List>}
//       </div>

//       {/* Notification Dialog */}
//       <Dialog open={!!selectedNotification} onClose={() => setSelectedNotification(null)} fullWidth>
//         <DialogTitle>
//           <IconButton edge="start" onClick={() => setSelectedNotification(null)}>
//             <ArrowBackIcon />
//           </IconButton>
//           Notification
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText>{selectedNotification?.message}</DialogContentText>
//           <Typography variant="caption" color="text.secondary">
//             From: {selectedNotification?.sender?.name || "System"} • {selectedNotification ? new Date(selectedNotification.createdAt).toLocaleString() : ""}
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setSelectedNotification(null)}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Confirm Delete */}
//       <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
//         <DialogTitle>Delete Notification</DialogTitle>
//         <DialogContent><DialogContentText>Are you sure?</DialogContentText></DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
//           <Button color="error" onClick={confirmDelete}>Delete</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Confirm Delete All */}
//       <Dialog open={confirmAll} onClose={() => setConfirmAll(false)}>
//         <DialogTitle>Delete All Notifications</DialogTitle>
//         <DialogContent><DialogContentText>Delete all notifications permanently?</DialogContentText></DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmAll(false)}>Cancel</Button>
//           <Button color="error" onClick={confirmDeleteAll}>Delete All</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import {
//   fetchNotifications,
//   markNotificationAsRead,
//   deleteNotification,
//   deleteAllNotifications,
//   markAllNotificationsAsRead,
//   selectNotifications,
//   selectUnreadNotifications,
// } from "@/redux/slices/notificationSlice";

// import {
//   List, ListItem, ListItemText, Divider, Dialog, DialogActions,
//   DialogContent, DialogContentText, DialogTitle, Button, IconButton,
//   Typography, Toolbar, AppBar, Badge, Menu, MenuItem,
// } from "@mui/material";

// import DeleteIcon from "@mui/icons-material/Delete";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

// import TravellerNavbar from "@/components/TravellerNavbar";
// import GuideNavbar from "@/components/GuideNavbar";

// export default function NotificationsPage() {
//   const dispatch = useAppDispatch();
//   const notifications = useAppSelector(selectNotifications);
//   const unread = useAppSelector(selectUnreadNotifications);
//   const loading = useAppSelector((state) => state.notifications.loading);

//   const [role, setRole] = useState<string | null>(null);
//   const [selectedNotification, setSelectedNotification] = useState<any | null>(null);
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [confirmAll, setConfirmAll] = useState(false);

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const menuOpen = Boolean(anchorEl);

//   // Fetch and normalize role
//   useEffect(() => {
//     async function fetchRole() {
//       try {
//         const res = await fetch("/api/auth/get-cookie", { credentials: "include" });
//         const data = await res.json();
//         const normalizedRole = data.role?.toLowerCase() === "guide" ? "Guide" : "Traveller";
//         setRole(normalizedRole);
//       } catch (err) {
//         console.error("Error fetching role:", err);
//         setRole("Traveller");
//       }
//     }
//     fetchRole();
//   }, []);

//   // Fetch notifications once role is available
//   useEffect(() => {
//     if (role) dispatch(fetchNotifications());
//   }, [role, dispatch]);

//   // Mark as read instantly & sync with server
//   useEffect(() => {
//     if (selectedNotification && !selectedNotification.isRead) {
//       dispatch(markNotificationAsRead(selectedNotification._id));
//     }
//   }, [selectedNotification, dispatch]);

//   // Handlers
//   const handleDelete = (id: string) => { setDeleteId(id); setConfirmOpen(true); };
//   const confirmDelete = () => { if (deleteId) dispatch(deleteNotification(deleteId)); setConfirmOpen(false); setDeleteId(null); };
//   const confirmDeleteAll = () => { dispatch(deleteAllNotifications()); setConfirmAll(false); };
//   const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);
//   const handleMarkAllAsRead = () => { dispatch(markAllNotificationsAsRead()); handleMenuClose(); };

//   // Show loading if role is not yet fetched
//   if (!role) {
//     return <div className="h-screen flex items-center justify-center">Loading...</div>;
//   }

//   return (
//     <div className="h-screen flex flex-col">
//       {/* Navbar based on role */}
//       {role === "Guide" ? <GuideNavbar /> : <TravellerNavbar />}

//       {/* Notification Header */}
//       <AppBar position="static" color="default" className="shadow-md">
//         <Toolbar className="flex justify-between">
//           <Typography variant="h6">NOTIFICATIONS</Typography>
//           <div className="flex items-center gap-2">
//             <IconButton color="inherit">
//               {/* <Badge badgeContent={unread.length} color="error" /> */}
//             </IconButton>
//             <IconButton color="inherit" onClick={handleMenuClick}>
//               <MoreVertIcon />
//             </IconButton>
//             <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
//               <MenuItem onClick={handleMarkAllAsRead}>Mark All as Read</MenuItem>
//               <MenuItem onClick={() => setConfirmAll(true)}>Delete All</MenuItem>
//             </Menu>
//           </div>
//         </Toolbar>
//       </AppBar>

//       {/* Notification List */}
//       <div className="flex-grow overflow-y-auto bg-gray-100">
//         {loading ? (
//           <Typography className="p-4">Loading...</Typography>
//         ) : notifications.length === 0 ? (
//           <Typography className="p-4">No notifications found</Typography>
//         ) : (
//           <List>
//             {notifications.map((n) => (
//               <div key={n._id}>
//                 <ListItem
//                   onClick={() => setSelectedNotification(n)}
//                   sx={{
//                     cursor: "pointer",
//                     backgroundColor: n.isRead ? "white" : "#ebf8ff",
//                     "&:hover": { backgroundColor: n.isRead ? "#f5f5f5" : "#dbeafe" },
//                   }}
//                 >
//                   <ListItemText
//                     primary={n.message}
//                     secondary={`From: ${n.sender?.name || "System"} • ${new Date(n.createdAt).toLocaleString()}`}
//                   />
//                   <IconButton
//                     edge="end"
//                     onClick={(e) => { e.stopPropagation(); handleDelete(n._id); }}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </ListItem>
//                 <Divider />
//               </div>
//             ))}
//           </List>
//         )}
//       </div>

//       {/* Single Notification Dialog */}
//       <Dialog open={!!selectedNotification} onClose={() => setSelectedNotification(null)} fullWidth>
//         <DialogTitle>
//           <IconButton edge="start" onClick={() => setSelectedNotification(null)}>
//             <ArrowBackIcon />
//           </IconButton>
//           Notification
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText>{selectedNotification?.message}</DialogContentText>
//           <Typography variant="caption" color="text.secondary">
//             From: {selectedNotification?.sender?.name || "System"} • {selectedNotification ? new Date(selectedNotification.createdAt).toLocaleString() : ""}
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setSelectedNotification(null)}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Confirm Single Delete */}
//       <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
//         <DialogTitle>Delete Notification</DialogTitle>
//         <DialogContent><DialogContentText>Are you sure you want to delete this notification?</DialogContentText></DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
//           <Button color="error" onClick={confirmDelete}>Delete</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Confirm Delete All */}
//       <Dialog open={confirmAll} onClose={() => setConfirmAll(false)}>
//         <DialogTitle>Delete All Notifications</DialogTitle>
//         <DialogContent><DialogContentText>Delete all notifications permanently?</DialogContentText></DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmAll(false)}>Cancel</Button>
//           <Button color="error" onClick={confirmDeleteAll}>Delete All</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

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
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
  MoreVertical,
  X,
  Eye,
  EyeOff,
  User,
  Clock,
  Loader2
} from "lucide-react";

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
  const [selectedNotification, setSelectedNotification] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAll, setConfirmAll] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  // Fetch role
  useEffect(() => {
    async function fetchRole() {
      try {
        const res = await fetch("/api/auth/get-cookie", { credentials: "include" });
        const data = await res.json();
        const normalizedRole = data.role?.toLowerCase() === "guide" ? "Guide" : "Traveller";
        setRole(normalizedRole);
      } catch (err) {
        console.error("Error fetching role:", err);
        setRole("Traveller");
      }
    }
    fetchRole();
  }, []);

  // Fetch notifications
  useEffect(() => {
    if (open && role) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, open, role]);

  // Mark as read when selected
  useEffect(() => {
    if (selectedNotification && !selectedNotification.isRead) {
      dispatch(markNotificationAsRead(selectedNotification._id));
    }
  }, [selectedNotification, dispatch]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteNotification(deleteId));
    }
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const confirmDeleteAll = () => {
    dispatch(deleteAllNotifications());
    setConfirmAll(false);
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsRead());
    handleMenuClose();
  };

  const filteredNotifications = showUnreadOnly
    ? unreadNotifications
    : notifications;

  return (
    <>
      {/* Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-[#22252c]/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-[#fdfdfd] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-[#e2e0df] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#e2e0df] bg-gradient-to-r from-[#fdfdfd] to-[#e4e2e1]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#93c5fd]/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-[#1e3a8a]" />
              </div>
              <h2 className="text-xl font-bold text-[#22252c]">Notifications</h2>
              {unreadNotifications.length > 0 && (
                <span className="bg-[#ff9100] text-[#fdfdfd] text-xs px-2 py-1 rounded-full font-semibold">
                  {unreadNotifications.length}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2 text-[#333333] hover:text-[#363636] hover:bg-[#e4e2e1] rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative">
                <button
                  onClick={handleMenuOpen}
                  className="p-2 text-[#333333] hover:text-[#363636] hover:bg-[#e4e2e1] rounded-lg transition-colors duration-200"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {anchorEl && (
                  <div className="absolute right-0 top-12 w-48 bg-[#fdfdfd] rounded-xl shadow-xl border border-[#e2e0df] py-2 z-50">
                    <button
                      onClick={handleMarkAllAsRead}
                      className="w-full text-left px-4 py-3 text-sm text-[#363636] hover:bg-[#e4e2e1] hover:text-[#3b82f6] transition-colors duration-200 flex items-center gap-3"
                    >
                      <Eye className="w-4 h-4" />
                      Mark All as Read
                    </button>
                    <button
                      onClick={() => {
                        setShowUnreadOnly(!showUnreadOnly);
                        handleMenuClose();
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-[#363636] hover:bg-[#e4e2e1] hover:text-[#3b82f6] transition-colors duration-200 flex items-center gap-3"
                    >
                      {showUnreadOnly ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {showUnreadOnly ? "Show All" : "Show Unread"}
                    </button>
                    <button
                      onClick={() => {
                        setConfirmAll(true);
                        handleMenuClose();
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-[#ff9100] hover:bg-[#ff9100]/10 transition-colors duration-200 flex items-center gap-3"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete All
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b82f6]"></div>
                <span className="ml-3 text-[#333333]">Loading notifications...</span>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-[#ff9100]/10 border border-[#ff9100]/30 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-[#ff9100] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#ff9100]">Error</p>
                    <p className="text-sm text-[#363636]">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredNotifications.length === 0 && !error && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#e4e2e1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-[#333333]" />
                </div>
                <h3 className="text-lg font-semibold text-[#22252c] mb-2">
                  {showUnreadOnly ? "No unread notifications" : "No notifications"}
                </h3>
                <p className="text-[#363636] text-sm">
                  {showUnreadOnly
                    ? "You've read all your notifications!"
                    : "You're all caught up!"
                  }
                </p>
              </div>
            )}

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer group ${
                    notification.isRead
                      ? "bg-[#e4e2e1] border-[#e2e0df] hover:bg-[#e2e0df]"
                      : "bg-gradient-to-r from-[#93c5fd]/20 to-[#3b82f6]/20 border-[#93c5fd]/40 hover:shadow-lg"
                  }`}
                  onClick={() => setSelectedNotification(notification)}
                >
                  {/* Unread Indicator */}
                  {!notification.isRead && (
                    <div className="absolute top-3 left-3 w-2 h-2 bg-[#ff9100] rounded-full"></div>
                  )}

                  {/* Content */}
                  <div className="pl-4">
                    <p className={`text-sm leading-relaxed mb-2 ${
                      notification.isRead ? "text-[#363636]" : "text-[#22252c] font-medium"
                    }`}>
                      {notification.message}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-[#333333]">
                      {notification.sender?.name && (
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{notification.sender.name}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(notification.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                    {!notification.isRead && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(markNotificationAsRead(notification._id));
                        }}
                        className="p-1.5 bg-[#3b82f6] text-[#fdfdfd] rounded-lg hover:bg-[#1e3a8a] transition-colors duration-200"
                        title="Mark as read"
                      >
                        <CheckCircle className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notification._id);
                      }}
                      className="p-1.5 bg-[#ff9100] text-[#fdfdfd] rounded-lg hover:bg-[#e4e2e1] hover:text-[#ff9100] transition-colors duration-200"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Notification Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-[#22252c]/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#fdfdfd] rounded-2xl shadow-2xl max-w-md w-full border border-[#e2e0df]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#22252c]">Notification Details</h3>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="p-2 text-[#333333] hover:text-[#363636] hover:bg-[#e4e2e1] rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-[#e4e2e1] rounded-xl p-4">
                  <p className="text-[#363636] leading-relaxed">{selectedNotification.message}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-[#333333]">
                  {selectedNotification.sender?.name && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>From: {selectedNotification.sender.name}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(selectedNotification.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="flex-1 px-6 py-3 text-[#363636] bg-[#e4e2e1] hover:bg-[#e2e0df] rounded-xl font-semibold transition-all duration-300"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedNotification._id);
                    setSelectedNotification(null);
                  }}
                  className="flex-1 px-6 py-3 bg-[#ff9100] hover:bg-[#e4e2e1] hover:text-[#ff9100] text-[#fdfdfd] rounded-xl font-semibold transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-[#22252c]/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#fdfdfd] rounded-2xl shadow-2xl max-w-sm w-full border border-[#e2e0df]">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#ff9100]/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-[#ff9100]" />
                </div>
                <h3 className="text-lg font-bold text-[#22252c]">Delete Notification</h3>
              </div>

              <p className="text-[#363636] mb-6">Are you sure you want to delete this notification? This action cannot be undone.</p>

              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="flex-1 px-6 py-3 text-[#363636] bg-[#e4e2e1] hover:bg-[#e2e0df] rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-3 bg-[#ff9100] hover:bg-[#e4e2e1] hover:text-[#ff9100] text-[#fdfdfd] rounded-xl font-semibold transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Confirmation Modal */}
      {confirmAll && (
        <div className="fixed inset-0 bg-[#22252c]/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#fdfdfd] rounded-2xl shadow-2xl max-w-sm w-full border border-[#e2e0df]">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#ff9100]/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-[#ff9100]" />
                </div>
                <h3 className="text-lg font-bold text-[#22252c]">Delete All Notifications</h3>
              </div>

              <p className="text-[#363636] mb-6">Are you sure you want to delete all notifications? This action cannot be undone.</p>

              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmAll(false)}
                  className="flex-1 px-6 py-3 text-[#363636] bg-[#e4e2e1] hover:bg-[#e2e0df] rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteAll}
                  className="flex-1 px-6 py-3 bg-[#ff9100] hover:bg-[#e4e2e1] hover:text-[#ff9100] text-[#fdfdfd] rounded-xl font-semibold transition-all duration-300"
                >
                  Delete All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNotificationDrawer;