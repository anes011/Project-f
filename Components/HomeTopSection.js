import { View, Text, Image, Pressable, Dimensions, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { db } from '../FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import mapStyle from '../MapStyles.json';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const HomeTopSection = () => {

    const { width, height } = Dimensions.get('window');

    const [userInfo, setUserInfo] = useState('');
    const [showMap, setShowMap] = useState(true);
    const [userLocation, setUserLocation] = useState('');
    const [updateLocationError, setUpdateLocationError] = useState(false);
    const [search, setSearch] = useState('');
    const [showClearSearch, setShowClearSearch] = useState(false);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await AsyncStorage.getItem('user');
                const userID = JSON.parse(response).uid;
                
                const q = query(collection(db, 'users'), where('uid', '==', userID));

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setUserInfo(doc.data());
                });
            } catch (err) {
                console.error(err);
            }
        };

        getUserInfo();
    }, []);

    useEffect(() => {
        const getUserLocation = async () => {
            try {
                const response = await AsyncStorage.getItem('userLocation');
                setUserLocation(JSON.parse(response));
            } catch (err) {
                console.error(err);
            }
        };

        getUserLocation();
    }, []);

    const updateLocation = () => {
        (async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setUpdateLocationError(true);

                    setTimeout(() => {
                        setUpdateLocationError(false);
                    }, 2000);
                } else {
                    const location = await Location.getCurrentPositionAsync({});

                    (async () => {
                        try {
                            await AsyncStorage.setItem('userLocation', JSON.stringify(location));
                            setUserLocation(location);
                        } catch (err) {
                            console.error(err);
                        }
                    })();
                };
            } catch (err) {
                console.error(err);
            }
        })();
    };

    useEffect(() => {
        if (search !== '') {
            setShowClearSearch(true);
        } else {
            setShowClearSearch(false);
        };
    }, [search]);

  return (
    <View style={[{marginTop: 20}]}>
        <View style={[{flexDirection: 'row'}, {justifyContent: 'space-between'}, {alignItems: 'center'}]}>
            <View style={[{height: 50}, {width: 50}, {borderRadius: 100 / 2}, {overflow: 'hidden'}]}>
                <Image style={[{flex: 1}]} source={{uri: userInfo.profilePhoto}} />
            </View>

            <View style={[{gap: 10}, {alignItems: 'center'}]}>
                <Pressable onPress={() => setShowMap(!showMap)} style={[{flexDirection: 'row'}, {alignItems: 'center'}, {backgroundColor: '#000'}, {padding: 15}, {borderRadius: 50}, {gap: 10}]}>
                    {
                        showMap ? (
                            <Text style={[{color: '#fff'}]}>Close Map</Text>
                        ) : (
                            <Text style={[{color: '#fff'}]}>Show Map</Text>
                        )
                    }
                    <EvilIcons name="location" size={24} color="#fff" />
                </Pressable>
            </View>

            <Pressable style={[{height: 50}, {width: 50}, {borderRadius: 100 / 2}, {backgroundColor: '#000'}, {justifyContent: 'center'}, {alignItems: 'center'}]}>
                <Feather name="shopping-bag" size={24} color="#fff" />
                <View style={[{backgroundColor: 'yellow'}, {height: 25}, {width: 25}, {borderRadius: 100 / 2}, {justifyContent: 'center'}, {alignItems: 'center'}, {position: 'absolute'}, {top: -10}, {right: 0}, {borderWidth: 3}, {borderColor: '#fff'}]}>
                    <Text>2</Text>
                </View>
            </Pressable>
        </View>

        {
            showMap && (
                <View style={[{height: height / 3}, {overflow: 'hidden'}, {borderRadius: 20}, {marginTop: 20}]}>
                    {
                        updateLocationError ? (
                            <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {padding: 10}, {borderRadius: 20}, {backgroundColor: 'red'}, {position: 'absolute'}, {top: 5}, {left: 5}, {gap: 10}, {zIndex: 1000}]}>
                                <MaterialIcons name="error" size={24} color="#fff" />
                                <Text style={[{color: '#fff'}]}>We couldn't update your location</Text>
                            </View>
                        ) : (
                            <Pressable onPress={updateLocation} style={[{flexDirection: 'row'}, {alignItems: 'center'}, {padding: 10}, {borderRadius: 20}, {backgroundColor: '#000'}, {position: 'absolute'}, {top: 5}, {left: 5}, {gap: 10}, {zIndex: 1000}]}>
                                <EvilIcons name="refresh" size={24} color="#fff" />
                                <Text style={[{color: '#fff'}]}>Update my location</Text>
                            </Pressable>
                        )
                    }

                    {
                        userLocation !== '' && (
                            <MapView customMapStyle={mapStyle} showsUserLocation legalLabelInsets={{ bottom: -100, right: -100 }} style={[{flex: 1}]} region={{latitude: parseFloat(userLocation.coords.latitude), longitude: parseFloat(userLocation.coords.longitude), latitudeDelta: 0.005, longitudeDelta: 0.005}}></MapView>
                        )
                    }
                </View>
            )
        }

        <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {marginTop: 20}]}>
            <MaterialCommunityIcons name="hand-wave-outline" size={30} color="black" />
            <Text style={[{fontSize: 16}, {fontWeight: 300}, {marginLeft: 10}]}>Hey {userInfo.name}, </Text>
            <Text style={[{fontSize: 16}, {fontWeight: 500}]}>Enjoy your food!</Text>
        </View>

        <View style={[{justifyContent: 'center'}, {marginTop: 20}]}>
            <TextInput value={search} onChangeText={(text) => setSearch(text)} style={[{height: height / 12}, {borderRadius: 10}, {backgroundColor: 'rgba(0, 0, 0, .1)'}, {textAlign: 'center'}, {paddingHorizontal: 60}]} placeholder='Search dishes, restaurants...' />
            <View style={[{position: 'absolute'}, {left: 15}]}>
                <Feather name="search" size={30} color="black" />
            </View>
            {
                showClearSearch && (
                    <Pressable onPress={() => setSearch('')} style={[{height: 30}, {width: 30}, {borderRadius: 100 / 2}, {backgroundColor: 'rgba(0, 0, 0, .2)'}, {justifyContent: 'center'}, {alignItems: 'center'}, {position: 'absolute'}, {right: 15}]}>
                        <Ionicons name="close-outline" size={24} color="black" />
                    </Pressable>
                )
            }
        </View>
    </View>
  )
}

export default HomeTopSection;