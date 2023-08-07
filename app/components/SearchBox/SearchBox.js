// import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
// import React from 'react';
// import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

// const SearchBox = () => {
//     const animation = useSharedValue(0);
//     const animatedStyle = useAnimatedStyle( () => {
//         return {
//             width:
//                 animation.value == 1
//                     ? withTiming(300, {duration: 500})
//                     : withTiming(0, {duration: 500}),
//                 };

//     });

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Animated.View
//             stlye= {[ 
//                 { width: 300, height: 50, 
//                         backgroundColor: "#e7e7e7",
//                         borderRadius: 10, 
//                         flexDirection: 'row',
//                         alignItems: 'center'},
//                         animatedStyle,
//                         ]} >
//         <TextInput stlye={{width: '85%'}} placeholder={'Search by Year, Model, or Make'} />
//         <TouchableOpacity onPress={()=>{
//             if (animation.value == 1) {
//                 animation.value = 0;
//             } else {
//                 animation.value = 1;
//             }
//         }}>
//             <Image
//                 source={require('../../../assets/icons/search.png')}
//                 style={{width:30, height: 30}}
//             />
//         </TouchableOpacity>
//     </Animated.View>
//     </View>
//   )
// }

// export default SearchBox;