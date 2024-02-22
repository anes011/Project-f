import { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const IntroScreen = () => {

  const navigation = useNavigation();

  const [step, setStep] = useState(1);

  const moveToNextStep = () => {
    setStep(step + 1);

    if (step === 4) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Sign' }]
      });
    };
  };

  const skip = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Sign' }]
    });
  };

  return (
    <View style={[{flex: 1}, {padding: 30}]}>
      <View style={[{alignItems: 'center'}, {gap: 30}]}>
        {
          step === 1 && (
            <>
              <Image style={[{height: 300}, {width: 300}]} source={require('../assets/Images&logos/Hamburger.gif')} />
              <Text style={[{fontSize: 30}, {fontWeight: 900}]}>All your favorites</Text>
              <Text style={[{fontSize: 20}, {fontWeight: 300}]}>Get all your favorite eats in one place, you just place the order, we do the rest...</Text>
            </>
          )
        }

        {
          step === 2 && (
            <>
              <Image style={[{height: 300}, {width: 300}]} source={require('../assets/Images&logos/Delivery.gif')} />
              <Text style={[{fontSize: 30}, {fontWeight: 900}]}>Get your cravings satisfied in minutes!</Text>
              <Text style={[{fontSize: 20}, {fontWeight: 300}]}>Order from our food delivery app for quick, tasty meals delivered straight to your door.</Text>
            </>
          )
        }

        {
          step === 3 && (
            <>
              <Image style={[{height: 300}, {width: 300}]} source={require('../assets/Images&logos/Cooking.gif')} />
              <Text style={[{fontSize: 30}, {fontWeight: 900}]}>Order from chosen restaurants</Text>
              <Text style={[{fontSize: 20}, {fontWeight: 300}]}>Indulge in the dishes you crave from top restaurants! With our app, ordering from your favorites has never been easier. Treat yourself today!</Text>
            </>
          )
        }

        {
          step === 4 && (
            <>
              <Image style={[{height: 300}, {width: 300}]} source={require('../assets/Images&logos/Giveaway.gif')} />
              <Text style={[{fontSize: 30}, {fontWeight: 900}]}>Free delivery offers</Text>
              <Text style={[{fontSize: 20}, {fontWeight: 300}]}>Delight in delicious meals delivered right to you, with the added bonus of free delivery! Order through our app and enjoy the taste of savings today!</Text>
            </>
          )
        }
        <View style={[{flexDirection: 'row'}, {gap: 10}]}>
          <View style={[{height: 10}, {width: 10}, {backgroundColor: step === 1 ? 'rgb(186, 104, 200)' : 'rgba(186, 104, 200, .3)'}, {borderRadius: 100 / 2}]}></View>
          <View style={[{height: 10}, {width: 10}, {backgroundColor: step === 2 ? 'rgb(186, 104, 200)' : 'rgba(186, 104, 200, .3)'}, {borderRadius: 100 / 2}]}></View>
          <View style={[{height: 10}, {width: 10}, {backgroundColor: step === 3 ? 'rgb(186, 104, 200)' : 'rgba(186, 104, 200, .3)'}, {borderRadius: 100 / 2}]}></View>
          <View style={[{height: 10}, {width: 10}, {backgroundColor: step === 4 ? 'rgb(186, 104, 200)' : 'rgba(186, 104, 200, .3)'}, {borderRadius: 100 / 2}]}></View>
        </View>
      </View>

      <View style={[{position: 'absolute'}, {bottom: 30}, {left: 30}, {right: 30}, {gap: 30}]}>
        <Pressable onPress={moveToNextStep} style={[{padding: 20}, {borderRadius: 10}, {backgroundColor: 'rgb(186, 104, 200)'}, {justifyContent: 'center'}, {alignItems: 'center'}]}>
          <Text style={[{color: '#fff'}, {fontSize: 16}, {fontWeight: 500}]}>Next</Text>
        </Pressable>

        {
          step !== 4 && (
            <Pressable onPress={skip} style={[{justifyContent: 'center'}, {alignItems: 'center'}]}>
              <Text>Skip</Text>
            </Pressable>
          )
        }
      </View>
    </View>
  )
};

export default IntroScreen;