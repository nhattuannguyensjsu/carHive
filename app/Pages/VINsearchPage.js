// VINSearchPage.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, 
  useWindowDimensions, StyleSheet, TouchableOpacity,ScrollView, Image} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../assets/images/logo.png';
import Goback from '../../assets/icons/goback.png';
import { useNavigation } from '@react-navigation/native';

const VINSearchPage = () => {
  const [vin, setVin] = useState('');
  const [carInfo, setCarInfo] = useState(null);
  const [salvageInfo, setSalvageInfo] = useState(null);
  const [error, setError] = useState(null);
  const { height } = useWindowDimensions();
  const Navigation = useNavigation();

  const flattenObject = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, key) => {
      const propKey = `${prefix}${key}`;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        return { ...acc, ...flattenObject(obj[key], `${propKey}.`) };
      }
      return { ...acc, [propKey]: obj[key] };
    }, {});
  };

  const searchVIN = async () => {
    try {
      const carInfoOptions = {
        method: 'GET',
        url: 'https://vindecoder.p.rapidapi.com/decode_vin',
        params: {
          vin: vin
        },
        headers: {
          'X-RapidAPI-Key': '3344d43135mshf5ef6f8b1605ac3p1d4a5bjsn231837c90b84',
          'X-RapidAPI-Host': 'vindecoder.p.rapidapi.com'
        }
      };

      const carInfoResponse = await axios.request(carInfoOptions);
      setCarInfo(carInfoResponse.data);

      const salvageCheckOptions = {
        method: 'GET',
        url: 'https://vindecoder.p.rapidapi.com/salvage_check',
        params: {
          vin: vin
        },
        headers: {
          'X-RapidAPI-Key': '3344d43135mshf5ef6f8b1605ac3p1d4a5bjsn231837c90b84',
          'X-RapidAPI-Host': 'vindecoder.p.rapidapi.com'
        }
      };

      const salvageCheckResponse = await axios.request(salvageCheckOptions);

      // Assuming the salvage information is directly in the response
      const salvageInfoData = salvageCheckResponse.data;

      // Check if salvageInfoData is defined and not empty
      if (salvageInfoData !== undefined && Object.keys(salvageInfoData).length > 0) {
        setSalvageInfo(salvageInfoData);
      } else {
        setSalvageInfo(null);
      }

      setError(null);
    } catch (error) {
      console.error(error);
      setError('Error fetching car information. Please check your VIN and try again.');
      setCarInfo(null);
      setSalvageInfo(null);
    }
  };

  return (
    <SafeAreaView style={styles.safe}> 
      <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => Navigation.navigate("Homepage")}>
                        <Image source={Goback}
                            style={[styles.goback, { height: height * 0.05 }]}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
      <Image source={Logo}
          style={[styles.logo, { height: height * 0.1 }]}
          resizeMode="contain"
      />
      <Text style={styles.title1}> CarHive </Text>
      </View>

      <Text style={styles.title}>VIN Search</Text>
      <View style={{ flexDirection: 'row' }}>

      <TextInput
        style={styles.input}
        placeholder="Enter VIN"
        value={vin}
        onChangeText={(text) => setVin(text)}
      />
      <TouchableOpacity onPress={searchVIN}>
            <Image
                style={{
                    width: 40,
                    height: 40,
                    marginTop: 15,
                    marginLeft: 10,
                }}
                source={require('../../assets/icons/search.png')} resizeMode='contain' />
        </TouchableOpacity>
      </View>
      {carInfo && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Car Information:</Text>
          {Object.entries(flattenObject(carInfo)).map(([key, value]) => {
            // Exclude keys starting with 'success' and 'vin'
            if (!key.toLowerCase().startsWith('success') && !key.toLowerCase().startsWith('vin')) {
              const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
              const displayKey = formattedKey.startsWith('Specification') ? formattedKey.split('.').pop() : formattedKey;
              return <Text key={key}>{`${displayKey}: ${value}`}</Text>;
            }
            return null;
          })}
        </View>
      )}

      {salvageInfo && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Salvage Check:</Text>
          {Object.entries(flattenObject(salvageInfo)).map(([key, value]) => {
            const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

            // Remove prefix 'info.' from the key
            const displayKey = formattedKey.replace(/^Info\./i, '');

            // Exclude the 'Salvage' key
            if (displayKey.toLowerCase() === 'salvage') {
              return null;
            }

            // Check if the key contains 'success' or 'info'
            if (!displayKey.toLowerCase().includes('success') && !displayKey.toLowerCase().includes('info')) {
              return <Text key={key}>{`${displayKey}: ${value}`}</Text>;
            }

            return null;
          })}

          {/* Additional check for 'success' property */}
          {salvageInfo.success !== undefined && (
            <Text>
              {salvageInfo.success
                ? 'This car is salvage title'
                : 'There is no salvage history'}
            </Text>
          )}
        </View>
      )}




      {error && <Text style={styles.errorText}>{error}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  logo: {
    marginLeft: 20,
    width: '20%',
},
  safe: {
    flex: 1,
    backgroundColor: "white",
    marginTop: "-10%",
    marginBottom: "15%"
},
title1: {
  fontSize: 30,
  marginTop: 25,
  color: "#FAC503",
},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 20,
    fontSize: 18,
    marginTop: 10,
    paddingLeft: 20,
    width: "80%",
    marginLeft: 10
  },
  resultContainer: {
    marginTop: 16,
    marginLeft: 20
  },
  resultLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,

  },
  errorText: {
    color: 'red',
    marginTop: 16,
  },
  goback: {
    width: 30,
    height: 30,
    marginTop: 25,
    marginLeft: 20,
    marginRight: -10
}
});

export default VINSearchPage;