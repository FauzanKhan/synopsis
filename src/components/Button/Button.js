import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.medium};
  border: none;
  padding: 10px;
  border-radius: 4px;
  min-width: 200px;
  text-align: center;
  cursor: pointer;

  &:focus {
    outline: none;
    border: none;
  }
`;
