import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  Paper,
  Chip,
  Rating,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Card,
  CardMedia
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UpdateIcon from '@mui/icons-material/Update';
import MediaForm from '../components/MediaForm';

const MediaDetails = ({ mediaItems, onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const foundMedia = mediaItems.find(item => item.id === parseInt(id));
    if (foundMedia) {
      setMedia(foundMedia);
    }
  }, [id, mediaItems]);

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

  const getStatusColor = (status) => {
    switch(status) {
      case 'planned': return 'default';
      case 'watching': return 'primary';
      case 'completed': return 'success';
      case 'dropped': return 'error';
      default: return 'default';
    }
  };

  const handleUpdate = (updatedData) => {
    onUpdate(parseInt(id), updatedData);
    setEditDialogOpen(false);
    // Обновляем локальное состояние
    setMedia(prev => ({ ...prev, ...updatedData }));
  };

  const handleDelete = () => {
    navigate('/');
  };

  const progressPercentage = media?.total_episodes > 0 
    ? (media.progress / media.total_episodes) * 100 
    : 0;

  if (!media) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">Медиа не найдено</Typography>
        <Button 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Вернуться на главную
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {/* Кнопка назад */}
      <Button 
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
      >
        Назад
      </Button>

      <Grid container spacing={3}>
        {/* Изображение и основная информация */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={media.image_url}
              alt={media.title}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
          
          <Paper sx={{ p: 2, mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Chip 
                label={getTypeLabel(media.type)} 
                color="info"
                size="medium"
              />
              <Chip 
                label={getStatusLabel(media.status)} 
                color={getStatusColor(media.status)}
                size="medium"
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <CalendarTodayIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Добавлено: {media.created_at}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <UpdateIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Обновлено: {media.updated_at}
              </Typography>
            </Box>
          </Paper>

          {/* Кнопки действий */}
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setEditDialogOpen(true)}
              fullWidth
            >
              Редактировать
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteDialogOpen(true)}
              fullWidth
            >
              Удалить
            </Button>
          </Box>
        </Grid>

        {/* Детальная информация */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {media.title}
            </Typography>

            {/* Прогресс */}
            {media.total_episodes > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Прогресс просмотра
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="body1">
                    {media.progress} / {media.total_episodes}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ({progressPercentage.toFixed(1)}%)
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={progressPercentage} 
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
            )}

            {/* Рейтинг */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Рейтинг
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Rating value={media.rating} max={10} readOnly precision={0.5} size="large" />
                <Typography variant="h5">
                  {media.rating}/10
                </Typography>
              </Box>
            </Box>

            {/* Дополнительная информация */}
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Тип
                  </Typography>
                  <Typography variant="h6">
                    {getTypeLabel(media.type)}
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Статус
                  </Typography>
                  <Typography variant="h6">
                    {getStatusLabel(media.status)}
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Прогресс
                  </Typography>
                  <Typography variant="h6">
                    {media.progress}
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Всего эпизодов
                  </Typography>
                  <Typography variant="h6">
                    {media.total_episodes || 'Не указано'}
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    ID записи
                  </Typography>
                  <Typography variant="h6">
                    #{media.id}
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Рейтинг
                  </Typography>
                  <Typography variant="h6">
                    {media.rating}/10
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Диалог редактирования */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Редактировать запись</DialogTitle>
        <DialogContent>
          <MediaForm 
            initialData={media}
            onSubmit={handleUpdate}
            onCancel={() => setEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Диалог удаления */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Вы уверены, что хотите удалить "{media.title}"? Это действие нельзя отменить.
          </Alert>
          <Typography>
            Все данные об этом медиа будут удалены из вашей коллекции.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Отмена
          </Button>
          <Button 
            onClick={handleDelete} 
            color="error"
            variant="contained"
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MediaDetails;