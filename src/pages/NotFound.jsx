import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Button, Heading, Text } from '../components/styled/Common';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import HomeIcon from '@mui/icons-material/Home';

const NotFoundContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 60vh;
`;

const IconWrapper = styled.div`
  font-size: 6rem;
  color: ${({ theme }) => theme.colors.greyLight};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <IconWrapper>
        <SearchOffIcon fontSize="inherit" />
      </IconWrapper>
      
      <Heading variant="h2" margin="0 0 1rem 0">
        404
      </Heading>
      
      <Text variant="h5" color="textSecondary" margin="0 0 2rem 0">
        Страница не найдена
      </Text>
      
      <Text variant="body1" color="textSecondary" margin="0 0 2rem 0">
        Запрашиваемая вами страница не существует или была перемещена.
      </Text>
      
      <Button 
        onClick={() => navigate('/')}
        startIcon={<HomeIcon />}
      >
        Вернуться на главную
      </Button>
    </NotFoundContainer>
  );
};

export default NotFound;