import { View, Text, TextInput, Dimensions, Pressable, Animated, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import CheckBox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { MaterialIcons } from '@expo/vector-icons';

const SignScreen = () => {

  const navigation = useNavigation();

  const { width, height } = Dimensions.get('window');

  const [hidePassword, setHidePassword] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [logInLoading, setLoginLoading] = useState(false);
  const [logInError, setLogInError] = useState(false);

  const value = new Animated.Value(height);

  useEffect(() => {
    Animated.timing(value, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  const logIn = () => {
    setLoginLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (rememberMe) {
          const saveUserToAsyncStorage = async () => {
            try {
              await AsyncStorage.setItem('user', JSON.stringify(user));
              navigation.reset({
                index: 0,
                routes: [{ name: 'AccessLocation' }]
              });
              setLoginLoading(false);
            } catch (err) {
              console.error(err);
            }
          };
  
          saveUserToAsyncStorage();
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'AccessLocation' }]
          });
          setLoginLoading(false);
        };
      })
      .catch((err) => {
        console.error(err);
        setLoginLoading(false);
        
        setLogInError(true);
        setTimeout(() => {
          setLogInError(false);
        }, 2000);
      })
  };

  return (
    <View style={[{flex: 1}, {backgroundColor: '#000'}]}>
      <View style={[{justifyContent: 'center'}, {alignItems: 'center'}, {marginTop: 130}, {gap: 20}]}>
        <Text style={[{fontSize: 30}, {fontWeight: 800}, {color: '#fff'}]}>Log In</Text>
        <Text style={[{fontSize: 20}, {fontWeight: 300}, {color: '#fff'}]}>Please sign in to your existing account</Text>
      </View>
      
      {/* Bottom sheet */}
      <Animated.View style={[{position: 'absolute'}, {bottom: 0}, {left: 0}, {right: 0}, {borderTopRightRadius: 50}, {borderTopLeftRadius: 50}, {backgroundColor: '#fff'}, {padding: 40}, {gap: 30}, {transform: [{translateY: value}]}]}>
        <View style={[{gap: 10}]}>
          <Text style={[{fontSize: 16}]}>Email</Text>
          <TextInput onChangeText={(text) => setEmail(text)} style={[{height: height / 13}, {borderRadius: 10}, {backgroundColor: 'lightgray'}, {fontSize: 16}, {paddingLeft: 30}]} placeholder='example@gmail.com' />
        </View>

        <View style={[{gap: 10}]}>
          <Text style={[{fontSize: 16}]}>Password</Text>
          <View style={[{justifyContent: 'center'}]}>
            <TextInput onChangeText={(text) => setPassword(text)} secureTextEntry={hidePassword} style={[{height: height / 13}, {borderRadius: 10}, {backgroundColor: 'lightgray'}, {fontSize: 16}, {paddingLeft: 30}]} placeholder='your password' />
            <Pressable onPress={() => setHidePassword(!hidePassword)} style={[{position: 'absolute'}, {right: 20}]}>
              <AntDesign name="eye" size={24} color="gray" />
            </Pressable>
          </View>
        </View>

        <View style={[{flexDirection: 'row'}, {justifyContent: 'space-between'}]}>
          <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 10}]}>
            <CheckBox onValueChange={() => setRememberMe(!rememberMe)} value={rememberMe} color={rememberMe ? '#000' : 'lightgray'} style={[{borderRadius: 5}, {height: 23}, {width: 23}]} />
            <Text style={[{color: 'gray'}]}>Remember me</Text>
          </View>

          <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={[{fontWeight: 500}, {color: '#000'}]}>Forgot Password</Text>
          </Pressable>
        </View>

        <Pressable onPress={logIn} style={[{backgroundColor: '#000'}, {padding: 23}, {borderRadius: 15}, {justifyContent: 'center'}, {alignItems: 'center'}]}>
          {
            logInLoading ? (
              <ActivityIndicator size={'large'} color={'#fff'} />
            ) : (
              <Text style={[{color: '#fff'}, {fontWeight: 500}]}>LOG IN</Text>
            )
          }
        </Pressable>

        {
          logInError && (
            <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {padding: 20}, {gap: 10}, {borderRadius: 10}, {backgroundColor: 'red'}, {justifyContent: 'space-between'}]}>
              <Text style={[{color: '#fff'}]}>Oops! Email or Password is wrong!</Text>
              <MaterialIcons name="error" size={24} color="#fff" />
            </View>
          )
        }

        <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {justifyContent: 'center'}, {gap: 20}]}>
          <Text>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={[{fontWeight: 500}, {color: '#000'}, {textDecorationLine: 'underline'}]}>SIGN UP</Text>
          </Pressable>
        </View>
      </Animated.View>
      {/* //////////// */}
    </View>
  )
};

export default SignScreen;