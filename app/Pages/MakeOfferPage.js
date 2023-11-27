import React, {Component} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
  FlatList,
  TextInput,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class MakeOfferPage extends Component {
  render() {
    return (
      <SafeAreaView
        style={styles.container}
        /* behavior="padding" */ behavior={
          Platform.OS === 'ios' ? 'padding' : null
        }>
        <View style={styles.setWidth}>
          <View style={styles.wrapImgLogo}>
            <Image
             // source={require('../../assets/img/logoCar.png')}
             source={require('../../../assets/icons/logoCar.png')}
              resizeMode="center"
              style={styles.innerImg}
            />
          </View>
        </View>
        <View style={styles.wrapWhite}>
          <View style={styles.wrapImgCar}>
            <Image
              source={require('../../../assets/icons/carmain2.png')}
              resizeMode="cover"
              style={styles.innerImg}
            />
          </View>
        </View>
        <Text style={styles.txtSeller}>Seller’s price</Text>
        <TouchableOpacity style={styles.wrapPrice}>
          <Text style={styles.txtPrice}>$ 14,998</Text>
        </TouchableOpacity>
        <Text style={{...styles.txtSeller, marginTop: hp('5%')}}>
          Your offer
        </Text>
        <TextInput
          placeholder="$"
          style={styles.txtInp}
          placeholderTextColor={'#000000'}
        />
        <TouchableOpacity style={{...styles.wrapPrice, marginTop: hp('5%')}}>
          <Text style={styles.txtPrice}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  setWidth: {
    width: wp('90%'),
    alignSelf: 'center',
  },
  txtSeller: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: hp('3%'),
  },
  wrapImgLogo: {
    width: wp('60%'),
    height: hp('10%'),
  },
  txtPrice: {
    color: '#000000',
    fontSize: 16,
  },
  wrapPrice: {
    backgroundColor: '#FFD43C',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: wp('35%'),
    height: hp('6%'),
    marginTop: hp('1%'),
  },
  txtInp: {
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: wp('35%'),
    height: hp('6%'),
    marginTop: hp('1%'),
    paddingHorizontal: wp('5%'),
  },
  wrapImgCar: {
    width: wp('90%'),
    height: hp('30%'),
  },
  innerImg: {
    width: '90%',
    height: '90%',
  },

  txtMark: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '700',
  },
  wrapWhite: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
