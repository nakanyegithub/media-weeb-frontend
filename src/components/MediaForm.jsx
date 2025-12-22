import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  Paper
} from '@mui/material';

const MediaForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    type: initialData.type || 'anime',
    status: initialData.status || 'planned',
    progress: initialData.progress || 0,
    total_episodes: initialData.total_episodes || 0,
    rating: initialData.rating || 0,
    image_url: initialData.image_url || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Название"
              name="title"
              value={formData.title}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Тип</InputLabel>
              <Select
                name="type"
                value={formData.type}
                label="Тип"
                onChange={handleChange}
              >
                <MenuItem value="anime">Аниме</MenuItem>
                <MenuItem value="manga">Манга</MenuItem>
                <MenuItem value="series">Сериал</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Статус</InputLabel>
              <Select
                name="status"
                value={formData.status}
                label="Статус"
                onChange={handleChange}
              >
                <MenuItem value="planned">Запланировано</MenuItem>
                <MenuItem value="watching">Смотрю</MenuItem>
                <MenuItem value="completed">Завершено</MenuItem>
                <MenuItem value="dropped">Брошено</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box>
              <Typography gutterBottom>
                Прогресс: {formData.progress}
              </Typography>
              <Slider
                name="progress"
                value={formData.progress}
                onChange={(e, value) => handleSliderChange('progress', value)}
                valueLabelDisplay="auto"
                min={0}
                max={formData.total_episodes || 100}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Всего эпизодов/глав"
              name="total_episodes"
              value={formData.total_episodes}
              onChange={handleChange}
              variant="outlined"
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box>
              <Typography gutterBottom>
                Рейтинг: {formData.rating}/10
              </Typography>
              <Slider
                name="rating"
                value={formData.rating}
                onChange={(e, value) => handleSliderChange('rating', value)}
                valueLabelDisplay="auto"
                step={0.5}
                min={0}
                max={10}
                marks={[
                  { value: 0, label: '0' },
                  { value: 5, label: '5' },
                  { value: 10, label: '10' }
                ]}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ссылка на изображение"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              variant="outlined"
              placeholder="https://example.com/image.jpg"
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              {onCancel && (
                <Button
                  variant="outlined"
                  onClick={onCancel}
                >
                  Отмена
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                {initialData.id ? 'Обновить' : 'Добавить'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default MediaForm;