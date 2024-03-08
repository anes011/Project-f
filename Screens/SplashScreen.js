import { View, Text, Image, Animated } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {

    const navigation = useNavigation();

    const value = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(value, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();

        setTimeout(() => {
            const checkUserExists = async () => {
                try {
                  const response = await AsyncStorage.getItem('user');
          
                  if (response === null) {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Intro' }]
                    });
                  } else {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'AccessLocation' }]
                    });
                  };
                } catch (err) {
                  console.error(err);
                }
            };
          
            checkUserExists();
        }, 2000);
    }, []);

  return (
    <Animated.View style={[{justifyContent: 'center'}, {alignItems: 'center'}, {flex: 1}, {opacity: value}]}>
        <Image source={require('../assets/Images&logos/Logo.png')} />
    </Animated.View>
  )
}

export default SplashScreen;