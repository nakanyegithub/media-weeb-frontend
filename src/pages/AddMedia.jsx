import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Alert,
  Snackbar
} from '@mui/material';
import MediaForm from '../components/MediaForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

const AddMedia = ({ onAdd }) => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleSubmit = (formData) => {
    onAdd(formData);
    setSnackbar({
      open: true,
      message: 'Медиа успешно добавлено!',
      severity: 'success'
    });
    
    // Переход на главную через 1.5 секунды
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton 
          onClick={handleCancel}
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Добавить новое медиа
        </Typography>
      </Box>

      <Typography variant="body1" color="text.secondary" paragraph>
        Заполните форму ниже, чтобы добавить новую запись в вашу коллекцию.
      </Typography>

      <MediaForm 
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddMedia;