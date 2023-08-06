import React, {useState} from 'react';
import {ScrollView, View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import Profile from '../../../assets/icons/profile.png';
import Helpcenter from '../../../assets/icons/helpcenter.png';
import Listing from '../../../assets/icons/listing.png';
import Fav from '../../../assets/icons/fav.png';

import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfilePage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const {height} = useWindowDimensions();
    const Navigation = useNavigation();
    
    const onRegisterPressed = () => {
        Navigation.navigate('SignUpConfirmationPage');
    }

    const onSignInPressed = () => {
        Navigation.navigate('SignInPage');
    }

    return (
        <SafeAreaView> 
        <ScrollView showVerticalScrollIndicator={false}>
        <View> 
        <View style={{flexDirection: 'row', marginTop: 15}}>

            <Image source={Logo} 
            style={[styles.logo, {height: height*0.3}]} 
            resizeMode="contain" 
            />
            <Text style={styles.title}> CarHive </Text>
  
        </View>
        <View style={styles.root}> 

            <Image source={Profile} 
            style={[styles.profile, {height: height*0.3}]} 
            resizeMode="contain" 
            />

            <Text style={styles.text}> Nhat Tuan Nguyen </Text>
        </View>
        
        <View >
            <Text style={styles.text_sub} > Name:             Nhat Tuan Nguyen </Text>
            
            <Text style={styles.text_sub} > Email:             nhattuan.nguyen@sjsu.edu </Text>
            
            <Text style={styles.text_sub} > Password:       ********* </Text>         
        </View>

        <View style={{flexDirection: 'row'}}>

            <Image source={Helpcenter} style = {styles.icon}
            resizeMode="contain" 
            />
            <Text style={styles.text_sub}> Help Center </Text>
  
        </View>

        <View style={{flexDirection: 'row'}}>

            <Image source={Listing} style = {styles.icon}
            resizeMode="contain" 
            />
            <Text style={styles.text_sub}> My Listing </Text>

        </View>

        <View style={{flexDirection: 'row'}}>

            <Image source={Fav} style = {styles.icon}
            resizeMode="contain" 
            />
            <Text style={styles.text_sub}> Favorites </Text>

        </View>

        </View>
        </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center'
    },

    logo: {
        marginLeft: 30,
        alignItems: 'left',
        width: '100%',
        maxWidth: 100,
        maxHeight: 200,
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
        fontWeight: 'bold'
    },
    text_sub: {
        fontSize: 18,
        margin: 20,
    },
    title: {
        fontSize: 40,
        marginTop: 75,
        fontFamily: 'bold',
        color: "#FAC503",
    },
    icon: {
        marginTop: 15,
        marginLeft: 25,
        alignItems: 'left',
        maxHeight: 30,
        maxWidth: 30
    }
    
});

export default ProfilePage;