import React, { useState } from 'react';
import {useWindowDimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import Logo from '../../../assets/images/logo.png';

const FeedbackPage = () => {
    const [defaultRating, setDefaultRating] = useState(0);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

    const [appRating, setAppRating] = useState(0);
    const [maxAppRating, setMaxAppRating] = useState([1, 2, 3, 4, 5]);

    const ImgFilled = require('../../../assets/icons/beehive.png');
    const ImgCorner = require('../../../assets/icons/beehive2.png');
    const { height } = useWindowDimensions();

    const CustomRating = () => {
        return (
            <View style={styles.CustomRatingStyle}>
                {
                    maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                                onPress={() => setDefaultRating(item)}>
                                <Image style={styles.ImgStyle}
                                    source={
                                        item <= defaultRating
                                            ? ImgFilled
                                            : ImgCorner
                                    } />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    const CustomAppRating = () => {
        return (
            <View style={styles.CustomRatingStyle}>
                {
                    maxAppRating.map((item, key) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                                onPress={() => setAppRating(item)}>
                                <Image style={styles.ImgStyle}
                                    source={
                                        item <= appRating
                                            ? ImgFilled
                                            : ImgCorner
                                    } />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safe}>
                <View > 
                    <View style={{ flexDirection: 'row' }}>

                        <Image source={Logo}
                            style={[styles.logo, { height: height * 0.1 }]}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}> CarHive </Text>

                    </View>
                    <Text style={styles.text}>
                        Thank you for using our application</Text>
                    <Text style={styles.text}> Give us some reviews about the buyer / seller</Text>
                    <CustomRating />
                
                    <TextInput multiline style={styles.input} type="text" placeholder="Write some reviews"
                    />

                    <Text style={styles.text}> Give us some reviews about our application </Text>
                    <CustomAppRating />

                    <TextInput multiline style={styles.input} type="text" placeholder="Write some reviews" />

                    <TouchableOpacity
                        style={[styles.button]}
                        activeOpacity={0.7}
                        onPress={() => alert(defaultRating)}
                    >
                        <Text style={{ color: 'black', textAlign: 'center' }}> Submit </Text>
                    </TouchableOpacity>

                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "white",
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20
    },
    CustomRatingStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,

    },
    ImgStyle: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        marginRight: 5,

    },
    button: {
        backgroundColor: "#FFD43C",
        width: "60%",
        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
    },
    input: {
        paddingTop: 5,
        backgroundColor: 'lightgrey',
        width: '90%',
        height: 100,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        marginVertical: 10,
        marginLeft: 20
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
})

export default FeedbackPage;
