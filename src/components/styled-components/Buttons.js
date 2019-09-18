import React from 'react';
import styled from 'styled-components/native';
import { Colors } from './Variables';

// Primary Button
const StyledPrimaryButton = styled.TouchableOpacity`
  background-color: ${props => props.color || Colors.SecondaryColor};
  padding: 3px 5px;
  margin: 3px 0;
  width: 40%;
  border-radius: 5px;
`;
const StyledPrimaryButtonText = styled.Text`
  text-align: center;
  font-size: 18px;
  text-decoration: ${props => (props.active ? 'underline' : 'none')};
`;
export const PrimaryButton = props => {
  const { color, title, style, onPress, active } = props;
  return (
    <StyledPrimaryButton color={color} onPress={onPress} style={style}>
      <StyledPrimaryButtonText active={active}>{title}</StyledPrimaryButtonText>
    </StyledPrimaryButton>
  );
};
