import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Rating,
  LinearProgress
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link as RouterLink } from 'react-router-dom';

const MediaItem = ({ item, onDelete, onUpdate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (window.confirm('Удалить эту запись?')) {
      onDelete(item.id);
    }
    handleClose();
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'planned': return 'default';
      case 'watching': return 'primary';
      case 'completed': return 'success';
      case 'dropped': return 'error';
      default: return 'default';
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'anime': return 'Аниме';
      case 'manga': return 'Манга';
      case 'series': return 'Сериал';
      default: return type;
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'planned': return 'Запланировано';
      case 'watching': return 'Смотрю';
      case 'completed': return 'Завершено';
      case 'dropped': return 'Брошено';
      default: return status;
    }
  };

  const progressPercentage = item.total_episodes > 0 
    ? (item.progress / item.total_episodes) * 100 
    : 0;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="140"
          image={item.image_url}
          alt={item.title}
          sx={{ objectFit: 'cover' }}
        />
        <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
          <Chip 
            label={getTypeLabel(item.type)} 
            size="small" 
            color="info"
            sx={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          />
          <Chip 
            label={getStatusLabel(item.status)} 
            size="small" 
            color={getStatusColor(item.status)}
            sx={{ color: 'white' }}
          />
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h3">
          {item.title}
        </Typography>

        {item.total_episodes > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Прогресс: {item.progress}/{item.total_episodes}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={progressPercentage} 
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
          <Box>
            <Typography component="legend">Рейтинг</Typography>
            <Rating value={item.rating} max={10} readOnly precision={0.5} />
            <Typography variant="body2" color="text.secondary">
              {item.rating}/10
            </Typography>
          </Box>

          <IconButton 
            aria-label="actions"
            onClick={handleClick}
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem 
          component={RouterLink}
          to={`/media/${item.id}`}
          onClick={handleClose}
        >
          <EditIcon sx={{ mr: 1 }} />
          Подробнее
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1 }} />
          Удалить
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default MediaItem;