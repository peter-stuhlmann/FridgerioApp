import React from 'react';
import { ScrollView } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import { RowCheckLink } from '../components/styled-components/Links';
import { Colors } from '../components/styled-components/Variables';

function SettingsThemeScreen() {
  return (
    <ScrollView>
      <Textbox bottomLine={Colors.PrimaryUtilityColor}>
        <RowCheckLink title="Light" name="md-checkmark" />
        <RowCheckLink title="Dark" />
      </Textbox>
    </ScrollView>
  );
}

SettingsThemeScreen.navigationOptions = {
  title: 'Wähle ein Theme',
};

export default SettingsThemeScreen;