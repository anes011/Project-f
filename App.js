import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Imported Screens:
import SplashScreen from './Screens/SplashScreen';
import IntroScreen from './Screens/IntroScreen';
import SignScreen from './Screens/SignScreen';
//

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={[{flex: 1}]}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false, contentStyle: {backgroundColor: '#fff'}}}>
          <Stack.Screen name='Splash' component={SplashScreen} />
          <Stack.Screen name='Intro' component={IntroScreen} />
          <Stack.Screen name='Sign' component={SignScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}