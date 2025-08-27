"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { updateBookingStatus } from "@/redux/slices/guideBookingSlice";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Container,
  Paper,
} from "@mui/material";
import GuideNavbar from "@/components/GuideNavbar";

const EditStatusPage = () => {
  const { id } = useParams(); // bookingId from URL
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState("confirmed");

  const handleUpdate = () => {
    if (!id) return;
    dispatch(updateBookingStatus({ bookingId: id as string, status }));
    router.push("/booking/guide-booking"); // navigate back after update
  };

  return (
    <>
      <GuideNavbar />
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="bold"
            color="primary"
          >
            Update Booking Status
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Select the new status for this booking.
          </Typography>

          <Select
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ mb: 4 }}
          >
            <MenuItem value="confirmed">✅ Confirmed</MenuItem>
            <MenuItem value="completed">🎉 Completed</MenuItem>
            <MenuItem value="cancelled">❌ Cancelled</MenuItem>
            <MenuItem value="pending">⏳ Pending</MenuItem>
          </Select>

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => router.push("/booking/guide-booking")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
            >
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default EditStatusPage;
