'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchGuideBookings, updateBookingStatus } from '@/redux/slices/guideBookingSlice';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';

const GuideBookingsPage = () => {
  const dispatch = useAppDispatch();
  const { bookings, loading } = useAppSelector((state) => state.guideBookings);
  const [statusMap, setStatusMap] = useState<{ [key: string]: string }>({});

  // Fetch guide bookings on mount
  useEffect(() => {
    dispatch(fetchGuideBookings());
  }, [dispatch]);

  // Handle status update for a booking
  const handleStatusUpdate = (bookingId: string, status: string) => {
    setStatusMap({ ...statusMap, [bookingId]: status });
    dispatch(updateBookingStatus({ bookingId, status }));
  };

  if (loading)
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  if (!bookings.length)
    return (
      <Box textAlign="center" mt={5}>
        <Typography>No bookings assigned to you</Typography>
      </Box>
    );

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        My Bookings
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={3}>
        {bookings.map((booking) => (
          <Card key={booking._id} sx={{ flex: '1 1 45%', minWidth: 300 }}>
            <CardContent>
              <Typography variant="h6">{booking.tour?.title || 'No Title'}</Typography>
              <Typography>
                Traveller: {booking.user?.name} ({booking.user?.email})
              </Typography>
              <Typography>
                Booking Date: {new Date(booking.date).toLocaleDateString()}
              </Typography>
              <Typography>People: {booking.numOfPeople}</Typography>
              <Typography>Total Price: ${booking.totalPrice.toFixed(2)}</Typography>
              <Typography>Status: {booking.status}</Typography>
            </CardContent>
            <CardActions>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusMap[booking._id] || booking.status}
                  onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                >
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default GuideBookingsPage;
