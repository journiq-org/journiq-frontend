'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { publicViewTourDetails } from '@/redux/slices/tourSlice'
import { createBooking, clearBookingState, checkAvailability } from '@/redux/slices/bookingSlice'
import toast from 'react-hot-toast'
import TravellerNavbar from '@/components/TravellerNavbar'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
  Fade,
  Chip,
  Avatar,
  Divider,
  Paper,
  IconButton
} from '@mui/material'
import {
  Calendar,
  Users,
  IndianRupee,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Search,
  CreditCard
} from 'lucide-react'

const themeColors = {
  background: '#e2e0df',
  primary: '#3b82f6',
  secondary: '#ff9100',
  white: '#fdfdfd',
  lightBlue: '#93c5fd',
  textPrimary: '#333333',
  textSecondary: '#363636',
  textDark: '#22252c',
  lightGray: '#f8f7f5',
  border: '#e4e2e1',
};

const BookingPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const tourId = searchParams.get('tourId') || ''

  const { selectedTour, isLoading } = useAppSelector((state) => state.tour)
  const { successMessage, error: bookingError, availability, loading: bookingLoading } = useAppSelector((state) => state.booking)

  const [selectedDate, setSelectedDate] = useState('')
  const [numOfPeople, setNumOfPeople] = useState(1)
  const [availabilityChecked, setAvailabilityChecked] = useState(false)

  // Fetch tour details on mount
  useEffect(() => {
    if (tourId) dispatch(publicViewTourDetails(tourId))
  }, [dispatch, tourId])

  // Handle toast notifications for success/error
  useEffect(() => {
    if (bookingError) {
      toast.error(bookingError)
      dispatch(clearBookingState())
    }
    if (successMessage) {
      toast.success(successMessage)
      dispatch(clearBookingState())
      router.push('/booking/my-booking')
    }
  }, [bookingError, successMessage, dispatch, router])

  // Check availability
  const handleCheckAvailability = async () => {
    if (!selectedDate || numOfPeople < 1) {
      toast.error('Please select a date and number of people')
      return
    }
    setAvailabilityChecked(true)
    await dispatch(checkAvailability({ tourId, date: selectedDate, numOfPeople }))
  }

  // Confirm booking
  const handleBooking = () => {
    if (!availability || !availability.available) {
      toast.error(availability?.message || 'No slots available for this date')
      return
    }
    dispatch(createBooking({ tourId, date: selectedDate, numOfPeople }))
  }

  if (isLoading || !selectedTour)
    return (
      <>
        <TravellerNavbar />
        <Box 
          display="flex" 
          flexDirection="column"
          justifyContent="center" 
          alignItems="center"
          minHeight="100vh"
          sx={{ backgroundColor: themeColors.background }}
        >
          <CircularProgress size={60} sx={{ color: themeColors.primary, mb: 2 }} />
          <Typography variant="h6" sx={{ color: themeColors.textPrimary }}>
            Loading tour details...
          </Typography>
        </Box>
      </>
    )

  const totalPrice = selectedTour.price * numOfPeople

  return (
    <>
      <TravellerNavbar />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: themeColors.background,
          py: { xs: 4, md: 8 },
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Header Section */}
        <Box maxWidth="900px" mx="auto" mb={6}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <IconButton
              onClick={() => router.push(`/tours/details/${tourId}`)}
              sx={{
                color: themeColors.primary,
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                '&:hover': { backgroundColor: themeColors.primary, color: themeColors.white }
              }}
            >
              <ArrowLeft size={20} />
            </IconButton>
            <Typography
              variant="h3"
              fontWeight="700"
              sx={{ color: themeColors.textDark }}
            >
              Book Your Tour
            </Typography>
          </Box>
          
          <Typography
            variant="body1"
            sx={{ 
              color: themeColors.textSecondary,
              mb: 4
            }}
          >
            Reserve your spot for an unforgettable adventure
          </Typography>
        </Box>

        {/* Status Messages */}
        {(bookingError || successMessage) && (
          <Box maxWidth="900px" mx="auto" mb={4}>
            <Fade in timeout={600}>
              <Alert 
                severity={bookingError ? "error" : "success"}
                sx={{
                  borderRadius: '12px',
                  '& .MuiAlert-icon': {
                    color: bookingError ? '#D32F2F' : '#2E7D32'
                  }
                }}
              >
                {bookingError || successMessage}
              </Alert>
            </Fade>
          </Box>
        )}

        {/* Main Content */}
        <Box maxWidth="900px" mx="auto">
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={4} mb={6}>
            {/* Tour Details Card */}
            <Card
              sx={{
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                backgroundColor: themeColors.white,
                border: `1px solid ${themeColors.border}`,
                height: 'fit-content'
              }}
            >
              <Box 
                sx={{ 
                  height: '6px', 
                  background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.secondary})`,
                  width: '100%',
                  borderRadius: '20px 20px 0 0'
                }} 
              />

              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <Avatar sx={{ backgroundColor: themeColors.primary, color: themeColors.white }}>
                    <MapPin size={20} />
                  </Avatar>
                  <Typography variant="h6" fontWeight="600" sx={{ color: themeColors.textDark }}>
                    Tour Details
                  </Typography>
                </Box>

                <Typography variant="h5" fontWeight="700" sx={{ color: themeColors.textDark, mb: 2 }}>
                  {selectedTour.title}
                </Typography>
                
                <Typography variant="body2" sx={{ color: themeColors.textSecondary, mb: 3, lineHeight: 1.6 }}>
                  {selectedTour.description}
                </Typography>

                <Box sx={{ backgroundColor: themeColors.lightGray, p: 3, borderRadius: '12px' }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <IndianRupee size={18} color={themeColors.secondary} />
                    <Box>
                      <Typography variant="body2" sx={{ color: themeColors.textSecondary, fontWeight: 500 }}>
                        Price per person
                      </Typography>
                      <Typography variant="h6" sx={{ color: themeColors.secondary, fontWeight: 600 }}>
                        ₹{selectedTour.price?.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Clock size={18} color={themeColors.primary} />
                    <Box>
                      <Typography variant="body2" sx={{ color: themeColors.textSecondary, fontWeight: 500 }}>
                        Duration
                      </Typography>
                      <Typography variant="body1" sx={{ color: themeColors.textPrimary }}>
                        {selectedTour.duration} days
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={2}>
                    <Star size={18} color={themeColors.secondary} />
                    <Box>
                      <Typography variant="body2" sx={{ color: themeColors.textSecondary, fontWeight: 500 }}>
                        Rating
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body1" sx={{ color: themeColors.textPrimary }}>
                          {selectedTour.rating}
                        </Typography>
                        <Typography variant="body2" sx={{ color: themeColors.textSecondary }}>
                          / 5
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Booking Form Card */}
            <Card
              sx={{
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                backgroundColor: themeColors.white,
                border: `1px solid ${themeColors.border}`,
                height: 'fit-content'
              }}
            >
              <Box 
                sx={{ 
                  height: '6px', 
                  background: `linear-gradient(90deg, ${themeColors.secondary}, ${themeColors.primary})`,
                  width: '100%',
                  borderRadius: '20px 20px 0 0'
                }} 
              />

              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" gap={2} mb={4}>
                  <Avatar sx={{ backgroundColor: themeColors.secondary, color: themeColors.white }}>
                    <CreditCard size={20} />
                  </Avatar>
                  <Typography variant="h6" fontWeight="600" sx={{ color: themeColors.textDark }}>
                    Booking Details
                  </Typography>
                </Box>

                {/* Date Selection */}
                <Box mb={3}>
                  <Typography variant="body1" fontWeight="600" sx={{ color: themeColors.textDark, mb: 2 }}>
                    Select Travel Date
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value)
                      setAvailabilityChecked(false)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: themeColors.lightGray,
                        '& fieldset': {
                          borderColor: themeColors.border,
                        },
                        '&:hover fieldset': {
                          borderColor: themeColors.primary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: themeColors.primary,
                        },
                      }
                    }}
                  >
                    <MenuItem value="">
                      <em>Select a date</em>
                    </MenuItem>
                    {selectedTour.availability?.map((slot) => (
                      <MenuItem 
                        key={slot.date} 
                        value={slot.date}
                        disabled={slot.slots === 0}
                      >
                        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                          <Typography>
                            {new Date(slot.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </Typography>
                          <Chip
                            label={slot.slots === 0 ? 'Full' : `${slot.slots} slots`}
                            size="small"
                            sx={{
                              backgroundColor: slot.slots === 0 ? '#FFE8E8' : '#E8F5E8',
                              color: slot.slots === 0 ? '#D32F2F' : '#2E7D32',
                              fontWeight: 600
                            }}
                          />
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                {/* Number of People */}
                <Box mb={3}>
                  <Typography variant="body1" fontWeight="600" sx={{ color: themeColors.textDark, mb: 2 }}>
                    Number of Travelers
                  </Typography>
                  <TextField
                    type="number"
                    fullWidth
                    value={numOfPeople}
                    onChange={(e) => {
                      setNumOfPeople(Number(e.target.value))
                      setAvailabilityChecked(false)
                    }}
                    inputProps={{ min: 1, max: 20 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: themeColors.lightGray,
                        '& fieldset': {
                          borderColor: themeColors.border,
                        },
                        '&:hover fieldset': {
                          borderColor: themeColors.primary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: themeColors.primary,
                        },
                      }
                    }}
                  />
                </Box>

                {/* Check Availability Button */}
                <Button
                  onClick={handleCheckAvailability}
                  disabled={!selectedDate || numOfPeople < 1 || bookingLoading}
                  fullWidth
                  sx={{
                    backgroundColor: themeColors.secondary,
                    '&:hover': { 
                      backgroundColor: '#e65100',
                      transform: 'translateY(-2px)'
                    },
                    '&:disabled': {
                      backgroundColor: themeColors.border,
                      color: themeColors.textSecondary
                    },
                    borderRadius: '12px',
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(255, 145, 0, 0.3)',
                    transition: 'all 0.2s ease',
                    mb: 3
                  }}
                >
                  {bookingLoading ? (
                    <>
                      <CircularProgress size={20} sx={{ color: themeColors.white, mr: 1 }} />
                      Checking...
                    </>
                  ) : (
                    <>
                      <Search size={20} style={{ marginRight: 8,color: themeColors.white }} />
                      <div className='text-white'>
                      Check Availability
                      </div>
                    </>
                  )}
                </Button>

                {/* Availability Status */}
                {availabilityChecked && availability && (
                  <Paper 
                    elevation={0}
                    sx={{
                      p: 3,
                      mb: 3,
                      borderRadius: '12px',
                      backgroundColor: availability.available ? '#E8F5E8' : '#FFE8E8',
                      border: `1px solid ${availability.available ? '#4CAF50' : '#F44336'}`
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      {availability.available ? (
                        <CheckCircle size={24} color="#2E7D32" />
                      ) : (
                        <XCircle size={24} color="#D32F2F" />
                      )}
                      <Box>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: availability.available ? '#2E7D32' : '#D32F2F',
                            fontWeight: 600
                          }}
                        >
                          {availability.available
                            ? `✅ ${availability.slots} slots available`
                            : availability.message || 'No slots available'}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                )}

                <Divider sx={{ mb: 3, borderColor: themeColors.border }} />

                {/* Price Summary */}
                <Box sx={{ backgroundColor: themeColors.lightGray, p: 3, borderRadius: '12px', mb: 4 }}>
                  <Typography variant="h6" fontWeight="600" sx={{ color: themeColors.textDark, mb: 2 }}>
                    Price Summary
                  </Typography>
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography sx={{ color: themeColors.textSecondary }}>
                      ₹{selectedTour.price?.toLocaleString()} × {numOfPeople} traveler{numOfPeople > 1 ? 's' : ''}
                    </Typography>
                    <Typography variant="h6" sx={{ color: themeColors.secondary, fontWeight: 600 }}>
                      ₹{totalPrice?.toLocaleString()}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2, borderColor: themeColors.border }} />
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{ color: themeColors.textDark, fontWeight: 600 }}>
                      Total Amount
                    </Typography>
                    <Typography variant="h5" sx={{ color: themeColors.primary, fontWeight: 700 }}>
                      ₹{totalPrice?.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>

                {/* Confirm Booking Button */}
                <Button
                  onClick={handleBooking}
                  disabled={!availability || !availability.available || bookingLoading}
                  fullWidth
                  sx={{
                    backgroundColor: themeColors.primary,
                    '&:hover': { 
                      backgroundColor: themeColors.secondary,
                      transform: 'translateY(-2px)'
                    },
                    '&:disabled': {
                      backgroundColor: themeColors.border,
                      color: themeColors.textSecondary
                    },
                    borderRadius: '12px',
                    py: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(237, 240, 245, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {bookingLoading ? (
                    <>
                      <CircularProgress size={20} sx={{ color: themeColors.white, mr: 1 }} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} style={{ marginRight: 8 , color:themeColors.white }} />
                      <div className='text-white'>
                      Confirm Booking
                      </div>
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default BookingPage