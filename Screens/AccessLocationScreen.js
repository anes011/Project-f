import { View, Text, Image, Dimensions, Pressable } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AccessLocationScreen = () => {

    const navigation = useNavigation();

    const { width, height } = Dimensions.get('window');
    
    const [accessError, setAccessError] = useState(false);

    const getUserLocation = () => {
        const getLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    setAccessError(true);
                } else {
                    const location = await Location.getCurrentPositionAsync({});
                    
                    const saveLocation = async () => {
                        try {
                            await AsyncStorage.setItem('userLocation', JSON.stringify(location));

                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }]
                            });
                        } catch (err) {
                            console.error(err);
                        }
                    };

                    saveLocation();
                };
            } catch (err) {
                console.error(err);
            }
        };

        getLocation();
    };

  return (
    <View style={[{flex: 1}, {gap: 30}, {padding: 30}, {justifyContent: 'center'}]}>
        {
            accessError && (
                <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {padding: 40}, {gap: 10}, {backgroundColor: 'red'}, {justifyContent: 'space-between'}, {position: 'absolute'}, {top: 0}, {left: 0}, {right: 0}]}>
                    <Text style={[{color: '#fff'}, {fontSize: 16}, {fontWeight: 500}]}>Please provide access to your location!</Text>
                    <MaterialIcons name="error" size={30} color="#fff" />
                </View>
            )
        }

        <View style={[{height: height / 4}, {width: width / 2}, {overflow: 'hidden'}, {borderRadius: 70}, {alignSelf: 'center'}]}>
            <Image style={[{height: '100%'}, {width: '100%'}]} source={require('../assets/Images&logos/Location.jpg')} />
        </View>

        <Pressable onPress={getUserLocation} style={[{flexDirection: 'row'}, {justifyContent: 'space-between'}, {alignItems: 'center'}, {padding: 20}, {borderRadius: 20}, {backgroundColor: '#000'}]}>
            <Text style={[{color: '#fff'}, {fontSize: 16}, {fontWeight: 500}]}>Access Location</Text>
            <View style={[{height: 50}, {width: 50}, {justifyContent: 'center'}, {alignItems: 'center'}, {borderRadius: 100 / 2}, {backgroundColor: 'rgba(255, 255, 255, .3)'}]}>
                <SimpleLineIcons name="location-pin" size={22} color="#fff" />
            </View>
        </Pressable>

        <Text style={[{fontSize: 20}, {textAlign: 'center'}, {fontWeight: 300}, {lineHeight: 30}]}>now will access your location only while using the App</Text>
    </View>
  )
};

export default AccessLocationScreen;