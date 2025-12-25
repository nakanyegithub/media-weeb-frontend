import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Container,
  Card,
  Heading,
  Text,
  Button,
  Input,
  Select,
  FlexContainer,
  Divider
} from '../components/styled/Common';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaletteIcon from '@mui/icons-material/Palette';
import LanguageIcon from '@mui/icons-material/Language';
import SecurityIcon from '@mui/icons-material/Security';
import SaveIcon from '@mui/icons-material/Save';

const SettingsSection = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SettingItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: false,
    darkMode: false,
    language: 'ru',
    autoSave: true,
    privacy: 'public',
    theme: 'light',
    fontSize: 'medium'
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // В реальном приложении здесь будет запрос к API
    alert('Настройки сохранены!');
  };

  return (
    <Container>
      <FlexContainer justify="space-between" align="center" margin="0 0 2rem 0">
        <Heading variant="h3">Настройки</Heading>
        <Button 
          onClick={handleSave}
          startIcon={<SaveIcon />}
        >
          Сохранить настройки
        </Button>
      </FlexContainer>

      <SettingsSection>
        <SectionHeader>
          <NotificationsIcon style={{ fontSize: '1.5rem', color: '#3f51b5' }} />
          <Heading variant="h5">Уведомления</Heading>
        </SectionHeader>
        
        <SettingsGrid>
          <SettingItem>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications}
                  onChange={(e) => handleChange('notifications', e.target.checked)}
                />
              }
              label="Включить уведомления"
            />
          </SettingItem>
          
          <SettingItem>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.emailNotifications}
                  onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                />
              }
              label="Email уведомления"
            />
          </SettingItem>
        </SettingsGrid>
      </SettingsSection>

      <SettingsSection>
        <SectionHeader>
          <PaletteIcon style={{ fontSize: '1.5rem', color: '#3f51b5' }} />
          <Heading variant="h5">Внешний вид</Heading>
        </SectionHeader>
        
        <SettingsGrid>
          <SettingItem>
            <Text variant="body2" margin="0 0 0.5rem 0">Тема</Text>
            <Select
              value={settings.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
            >
              <option value="light">Светлая</option>
              <option value="dark">Темная</option>
              <option value="auto">Авто</option>
            </Select>
          </SettingItem>
          
          <SettingItem>
            <Text variant="body2" margin="0 0 0.5rem 0">Размер шрифта</Text>
            <Select
              value={settings.fontSize}
              onChange={(e) => handleChange('fontSize', e.target.value)}
            >
              <option value="small">Маленький</option>
              <option value="medium">Средний</option>
              <option value="large">Большой</option>
            </Select>
          </SettingItem>
        </SettingsGrid>
        
        <Divider />
        
        <SettingItem>
          <FormControlLabel
            control={
              <Switch
                checked={settings.darkMode}
                onChange={(e) => handleChange('darkMode', e.target.checked)}
              />
            }
            label="Темный режим"
          />
        </SettingItem>
      </SettingsSection>

      <SettingsSection>
        <SectionHeader>
          <LanguageIcon style={{ fontSize: '1.5rem', color: '#3f51b5' }} />
          <Heading variant="h5">Язык и регион</Heading>
        </SectionHeader>
        
        <SettingItem>
          <Text variant="body2" margin="0 0 0.5rem 0">Язык интерфейса</Text>
          <Select
            value={settings.language}
            onChange={(e) => handleChange('language', e.target.value)}
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="jp">日本語</option>
          </Select>
        </SettingItem>
      </SettingsSection>

      <SettingsSection>
        <SectionHeader>
          <SecurityIcon style={{ fontSize: '1.5rem', color: '#3f51b5' }} />
          <Heading variant="h5">Приватность</Heading>
        </SectionHeader>
        
        <SettingItem>
          <Text variant="body2" margin="0 0 0.5rem 0">Видимость коллекции</Text>
          <Select
            value={settings.privacy}
            onChange={(e) => handleChange('privacy', e.target.value)}
          >
            <option value="public">Публичная</option>
            <option value="private">Приватная</option>
            <option value="friends">Только друзьям</option>
          </Select>
        </SettingItem>
      </SettingsSection>
    </Container>
  );
};

export default Settings;