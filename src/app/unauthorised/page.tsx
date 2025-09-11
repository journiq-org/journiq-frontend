

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  IconButton,
  Avatar,
  Fade
} from '@mui/material';
import { 
  ShieldX, 
  Home, 
  ArrowLeft,
  Lock,
  AlertTriangle
} from 'lucide-react';

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

const  UnauthorizedPage = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: themeColors.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          fontWeight="700"
          sx={{ 
            color: themeColors.textDark,
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          journiq
        </Typography>
        <Typography
          variant="body1"
          sx={{ 
            color: themeColors.textSecondary,
            fontWeight: 500
          }}
        >
          Your Journey, Our Expertise
        </Typography>
      </Box>

      {/* Main Content Card */}
      <Fade in timeout={800}>
        <Card
          sx={{
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            backgroundColor: themeColors.white,
            border: `1px solid ${themeColors.border}`,
            maxWidth: '500px',
            width: '100%',
            overflow: 'visible',
            position: 'relative'
          }}
        >
          {/* Decorative top border */}
          <Box 
            sx={{ 
              height: '6px', 
              background: `linear-gradient(90deg, ${themeColors.secondary}, ${themeColors.primary})`,
              width: '100%',
              borderRadius: '24px 24px 0 0'
            }} 
          />

          <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
            {/* Icon */}
            <Box mb={4}>
              <Avatar 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  mx: 'auto', 
                  mb: 3,
                  backgroundColor: 'rgba(211, 47, 47, 0.1)',
                  color: '#D32F2F'
                }}
              >
                <ShieldX size={40} />
              </Avatar>
            </Box>

            {/* Title */}
            <Typography
              variant="h4"
              fontWeight="700"
              sx={{ 
                color: themeColors.textDark,
                mb: 3,
                fontSize: { xs: '1.8rem', md: '2.2rem' }
              }}
            >
              Access Restricted
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{ 
                color: themeColors.textSecondary,
                mb: 4,
                lineHeight: 1.6,
                maxWidth: '400px',
                mx: 'auto'
              }}
            >
              You don't have permission to access this page. Please contact support if you believe this is an error.
            </Typography>

            {/* Warning Box */}
            <Box 
              sx={{
                backgroundColor: 'rgba(211, 47, 47, 0.05)',
                border: '1px solid rgba(211, 47, 47, 0.2)',
                borderRadius: '12px',
                p: 3,
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <AlertTriangle size={20} color="#D32F2F" />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#D32F2F',
                  fontWeight: 500
                }}
              >
                This area requires special permissions to access.
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
              <Button
                variant="outlined"
                onClick={() => router.back()}
                sx={{
                  borderColor: themeColors.border,
                  color: themeColors.textPrimary,
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: themeColors.primary,
                    color: themeColors.primary,
                    backgroundColor: 'rgba(59, 130, 246, 0.05)'
                  },
                  flex: 1
                }}
              >
                <ArrowLeft size={18} style={{ marginRight: 8 }} />
                Go Back
              </Button>
              
              <Button
                variant="contained"
                onClick={() => router.push('/')}
                sx={{
                  backgroundColor: themeColors.primary,
                  '&:hover': { 
                    backgroundColor: themeColors.secondary,
                    transform: 'translateY(-2px)'
                  },
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                  transition: 'all 0.2s ease',
                  flex: 1
                }}
              >
                <Home size={18} style={{ marginRight: 8 }} />
                Home
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Fade>

      {/* Footer */}
      <Box mt={4} textAlign="center">
        <Typography 
          variant="body2" 
          sx={{ 
            color: themeColors.textSecondary,
            fontWeight: 500
          }}
        >
          Need help? Contact our support team
        </Typography>
      </Box>
    </Box>
  );
}

export default UnauthorizedPage