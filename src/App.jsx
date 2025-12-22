import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import AddMedia from './pages/AddMedia';
import MediaDetails from './pages/MediaDetails';
import { Container } from '@mui/material';

function App() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Моковые данные для демонстрации
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        title: "Атака титанов",
        type: "anime",
        status: "completed",
        progress: 25,
        total_episodes: 25,
        rating: 10,
        image_url: "https://via.placeholder.com/300x200?text=Attack+on+Titan",
        created_at: "2024-01-15",
        updated_at: "2024-01-20"
      },
      {
        id: 2,
        title: "Берсерк",
        type: "manga",
        status: "watching",
        progress: 357,
        total_episodes: 0,
        rating: 9,
        image_url: "https://via.placeholder.com/300x200?text=Berserk",
        created_at: "2024-01-10",
        updated_at: "2024-01-18"
      },
      {
        id: 3,
        title: "Во все тяжкие",
        type: "series",
        status: "planned",
        progress: 0,
        total_episodes: 62,
        rating: 0,
        image_url: "https://via.placeholder.com/300x200?text=Breaking+Bad",
        created_at: "2024-01-05",
        updated_at: "2024-01-05"
      }
    ];

    setTimeout(() => {
      setMediaItems(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddMedia = (newMedia) => {
    const newItem = {
      ...newMedia,
      id: mediaItems.length + 1,
      created_at: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0]
    };
    setMediaItems([...mediaItems, newItem]);
  };

  const handleDeleteMedia = (id) => {
    setMediaItems(mediaItems.filter(item => item.id !== id));
  };

  const handleUpdateMedia = (id, updatedData) => {
    setMediaItems(mediaItems.map(item => 
      item.id === id 
        ? { ...item, ...updatedData, updated_at: new Date().toISOString().split('T')[0] }
        : item
    ));
  };

  if (loading) {
    return <div className="loading">Загрузка данных...</div>;
  }

  return (
    <Router>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                mediaItems={mediaItems}
                onDelete={handleDeleteMedia}
                onUpdate={handleUpdateMedia}
              />
            } 
          />
          <Route 
            path="/add" 
            element={
              <AddMedia 
                onAdd={handleAddMedia}
              />
            } 
          />
          <Route 
            path="/media/:id" 
            element={
              <MediaDetails 
                mediaItems={mediaItems}
                onUpdate={handleUpdateMedia}
              />
            } 
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;