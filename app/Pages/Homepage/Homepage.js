import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/images/logo.png';
import Location from '../../../assets/icons/location.png';
import Swap from '../../../assets/icons/swap.png';
import Filter from '../../../assets/icons/filter.png';
import Search from '../../../assets/icons/search.png';
import Tabs from '../../navigation/Tabs';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RollInRight } from 'react-native-reanimated';
import { SearchBar } from 'react-native-screens';
import SearchBox from '../../components/SearchBox/SearchBox';

const Homepage = () => {

    const { height } = useWindowDimensions();
    const Navigation = useNavigation();

    const onSearchPressed = () => {
        Navigation.navigate('SignInPage')
    }

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

                    <Text style={{
                        fontSize: 30, textAlign: 'left', marginLeft: 40
                    }}> Vehicle </Text>

                    <View style={{ flexDirection: 'row' }}>

                        <Image source={Location} style={[styles.icons, { height: height * 0.3 }]}
                            resizeMode="contain"
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={Swap} style={[styles.icon_sub, { height: height * 0.3 }]}
                                resizeMode="contain"
                            />
                            <Image source={Filter} style={[styles.icon_sub1, { height: height * 0.3 }]}
                                resizeMode="contain"
                            />
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <TextInput style={{
                            backgroundColor: "lightgrey",
                            padding: 10,
                            borderRadius: 20,
                            fontSize: 15,
                            marginTop: 10,
                            paddingLeft: 20,
                            width: "83%",
                            marginLeft: 10

                        }}
                            placeholder='Search by Year, Model or Make'
                            placeholderTextColor="black" />
                        <Image source={require('../../../assets/icons/search.png')}
                            resizeMode='contain'
                            style={{
                                width: 40, height: 40,
                                marginTop: 15,
                                marginLeft: 10,
                            }} />


                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
    },
    safe: {
        flex: 1,
        backgroundColor: "white",
    },
    icons: {
        marginTop: 10,
        marginLeft: 40,
        maxHeight: 30,
        maxWidth: 30,
    },
    icon_sub: {
        marginTop: 10,
        maxHeight: 30,
        maxWidth: 30,
        marginLeft: 200
    },
    icon_sub1: {
        marginTop: 10,
        maxHeight: 30,
        maxWidth: 30,
        marginLeft: 5
    },
    custom: {
        alignItems: 'flex-end',
    },

    logo: {
        marginLeft: 20,
        width: '20%',
    },
    profile: {
        width: '100%',
        maxWidth: 150,
        maxHeight: 150,
        alignItems: 'center',

    },
    text: {
        fontSize: 25,
        margin: 1,
    },
    text_sub: {
        fontSize: 18,
        margin: 20,
    },
    title: {
        fontSize: 30,
        marginTop: 15,
        color: "#FAC503",
    },
    icon: {
        marginTop: 15,
        marginLeft: 25,
        maxHeight: 30,
        maxWidth: 30
    }

});

export default Homepage;