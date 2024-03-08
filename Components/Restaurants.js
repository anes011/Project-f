import { View, Text, Pressable, Dimensions, Image, ScrollView } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Restaurants = () => {

    const { width, height } = Dimensions.get('window');

  return (
    <View style={[{marginTop: 20}]}>
        <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {justifyContent: 'space-between'}]}>
            <Text style={[{fontSize: 20}, {fontWeight: 400}]}>Open Restaurants</Text>

            <Pressable style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 5}]}>
                <Text style={[{fontSize: 16}, {fontWeight: 700}]}>See All</Text>
                <SimpleLineIcons name="arrow-right" size={14} color="black" />
            </Pressable>
        </View>

        <ScrollView>
            <Pressable style={[{marginTop: 20}, {gap: 10}]}>
                <View style={[{height: height / 4}, {borderRadius: 20}, {overflow: 'hidden'}]}>
                    <Image style={[{height: '100%'}, {width: '100%'}]} source={require('../assets/Images&logos/Restaurant.jpg')} />
                </View>
                
                <Text style={[{fontSize: 20}, {fontWeight: 500}]}>Rose Garden Restaurant</Text>
                <Text style={[{color: 'grey'}]}>Burger - Chiken - Riche - Wings</Text>

                <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 20}]}>
                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 5}]}>
                        <Feather name="star" size={24} color="black" />
                        <Text style={[{fontSize: 15}, {fontWeight: 700}]}>4.7</Text>
                    </View>

                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 5}]}>
                        <MaterialIcons name="delivery-dining" size={24} color="black" />
                        <Text style={[{fontSize: 15}, {fontWeight: 700}]}>Free</Text>
                    </View>

                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 5}]}>
                        <Ionicons name="time" size={24} color="black" />
                        <Text style={[{fontSize: 15}, {fontWeight: 700}]}>20 min</Text>
                    </View>
                </View>
            </Pressable>

            <Pressable style={[{marginTop: 20}, {gap: 10}]}>
                <View style={[{height: height / 4}, {borderRadius: 20}, {overflow: 'hidden'}]}>
                    <Image style={[{height: '100%'}, {width: '100%'}]} source={require('../assets/Images&logos/Restaurant.jpg')} />
                </View>
                
                <Text style={[{fontSize: 20}, {fontWeight: 500}]}>Rose Garden Restaurant</Text>
                <Text style={[{color: 'grey'}]}>Burger - Chiken - Riche - Wings</Text>

                <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 20}]}>
                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 5}]}>
                        <Feather name="star" size={24} color="black" />
                        <Text style={[{fontSize: 15}, {fontWeight: 700}]}>4.7</Text>
                    </View>

                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 5}]}>
                        <MaterialIcons name="delivery-dining" size={24} color="black" />
                        <Text style={[{fontSize: 15}, {fontWeight: 700}]}>Free</Text>
                    </View>

                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 5}]}>
                        <Ionicons name="time" size={24} color="black" />
                        <Text style={[{fontSize: 15}, {fontWeight: 700}]}>20 min</Text>
                    </View>
                </View>
            </Pressable>

            <Pressable style={[{marginTop: 20}, {gap: 10}]}>
                <View style={[{height: height / 4}, {borderRadius: 20}, {overflow: 'hidden'}]}>
                    <Image style={[{height: '100%'}, {width: '100%'}]} source={require('../assets/Images&logos/Restaurant.jpg')} />
                </View>
                
                <Text style={[{fontSize: 20}, {fontWeight: 500}]}>Rose Garden Restaurant</Text>
                <Text style={[{color: 'grey'}]}>Burger - Chiken - Riche - Wings</Text>

                <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 20}]}>
                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 5}]}>
                        <Feather name="star" size={24} color="black" />
                        <Text style={[{fontSize: 15}, {fontWeight: 700}]}>4.7</Text>
                    </View>

                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 5}]}>
                        <MaterialIcons name="delivery-dining" size={24} color="black" />
                        <Text style={[{fontSize: 15}, {fontWeight: 700}]}>Free</Text>
                    </View>

                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 5}]}>
                        <Ionicons name="time" size={24} color="black" />
                        <Text style={[{fontSize: 15}, {fontWeight: 700}]}>20 min</Text>
                    </View>
                </View>
            </Pressable>

            <Pressable style={[{marginTop: 20}, {gap: 10}]}>
                <View style={[{height: height / 4}, {borderRadius: 20}, {overflow: 'hidden'}]}>
                    <Image style={[{height: '100%'}, {width: '100%'}]} source={require('../assets/Images&logos/Restaurant.jpg')} />
                </View>
                
                <Text style={[{fontSize: 20}, {fontWeight: 500}]}>Rose Garden Restaurant</Text>
                <Text style={[{color: 'grey'}]}>Burger - Chiken - Riche - Wings</Text>

                <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 20}]}>
                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 5}]}>
                        <Feather name="star" size={24} color="black" />
                        <Text style={[{fontSize: 15}, {fontWeight: 700}]}>4.7</Text>
                    </View>

                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 5}]}>
                        <MaterialIcons name="delivery-dining" size={24} color="black" />
                        <Text style={[{fontSize: 15}, {fontWeight: 700}]}>Free</Text>
                    </View>

                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 5}]}>
                        <Ionicons name="time" size={24} color="black" />
                        <Text style={[{fontSize: 15}, {fontWeight: 700}]}>20 min</Text>
                    </View>
                </View>
            </Pressable>

            <Pressable style={[{marginTop: 20}, {gap: 10}]}>
                <View style={[{height: height / 4}, {borderRadius: 20}, {overflow: 'hidden'}]}>
                    <Image style={[{height: '100%'}, {width: '100%'}]} source={require('../assets/Images&logos/Restaurant.jpg')} />
                </View>
                
                <Text style={[{fontSize: 20}, {fontWeight: 500}]}>Rose Garden Restaurant</Text>
                <Text style={[{color: 'grey'}]}>Burger - Chiken - Riche - Wings</Text>

                <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 20}]}>
                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 5}]}>
                        <Feather name="star" size={24} color="black" />
                        <Text style={[{fontSize: 15}, {fontWeight: 700}]}>4.7</Text>
                    </View>

                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 5}]}>
                        <MaterialIcons name="delivery-dining" size={24} color="black" />
                        <Text style={[{fontSize: 15}, {fontWeight: 700}]}>Free</Text>
                    </View>

                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 5}]}>
                        <Ionicons name="time" size={24} color="black" />
                        <Text style={[{fontSize: 15}, {fontWeight: 700}]}>20 min</Text>
                    </View>
                </View>
            </Pressable>
        </ScrollView>
    </View>
  )
};

export default Restaurants;