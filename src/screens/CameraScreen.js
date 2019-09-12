import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { PrimaryButton } from '../components/styled-components/Buttons';
import { BarcodeFrame } from '../components/svg/BarcodeFrame';

function CameraScreen({ navigation }) {
  /* State Hooks and functions to change these states */
  const [hasCameraPermission, toggleCameraPermission] = useState(null);
  const [scanned, toggleScanned] = useState(false);
  /* Lifecycle method to check camera permission first */
  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      toggleCameraPermission(status === 'granted');
    };
    askPermission();
  }, []);
  /* method to build a product name from the API data */
  const generateName = (brand, name, quantity) => {
    let pbrand;
    /* only take the brand if it is different from the name */
    if (brand === name) {
      pbrand = '';
    } else {
      pbrand = brand;
    }
    let identifier = 0; // identifier tells which data is present
    identifier += pbrand === '' || pbrand === undefined ? 0 : 4;
    identifier += name === '' || name === undefined ? 0 : 2;
    identifier += quantity === '' || quantity === undefined ? 0 : 1;
    /* switch statement generates the optimal productName */
    switch (identifier) {
      case 1:
        return quantity;
      case 2:
        return name;
      case 3:
        return `${name} ${quantity}`;
      case 4:
        return pbrand;
      case 5:
        return `${pbrand} ${quantity}`;
      case 6:
        return `${pbrand} ${name}`;
      default:
        return `${pbrand} ${name} ${quantity}`;
    }
  };
  /* method to fetch the API data */
  const fetchProduct = async code => {
    try {
      const url = `https://products.sklinkusch.now.sh/?${code}`;
      const response = await fetch(url);
      const data = await response.json();
      /* destructuring important data */
      const {
        status,
        product: { brand, product_name, quantity, categories },
      } = await data;
      if (status === 1) {
        /* if the product is found in the database */
        /* (1) generate a product name */
        const productName = generateName(brand, product_name, quantity);
        /* (2) make an alert with the product name */
        alert(`Produkt erkannt: ${productName}`);
        /* (3) navigate to ProductFormScreen and pass the data */
        navigation.navigate('ProductFormScreen', {
          name: productName,
          categories: categories,
        });
      } else {
        /* if product is not in the database */
        /* (1) make an alert */
        alert('Produkt nicht in der Datenbank.');
        /* (2) navigate to the empty form screen */
        navigation.navigate('ProductFormScreen');
      }
    } catch (error) {
      /* show error message in an alert if there is an error */
      alert(`${error.message}`);
    }
  };
  const handleBarCodeScanned = ({ type, data }) => {
    /* if it is ean13 or ean8 */
    if (type === 32 || type === 64) {
      fetchProduct(data); // fetch the data from the products API
      toggleScanned(true); // set scanned to true, to avoid multiple scanning
    } else {
      toggleScanned(false); // scanned remains false for qr codes etc.
    }
  };
  if (hasCameraPermission === null) {
    /* Render this if camera permission has not been checked */
    return <Text>Frage Kameraerlaubnis ab.</Text>;
  } else if (hasCameraPermission === false) {
    /* Render this if camera permission is denied */
    return <Text>Kein Zugriff auf Kamera.</Text>;
  }
  /* Render this if camera permission is granted */
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <BarCodeScanner
        barCodeTypes={[
          BarCodeScanner.Constants.BarCodeType.ean8,
          BarCodeScanner.Constants.BarCodeType.ean13,
        ]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          flex: 2,
        }}
      />
      <BarcodeFrame />
      {scanned && (
        <PrimaryButton
          title={'Nochmals scannen'}
          style={{
            width: '70%',
            marginRight: 'auto',
            marginLeft: 'auto',
          }}
          onPress={() => toggleScanned(false)}
        />
      )}
      {/* Go to product input form if this button is tapped */}
      <PrimaryButton
        title={'Manuell eingeben'}
        style={{
          width: '70%',
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
        onPress={() => navigation.navigate('ProductFormScreen')}
      />
    </View>
  );
}

/* Navigation options */
CameraScreen.navigationOptions = {
  title: 'Scanne einen Barcode',
};

export default CameraScreen;