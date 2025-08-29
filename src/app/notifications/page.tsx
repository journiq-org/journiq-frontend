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

"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  fetchNotifications,
  markNotificationAsRead,
  deleteNotification,
  deleteAllNotifications,
  markAllNotificationsAsRead,
  selectNotifications,
  selectUnreadNotifications,
} from "@/redux/slices/notificationSlice";

import {
  List, ListItem, ListItemText, Divider, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Button, IconButton,
  Typography, Toolbar, AppBar, Badge, Menu, MenuItem,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import TravellerNavbar from "@/components/TravellerNavbar";
import GuideNavbar from "@/components/GuideNavbar";

export default function NotificationsPage() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  const unread = useAppSelector(selectUnreadNotifications);
  const loading = useAppSelector((state) => state.notifications.loading);

  const [role, setRole] = useState<string | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAll, setConfirmAll] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  // Fetch and normalize role
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

  // Fetch notifications once role is available
  useEffect(() => {
    if (role) dispatch(fetchNotifications());
  }, [role, dispatch]);

  // Mark as read instantly & sync with server
  useEffect(() => {
    if (selectedNotification && !selectedNotification.isRead) {
      dispatch(markNotificationAsRead(selectedNotification._id));
    }
  }, [selectedNotification, dispatch]);

  // Handlers
  const handleDelete = (id: string) => { setDeleteId(id); setConfirmOpen(true); };
  const confirmDelete = () => { if (deleteId) dispatch(deleteNotification(deleteId)); setConfirmOpen(false); setDeleteId(null); };
  const confirmDeleteAll = () => { dispatch(deleteAllNotifications()); setConfirmAll(false); };
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleMarkAllAsRead = () => { dispatch(markAllNotificationsAsRead()); handleMenuClose(); };

  // Show loading if role is not yet fetched
  if (!role) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar based on role */}
      {role === "Guide" ? <GuideNavbar /> : <TravellerNavbar />}

      {/* Notification Header */}
      <AppBar position="static" color="default" className="shadow-md">
        <Toolbar className="flex justify-between">
          <Typography variant="h6">NOTIFICATIONS</Typography>
          <div className="flex items-center gap-2">
            <IconButton color="inherit">
              {/* <Badge badgeContent={unread.length} color="error" /> */}
            </IconButton>
            <IconButton color="inherit" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
              <MenuItem onClick={handleMarkAllAsRead}>Mark All as Read</MenuItem>
              <MenuItem onClick={() => setConfirmAll(true)}>Delete All</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Notification List */}
      <div className="flex-grow overflow-y-auto bg-gray-100">
        {loading ? (
          <Typography className="p-4">Loading...</Typography>
        ) : notifications.length === 0 ? (
          <Typography className="p-4">No notifications found</Typography>
        ) : (
          <List>
            {notifications.map((n) => (
              <div key={n._id}>
                <ListItem
                  onClick={() => setSelectedNotification(n)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: n.isRead ? "white" : "#ebf8ff",
                    "&:hover": { backgroundColor: n.isRead ? "#f5f5f5" : "#dbeafe" },
                  }}
                >
                  <ListItemText
                    primary={n.message}
                    secondary={`From: ${n.sender?.name || "System"} • ${new Date(n.createdAt).toLocaleString()}`}
                  />
                  <IconButton
                    edge="end"
                    onClick={(e) => { e.stopPropagation(); handleDelete(n._id); }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        )}
      </div>

      {/* Single Notification Dialog */}
      <Dialog open={!!selectedNotification} onClose={() => setSelectedNotification(null)} fullWidth>
        <DialogTitle>
          <IconButton edge="start" onClick={() => setSelectedNotification(null)}>
            <ArrowBackIcon />
          </IconButton>
          Notification
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedNotification?.message}</DialogContentText>
          <Typography variant="caption" color="text.secondary">
            From: {selectedNotification?.sender?.name || "System"} • {selectedNotification ? new Date(selectedNotification.createdAt).toLocaleString() : ""}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedNotification(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Single Delete */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Notification</DialogTitle>
        <DialogContent><DialogContentText>Are you sure you want to delete this notification?</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete All */}
      <Dialog open={confirmAll} onClose={() => setConfirmAll(false)}>
        <DialogTitle>Delete All Notifications</DialogTitle>
        <DialogContent><DialogContentText>Delete all notifications permanently?</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmAll(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDeleteAll}>Delete All</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

