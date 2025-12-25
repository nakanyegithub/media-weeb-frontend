import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Container, 
  Card, 
  Heading, 
  Text, 
  FlexContainer,
  Badge,
  Button
} from '../components/styled/Common';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.primary};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const StatLabel = styled(Text)`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ChartContainer = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Statistics = ({ mediaItems }) => {
  const navigate = useNavigate();

  // Расчет статистики
  const stats = {
    total: mediaItems.length,
    anime: mediaItems.filter(item => item.type === 'anime').length,
    manga: mediaItems.filter(item => item.type === 'manga').length,
    series: mediaItems.filter(item => item.type === 'series').length,
    watching: mediaItems.filter(item => item.status === 'watching').length,
    completed: mediaItems.filter(item => item.status === 'completed').length,
    planned: mediaItems.filter(item => item.status === 'planned').length,
    dropped: mediaItems.filter(item => item.status === 'dropped').length,
    avgRating: mediaItems.reduce((acc, item) => acc + item.rating, 0) / mediaItems.length || 0,
    totalProgress: mediaItems.reduce((acc, item) => acc + item.progress, 0),
    totalEpisodes: mediaItems.reduce((acc, item) => acc + item.total_episodes, 0)
  };

  // Данные для графиков
  const typeData = [
    { name: 'Аниме', value: stats.anime, color: '#3f51b5' },
    { name: 'Манга', value: stats.manga, color: '#f50057' },
    { name: 'Сериалы', value: stats.series, color: '#4caf50' }
  ];

  const statusData = [
    { name: 'Смотрю', value: stats.watching, color: '#2196f3' },
    { name: 'Завершено', value: stats.completed, color: '#4caf50' },
    { name: 'Запланировано', value: stats.planned, color: '#ff9800' },
    { name: 'Брошено', value: stats.dropped, color: '#f44336' }
  ];

  const progressData = mediaItems
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 10)
    .map(item => ({
      name: item.title.length > 15 ? item.title.substring(0, 15) + '...' : item.title,
      progress: item.progress,
      rating: item.rating
    }));

  return (
    <Container>
      <FlexContainer justify="space-between" align="center" margin="0 0 2rem 0">
        <Heading variant="h3">Статистика коллекции</Heading>
        <Button onClick={() => navigate('/add')}>
          Добавить новое
        </Button>
      </FlexContainer>

      <StatsGrid>
        <StatCard>
          <EqualizerIcon style={{ fontSize: '2rem', color: '#3f51b5' }} />
          <StatValue color="primary">{stats.total}</StatValue>
          <StatLabel>Всего записей</StatLabel>
        </StatCard>

        <StatCard>
          <TrendingUpIcon style={{ fontSize: '2rem', color: '#4caf50' }} />
          <StatValue color="success">{stats.avgRating.toFixed(1)}</StatValue>
          <StatLabel>Средний рейтинг</StatLabel>
        </StatCard>

        <StatCard>
          <TrendingDownIcon style={{ fontSize: '2rem', color: '#f50057' }} />
          <StatValue color="secondary">
            {stats.totalEpisodes > 0 
              ? ((stats.totalProgress / stats.totalEpisodes) * 100).toFixed(1) + '%' 
              : '0%'}
          </StatValue>
          <StatLabel>Общий прогресс</StatLabel>
        </StatCard>
      </StatsGrid>

      <ChartContainer>
        <Heading variant="h5" margin="0 0 1rem 0">
          Распределение по типам
        </Heading>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={typeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {typeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer>
        <Heading variant="h5" margin="0 0 1rem 0">
          Статусы просмотра
        </Heading>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Количество" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer>
        <Heading variant="h5" margin="0 0 1rem 0">
          Топ по прогрессу
        </Heading>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="progress" stroke="#3f51b5" name="Прогресс" />
            <Line type="monotone" dataKey="rating" stroke="#f50057" name="Рейтинг" />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Container>
  );
};

export default Statistics;