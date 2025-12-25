import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from './styles/GlobalStyles';
import { PageContainer } from './components/styled/Common';
import Header from './components/Header';
import Home from './pages/Home';
import AddMedia from './pages/AddMedia';
import MediaDetails from './pages/MediaDetails';
import EditMedia from './pages/EditMedia';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Моковые данные
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
        image_url: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=300&fit=crop",
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
        image_url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=300&fit=crop",
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
        image_url: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=300&fit=crop",
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
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #3f51b5',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Header />
        <PageContainer>
          <Routes>
            <Route path="/" element={
              <Home 
                mediaItems={mediaItems}
                onDelete={handleDeleteMedia}
                onUpdate={handleUpdateMedia}
              />
            } />
            
            <Route path="/add" element={
              <AddMedia onAdd={handleAddMedia} />
            } />
            
            <Route path="/media/:id" element={
              <MediaDetails 
                mediaItems={mediaItems}
                onUpdate={handleUpdateMedia}
                onDelete={handleDeleteMedia}
              />
            } />
            
            <Route path="/media/:id/edit" element={
              <EditMedia 
                mediaItems={mediaItems}
                onUpdate={handleUpdateMedia}
              />
            } />
            
            <Route path="/statistics" element={
              <Statistics mediaItems={mediaItems} />
            } />
            
            <Route path="/settings" element={
              <Settings />
            } />
            
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </PageContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;