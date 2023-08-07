import React, {useState} from 'react';
import {ScrollView, View, Text,TextInput, Image, StyleSheet, useWindowDimensions} from 'react-native';
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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const {height} = useWindowDimensions();
    const Navigation = useNavigation();
    
    const onSearchPressed = () => {
        Navigation.navigate('SignInPage')
    }
   
    return (
        <SafeAreaView> 
        <ScrollView showVerticalScrollIndicator={false}>
        <View> 
        <View style={{flexDirection: 'row'}}>

            <Image source={Logo} 
            style={[styles.logo, {height: height*0.3}]} 
            resizeMode="contain" 
            />
            <Text style={styles.title}> CarHive </Text>
  
        </View>
        <Text style={{fontWeight: 'bold', fontSize: 40, fontFamily: 'bold',
                    textAlign: 'left', marginLeft: 40}}> Vehicle </Text>
        
        <View style={{flexDirection: 'row'}}>

            <Image source={Location} style={[styles.icons, {height: height*0.3}]} 
            resizeMode="contain"
            />
            <Image source={Swap} style={[styles.icon_sub, {height: height*0.3}]} 
            resizeMode="contain"
            />
            <Image source={Filter} style={[styles.icon_sub, {height: height*0.3}]} 
            resizeMode="contain"
            />
  
        </View>
        
        <View style={{flexDirection: 'row'}}>
            <TextInput style={{
                backgroundColor: "lightgrey",
                padding: 10 ,
                borderRadius: 10,
                fontSize: 15,
                marginTop: 15,
                paddingLeft: 40 ,
                width: 400,
                marginLeft: 40
                
                }}
                placeholder='Search by Year, Model or Make'
                placeholderTextColor="black"  />
            <Image source={require('../../../assets/icons/search.png')}
                  resizeMode='contain'
                  style={{
                    width: 30, height: 30,
                    marginTop: 20,
                    marginLeft: 10,
                    alignItems: 'left'
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
    icons: {
        marginTop: 30,
        marginLeft: 50,
        alignItems: 'left',
        maxHeight: 30,
        maxWidth: 30
    },
    icon_sub: {
        marginTop: 30,
        alignItems: 'flex-end',
        maxHeight: 30,
        maxWidth: 30
    },

    custom:{
        alignItems: 'flex-end',

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

export default Homepage;