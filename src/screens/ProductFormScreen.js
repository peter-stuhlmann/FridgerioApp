import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
  Picker,
  DatePickerIOS,
  DatePickerAndroid,
  Platform,
} from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '../components/styled-components/Buttons';
import { Textbox } from '../components/styled-components/Boxes';
import { Input } from '../components/styled-components/Inputs';

const categories = [
  { id: '1', name: 'Alle', icon: 'food' },
  { id: '2', name: 'Obst&Gemüse', icon: 'food-apple' },
  { id: '3', name: 'Milchprodukte', icon: 'food-croissant' },
  { id: '4', name: 'Nudeln, Reis usw.', icon: 'food-fork-drink' },
  { id: '5', name: 'Getränke', icon: 'food-variant' },
];

const labels = [
  { id: '1', color: 'red', chosen: false },
  { id: '2', color: 'hotpink', chosen: true },
  { id: '3', color: 'orange', chosen: false },
  { id: '4', color: 'yellow', chosen: false },
  { id: '5', color: 'green', chosen: false },
  { id: '6', color: 'blue', chosen: false },
];

// BBDatePicker returns the date picker compatible with the OS
function BBDatePickerIOS() {
  return (
    <DatePickerIOS
      initialDate={new Date()}
      minimumDate={new Date()}
      mode="date"
    />
  );
}

function BBDatePickerAndroid() {
  // DatePickerAndroid.open({
  //   date: new Date(),
  // });
  return <Text>Not available yet</Text>;
}

const BBDatePicker = Platform.select({
  ios: () => BBDatePickerIOS,
  android: () => BBDatePickerAndroid,
})();

// Returns picker with category names
function CategoryPicker() {
  return (
    <React.Fragment>
      <Input
        inputLabel="Kategorie"
        placeholder="Bitte wähle eine Kategorie"
        editable={false}
        defaultValue={categories[1].name}
      />
      <Picker
        prompt="Kategorie"
        selectedValue={categories[1].id}
        onValueChange={itemValue =>
          console.warn(`Category ${itemValue} selected`)}
      >
        <Picker.Item label="Bitte wähle eine Kategorie" value="0" />
        {categories.map(category => (
          <Picker.Item
            label={category.name}
            value={category.id}
            key={category.id}
          />
        ))}
      </Picker>
    </React.Fragment>
  );
}

// Returns a list of colored labels
function AddLabels() {
  return (
    <Textbox>
      <Text>Füge ein Label hinzu</Text>
      <FlatList
        horizontal
        data={labels}
        keyExtractor={label => label.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.warn('clicked')}>
            <Ionicons
              name={item.chosen ? 'md-checkbox' : 'md-square'}
              style={{ color: item.color, fontSize: 32, paddingRight: 10 }}
            />
          </TouchableOpacity>
        )}
      />
    </Textbox>
  );
}

// Accepts a maximum number and returns a picker with ascending numbers from 1 to maximum
function CreateNumberPicker(max) {
  const numberPicker = [];
  for (let i = 1; i <= max; i++) {
    numberPicker.push(<Picker.Item label={`${i}`} value={i} key={i} />);
  }
  return numberPicker;
}

function ProductFormScreen() {
  return (
    <ScrollView>
      <Input inputLabel="Name" placeholder="z.B. Apfel" editable />

      {/* Large category icon */}
      <MaterialCommunityIcons
        name="food-apple"
        style={{
          color: '#7da10d',
          fontSize: 150,
          width: 150,
          height: 150,
          paddingRight: 15,
          backgroundColor: '#1b4e55',
          alignSelf: 'flex-end',
        }}
      />

      <CategoryPicker />

      <Textbox>
        <Text>Menge</Text>
        <Picker prompt="Menge" selectedValue={1}>
          {CreateNumberPicker(5)}
        </Picker>
      </Textbox>

      <Textbox>
        <Text>Mindesthaltbarkeitsdatum</Text>
        <BBDatePicker />
      </Textbox>

      <Textbox>
        <Text>Benachrichtigung</Text>
        <Picker prompt="Benachrichtigung" selectedValue={1}>
          {CreateNumberPicker(14)}
        </Picker>
      </Textbox>

      <AddLabels />

      <Input
        inputLabel="Notiz"
        placeholder="Add custom note"
        multiline
        editable
        textAlignVertical="top"
      />

      <FlatList
        data={[
          { key: 'x', name: 'Abbrechen' },
          { key: 'v', name: 'Speichern' },
        ]}
        keyExtractor={item => item.key}
        renderItem={({ item }) => <PrimaryButton title={item.name} />}
      />
    </ScrollView>
  );
}

ProductFormScreen.navigationOptions = {
  title: 'Neues Produkt',
  headerRight: (
    <Text>
      <Ionicons name="md-trash" size={22} color="white" />
    </Text>
  ),
};

export default ProductFormScreen;
