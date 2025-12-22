import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import MediaItem from './MediaItem';

const MediaList = ({ mediaItems, onDelete, onUpdate }) => {
  if (mediaItems.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="textSecondary">
          Нет добавленных медиа. Добавьте первую запись!
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {mediaItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <MediaItem 
            item={item}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaList;