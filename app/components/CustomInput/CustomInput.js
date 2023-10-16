import React from "react";
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style = {styles.container}>
        <TextInput
            value = {value}
            onChangeText={setValue}
            placeholder=""
            style = {styles.input}
            secureTextEntry={secureTextEntry}
            
        />
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        backgroundColor: 'lightgrey',
        width: '50%',
        height: 30,
        

        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 15,

        paddingHorizontal: 15,
        marginVertical: 10,
    },
    input: {
        margin: 5
    },
})

export default CustomInput;