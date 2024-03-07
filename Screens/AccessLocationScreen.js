import { View, Text, Image, Dimensions, Pressable } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

const AccessLocationScreen = () => {

    const { width, height } = Dimensions.get('window');

    const [userLocation, setUserLocation] = useState('');

  return (
    <View style={[{flex: 1}, {gap: 30}, {padding: 30}, {justifyContent: 'center'}]}>
        <View style={[{height: height / 4}, {width: width / 2}, {overflow: 'hidden'}, {borderRadius: 70}, {alignSelf: 'center'}]}>
            <Image style={[{height: '100%'}, {width: '100%'}]} source={require('../assets/Images&logos/Location.jpg')} />
        </View>

        <Pressable style={[{flexDirection: 'row'}, {justifyContent: 'space-between'}, {alignItems: 'center'}, {padding: 20}, {borderRadius: 20}, {backgroundColor: '#000'}]}>
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