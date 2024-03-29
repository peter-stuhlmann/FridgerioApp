import { createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ProductFormScreen from './screens/ProductFormScreen';
import ListScreen from './screens/ListScreen';
import SettingsScreen from './screens/SettingsScreen';
import DummyScreen from './screens/DummyScreen';
import SettingsLanguageScreen from './screens/SettingsLanguageScreen';
import SettingsNotificationsScreen from './screens/SettingsNotificationsScreen';
import LegalNoticeScreen from './screens/LegalNoticeScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import SettingsThemeScreen from './screens/SettingsThemeScreen';
import CameraScreen from './screens/CameraScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import { Colors } from './components/styled-components/Variables';

/*
----------
default values can be overwritten by adding the same property to the navigation options of each individual screen

https://reactnavigation.org/docs/en/stack-navigator.html
----------
*/

const defaultOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Colors.PrimaryColor,
    },
    headerTintColor: Colors.TertiaryColor,
    headerTitleStyle: {
      fontWeight: 'normal',
      color: Colors.TertiaryColor, // overwrites headerTintColor
    },
    headerBackTitle: ' ', // only the arrow without text; it's default on Android
    headerBackTitleStyle: {
      color: Colors.TertiaryColor,
    },
    /* gesturesEnabled enables swiping between screens, defaults to true for iOS and to false on Android */
    gesturesEnabled: true,
  },
};

const HomeStack = createStackNavigator(
  { HomeScreen, ProductFormScreen },
  defaultOptions
);
const AddStack = createStackNavigator(
  { CameraScreen, ProductFormScreen },
  defaultOptions
);
const ListStack = createStackNavigator(
  { ListScreen, ProductDetailScreen, ProductFormScreen },
  defaultOptions
);
const SettingsStack = createStackNavigator(
  {
    SettingsScreen,
    SettingsLanguageScreen,
    SettingsNotificationsScreen,
    SettingsThemeScreen,
    LegalNoticeScreen,
    PrivacyPolicyScreen,
  },
  defaultOptions
);

export { HomeStack, AddStack, ListStack, SettingsStack };

/*
----------
navigationOptions for screens inside of the navigator

header
React Element or a function that given HeaderProps returns a React Element, to display as a header. Setting to null hides header.

headerTitle
String, React Element or React Component used by the header. Defaults to scene title.

headerBackImage
React Element or Component to display custom image in header's back button.

headerBackTitle
Title string used by the back button on iOS, or null to disable label. Defaults to the previous scene's headerTitle. headerBackTitle has to be defined in the origin screen, not in the destination screen.

headerRight / headerLeft
React Element to display on the right side of the header, styled by headerRightContainerStyle and headerLeftContainerStyle. When a component is used for headerLeft, it receives a number of props when rendered (onPress, title, titleStyle and more)

headerTitleContainerStyle
Customize the style for the container of the headerTitle component, for example to add padding.

https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-for-screens-inside-of-the-navigator
----------
*/
