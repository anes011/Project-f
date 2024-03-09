import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

const Categories = () => {
  return (
    <View style={[{marginTop: 20}]}>
        <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {justifyContent: 'space-between'}]}>
            <Text style={[{fontSize: 20}, {fontWeight: 400}]}>All Categories</Text>

            <Pressable style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 5}]}>
                <Text style={[{fontSize: 16}, {fontWeight: 700}]}>See All</Text>
                <SimpleLineIcons name="arrow-right" size={14} color="black" />
            </Pressable>
        </View>

        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={[{marginTop: 10}]}>
            <Pressable style={[{alignItems: 'center'}, {gap: 10}, {marginRight: 20}]}>
                <View style={[{height: 90}, {width: 90}, {borderRadius: 20}, {justifyContent: 'center'}, {alignItems: 'center'}, {backgroundColor: 'rgba(0, 0, 0, .1)'}]}>
                    <Image style={[{height: '50%'}, {width: '50%'}]} source={require('../assets/Images&logos/Hamburger.png')} />
                </View>
                <Text style={[{fontSize: 18}, {fontWeight: 500}]}>Burger</Text>
            </Pressable>

            <Pressable style={[{alignItems: 'center'}, {gap: 10}, {marginRight: 20}]}>
                <View style={[{height: 90}, {width: 90}, {borderRadius: 20}, {justifyContent: 'center'}, {alignItems: 'center'}, {backgroundColor: 'rgba(0, 0, 0, .1)'}]}>
                    <Image style={[{height: '50%'}, {width: '50%'}]} source={require('../assets/Images&logos/Pizza.png')} />
                </View>
                <Text style={[{fontSize: 18}, {fontWeight: 500}]}>Pizza</Text>
            </Pressable>

            <Pressable style={[{alignItems: 'center'}, {gap: 10}, {marginRight: 20}]}>
                <View style={[{height: 90}, {width: 90}, {borderRadius: 20}, {justifyContent: 'center'}, {alignItems: 'center'}, {backgroundColor: 'rgba(0, 0, 0, .1)'}]}>
                    <Image style={[{height: '50%'}, {width: '50%'}]} source={require('../assets/Images&logos/Taco.png')} />
                </View>
                <Text style={[{fontSize: 18}, {fontWeight: 500}]}>Tacos</Text>
            </Pressable>

            <Pressable style={[{alignItems: 'center'}, {gap: 10}, {marginRight: 20}]}>
                <View style={[{height: 90}, {width: 90}, {borderRadius: 20}, {justifyContent: 'center'}, {alignItems: 'center'}, {backgroundColor: 'rgba(0, 0, 0, .1)'}]}>
                    <Image style={[{height: '50%'}, {width: '50%'}]} source={require('../assets/Images&logos/Chicken.png')} />
                </View>
                <Text style={[{fontSize: 18}, {fontWeight: 500}]}>Chicken</Text>
            </Pressable>

            <Pressable style={[{alignItems: 'center'}, {gap: 10}, {marginRight: 20}]}>
                <View style={[{height: 90}, {width: 90}, {borderRadius: 20}, {justifyContent: 'center'}, {alignItems: 'center'}, {backgroundColor: 'rgba(0, 0, 0, .1)'}]}>
                    <Image style={[{height: '50%'}, {width: '50%'}]} source={require('../assets/Images&logos/Dessert.png')} />
                </View>
                <Text style={[{fontSize: 18}, {fontWeight: 500}]}>Dessert</Text>
            </Pressable>

            <Pressable style={[{alignItems: 'center'}, {gap: 10}, {marginRight: 20}]}>
                <View style={[{height: 90}, {width: 90}, {borderRadius: 20}, {justifyContent: 'center'}, {alignItems: 'center'}, {backgroundColor: 'rgba(0, 0, 0, .1)'}]}>
                    <Image style={[{height: '50%'}, {width: '50%'}]} source={require('../assets/Images&logos/Drinks.png')} />
                </View>
                <Text style={[{fontSize: 18}, {fontWeight: 500}]}>Drinks</Text>
            </Pressable>

            <Pressable style={[{alignItems: 'center'}, {gap: 10}, {marginRight: 20}]}>
                <View style={[{height: 90}, {width: 90}, {borderRadius: 20}, {justifyContent: 'center'}, {alignItems: 'center'}, {backgroundColor: 'rgba(0, 0, 0, .1)'}]}>
                    <Image style={[{height: '50%'}, {width: '50%'}]} source={require('../assets/Images&logos/Groceries.png')} />
                </View>
                <Text style={[{fontSize: 18}, {fontWeight: 500}]}>Groceries</Text>
            </Pressable>
        </ScrollView>
    </View>
  )
}

export default Categories;