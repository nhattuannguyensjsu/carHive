import { View, Text, ScrollView, Image, StyleSheet, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import Logo from '../../../assets/images/logo.png';


const MyListingPage = () => {

  const { height } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showVerticalScrollIndicator={false}>
        <View>
          <View style={{ flexDirection: 'row' }}>

            <Image source={Logo}
              style={[styles.logo, { height: height * 0.1 }]}
              resizeMode="contain"
            />
            <Text style={styles.title}> CarHive </Text>

          </View>
          <Text> My Listing Page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "white",
    marginTop: "-10%"

  },
  logo: {
    marginLeft: 20,
    width: '20%',
  },
  title: {
    fontSize: 30,
    marginTop: 25,
    color: "#FAC503",
  },
});

export default MyListingPage