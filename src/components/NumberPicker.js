import React from 'react';
import { Text, Picker } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';

export default class NumberPicker extends React.Component {
  // Accepts a maximum number and returns a picker with ascending numbers from 1 to maximum
  CreateNumberPicker(maxNum) {
    const numPicker = [];
    for (let i = 1; i <= maxNum; i++) {
      numPicker.push(<Picker.Item label={`${i}`} value={i} key={i} />);
    }
    return numPicker;
  }

  render() {
    const { title, maxNum } = this.props;
    return (
      <Textbox>
        <Text>{title}</Text>
        <Picker prompt={title} selectedValue={1}>
          {this.CreateNumberPicker(maxNum)}
        </Picker>
      </Textbox>
    );
  }
}
