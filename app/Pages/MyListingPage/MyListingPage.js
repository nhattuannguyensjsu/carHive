import React, {Component} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Listing1 extends Component {
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
              source={require('../../assets/img/logoCar.png')}
              resizeMode="center"
              style={styles.innerImg}
            />
          </View>
          <Text style={styles.txtListing}>
            Your feedback makes us better !!! {'\n'}Thank you for using our
            application
          </Text>
          <Text style={styles.txtListing1}>
            Give us some reviews about buyer
          </Text>
          <View style={styles.wrapImgStar}>
            <Image
              source={require('../../assets/img/halfStar.png')}
              resizeMode="center"
              style={styles.innerImg}
            />
          </View>
          <TextInput style={styles.txtInp} multiline />
          <Text style={styles.txtListing1}>
            Give us some reviews about our application
          </Text>
          <View style={styles.wrapImgStar}>
            <Image
              source={require('../../assets/img/fullStar.png')}
              resizeMode="center"
              style={styles.innerImg}
            />
          </View>
          <TextInput style={styles.txtInp} multiline />
          <TouchableOpacity
            style={styles.wrapSub}
            onPress={() => this.props.navigation.navigate('Message')}>
            <Text style={styles.txtSub}>Submit Reviews</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  setWidth: {
    width: wp('90%'),
    alignSelf: 'center',
    marginTop: hp('2%'),
  },
  wrapSub: {
    backgroundColor: '#FFD43C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3%'),
    width: wp('40%'),
    alignSelf: 'center',
    height: hp('4%'),
    borderRadius: 30,
  },
  txtSub: {
    color: '#00000',
    fontSize: 16,
    fontWeight: '400',
  },
  txtInp: {
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
    width: wp('70%'),
    borderRadius: 10,
    height: hp('16%'),
  },
  txtListing: {
    color: '#00000',
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'center',
  },
  txtListing1: {
    color: '#00000',
    fontSize: 16,
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: hp('3%'),
  },

  wrapImg: {
    width: wp('30%'),
    height: wp('30%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapImgLogo: {
    width: wp('60%'),
    height: hp('8%'),
  },
  wrapImgStar: {
    width: wp('70%'),
    height: hp('8%'),
    alignSelf: 'center',
  },
  innerImg: {
    width: '90%',
    height: '90%',
  },
});

      

