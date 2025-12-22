import React, { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MediaList from '../components/MediaList';

const Home = ({ mediaItems, onDelete, onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: mediaItems.length,
    anime: mediaItems.filter(item => item.type === 'anime').length,
    manga: mediaItems.filter(item => item.type === 'manga').length,
    series: mediaItems.filter(item => item.type === 'series').length,
    watching: mediaItems.filter(item => item.status === 'watching').length,
    completed: mediaItems.filter(item => item.status === 'completed').length,
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Моя медиа-коллекция
      </Typography>

      {/* Статистика */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={2}>
          <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">{stats.total}</Typography>
            <Typography variant="body2" color="text.secondary">Всего</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">{stats.anime}</Typography>
            <Typography variant="body2" color="text.secondary">Аниме</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">{stats.manga}</Typography>
            <Typography variant="body2" color="text.secondary">Манга</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">{stats.series}</Typography>
            <Typography variant="body2" color="text.secondary">Сериалы</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">{stats.watching}</Typography>
            <Typography variant="body2" color="text.secondary">Смотрю</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">{stats.completed}</Typography>
            <Typography variant="body2" color="text.secondary">Завершено</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Фильтры и поиск */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Поиск по названию..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Тип</InputLabel>
              <Select
                value={filterType}
                label="Тип"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="all">Все типы</MenuItem>
                <MenuItem value="anime">Аниме</MenuItem>
                <MenuItem value="manga">Манга</MenuItem>
                <MenuItem value="series">Сериалы</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Статус</InputLabel>
              <Select
                value={filterStatus}
                label="Статус"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">Все статусы</MenuItem>
                <MenuItem value="planned">Запланировано</MenuItem>
                <MenuItem value="watching">Смотрю</MenuItem>
                <MenuItem value="completed">Завершено</MenuItem>
                <MenuItem value="dropped">Брошено</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Stack direction="row" spacing={1}>
              <Chip 
                label={`Найдено: ${filteredItems.length}`}
                color="primary"
                variant="outlined"
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Список медиа */}
      <MediaList 
        mediaItems={filteredItems}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </Box>
  );
};

// Вспомогательный компонент Paper
const Paper = ({ children, elevation, sx }) => (
  <Box
    sx={{
      backgroundColor: 'white',
      borderRadius: 2,
      boxShadow: elevation === 1 ? '0 2px 4px rgba(0,0,0,0.1)' : '0 4px 8px rgba(0,0,0,0.1)',
      ...sx
    }}
  >
    {children}
  </Box>
);

export default Home;