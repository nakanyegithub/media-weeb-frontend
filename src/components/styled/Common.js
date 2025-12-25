import styled from 'styled-components';

// Контейнеры
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
  width: 100%;

  @media (max-width: 1200px) {
    padding: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const PageContainer = styled(Container)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: ${({ gap = 'md' }) => ({ theme }) => theme.spacing[gap]};
  ${({ direction = 'row' }) => `flex-direction: ${direction};`}
  ${({ justify = 'flex-start' }) => `justify-content: ${justify};`}
  ${({ align = 'stretch' }) => `align-items: ${align};`}
  ${({ wrap = 'nowrap' }) => `flex-wrap: ${wrap};`}
`;

// Карточки
export const Card = styled.div`
  background: ${({ theme }) => theme.colors.paper};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.md};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
    transform: ${({ hover = false }) => hover ? 'translateY(-2px)' : 'none'};
  }
`;

export const CardMedia = styled.div`
  width: 100%;
  height: ${({ height = '200px' }) => height};
  background: ${({ src }) => src ? `url(${src})` : ({ theme }) => theme.colors.greyLight};
  background-size: cover;
  background-position: center;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// Кнопки
export const Button = styled.button`
  background: ${({ variant = 'primary', theme }) => 
    variant === 'primary' ? theme.colors.primary : 
    variant === 'secondary' ? theme.colors.secondary : 
    'transparent'};
  color: ${({ variant = 'primary', theme }) => 
    variant === 'primary' || variant === 'secondary' ? '#fff' : theme.colors.text};
  border: ${({ variant = 'primary', theme }) => 
    variant === 'outlined' ? `2px solid ${theme.colors.primary}` : 'none'};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    background: ${({ variant = 'primary', theme }) => 
      variant === 'primary' ? theme.colors.primaryDark : 
      variant === 'secondary' ? theme.colors.secondaryDark : 
      variant === 'outlined' ? theme.colors.primaryLight + '20' : 
      theme.colors.greyLight};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.greyLight};
    color: ${({ theme }) => theme.colors.text};
  }
`;

// Формы
export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme, error }) => error ? theme.colors.error : theme.colors.greyLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.colors.paper};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.greyLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  background: ${({ theme }) => theme.colors.paper};
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

// Текст
export const Text = styled.p`
  font-size: ${({ variant = 'body1', theme }) => theme.typography[variant].fontSize};
  font-weight: ${({ variant = 'body1', theme }) => theme.typography[variant].fontWeight || 400};
  line-height: ${({ variant = 'body1', theme }) => theme.typography[variant].lineHeight};
  color: ${({ color = 'text', theme }) => theme.colors[color] || color};
  margin: ${({ margin = '0' }) => margin};
  text-align: ${({ align = 'left' }) => align};
`;

export const Heading = styled.h1`
  font-size: ${({ variant = 'h1', theme }) => theme.typography[variant].fontSize};
  font-weight: ${({ variant = 'h1', theme }) => theme.typography[variant].fontWeight};
  line-height: ${({ variant = 'h1', theme }) => theme.typography[variant].lineHeight};
  color: ${({ color = 'text', theme }) => theme.colors[color] || color};
  margin: ${({ margin = '0 0 1rem 0' }) => margin};
`;

// Разное
export const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.greyLight};
  margin: ${({ theme }) => `${theme.spacing.lg} 0`};
`;

export const Badge = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ color = 'primary', theme }) => theme.colors[color]};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  font-weight: 600;
  text-transform: uppercase;
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.greyLight};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;