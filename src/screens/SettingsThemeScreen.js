import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

function SettingsThemeScreen() {
  return (
    <ScrollView>
      <LanguageLinks>
        <GermanLink>
          <GermanLabel>Deutsch</GermanLabel>
          <Ionicons name="md-checkmark" size={24} />
        </GermanLink>
        <EnglishLink>
          <EnglishLabel>English</EnglishLabel>
        </EnglishLink>
      </LanguageLinks>
    </ScrollView>
  );
}

export default SettingsThemeScreen;

const LanguageLinks = styled.View`
  padding: 5px 15px;
  margin: 5px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const GermanLink = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const GermanLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;

const EnglishLink = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const EnglishLabel = styled.Text`
  padding: 4px 0;
  font-size: 16px;
`;
