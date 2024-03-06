import { View, Text, Pressable, Animated, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import data from '../Context';

const RegisterScreen = () => {

    const navigation = useNavigation();

    const { name, setName, email, setEmail, password,
    setPassword, phoneNumber, setPhoneNumber, verificationCode, 
    setVerificationCode } = useContext(data);

    const { width, height } = Dimensions.get('window');

    const bottomSheet = new Animated.Value(height);
    const error = new Animated.Value(-height);

    const [registerLoading, setRegisterLoading] = useState(false);

    const [hidePassword, setHidePassword] = useState(true);
    const [reTypePassword, setReTypePassword] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [sendCodeError, setSendCodeError] = useState(false);

    const nameRegex = /^(?:[a-zA-Z].*){4,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z]).{8,}$/;
    const phoneNumberRegex = /^\d{10,}$/;

    useEffect(() => {
        Animated.timing(bottomSheet, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }).start();
    }, []);

    useEffect(() => {
        if (nameError || emailError || passwordError || phoneNumberError) {
            Animated.timing(error, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start();
        };
    }, [nameError, emailError, passwordError, phoneNumberError]);

    const register = () => {
        if (!nameRegex.test(name)) {
            setNameError(true);

            setTimeout(() => {
                setNameError(false);
            }, 2000);
        } else if (!emailRegex.test(email)) {
            setEmailError(true);

            setTimeout(() => {
                setEmailError(false);
            }, 2000);
        } else if (!passwordRegex.test(password)) {
            setPasswordError(true);

            setTimeout(() => {
                setPasswordError(false);
            }, 2000);
        } else if (!phoneNumberRegex.test(phoneNumber)) {
            setPhoneNumberError(true);

            setTimeout(() => {
                setPhoneNumberError(false);
            }, 2000);
        } else {
            setRegisterLoading(true);
            const generatedCode = Math.floor(Math.random() * 9000 + 1000);
            setVerificationCode(generatedCode);

            const sendCode = async () => {
                try {
                    const response = await fetch('http://192.168.1.2:4000/emailVerification', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userEmail: email,
                            code: generatedCode
                        })
                    });

                    const data = await response.json();

                    if (data.Success) {
                        navigation.navigate('EmailVerification');
                        setRegisterLoading(false);
                    } else {
                        setSendCodeError(true);
                        setRegisterLoading(false);
                    };
                } catch (err) {
                    console.error(err);
                }
            };

            sendCode();
        }
    };

  return (
    <View style={[{flex: 1}, {backgroundColor: '#000'}]}>
        <Pressable onPress={() => navigation.navigate('Sign')} style={[{position: 'absolute'}, {height: 50}, {width: 50}, {borderRadius: 100 / 2}, {left: 30}, {top: 30}, {backgroundColor: '#fff'}, {justifyContent: 'center'}, {alignItems: 'center'}]}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
        </Pressable>

        <View style={[{justifyContent: 'center'}, {alignItems: 'center'}, {marginTop: 60}, {gap: 10}]}>
            <Text style={[{fontSize: 30}, {fontWeight: 800}, {color: '#fff'}]}>Sign Up</Text>
            <Text style={[{fontSize: 20}, {fontWeight: 300}, {color: '#fff'}]}>Please sign up to get started</Text>
        </View>

        {
            nameError && (
                <Animated.View style={[{padding: 20}, {gap: 10}, {position: 'absolute'}, {backgroundColor: '#fff'}, {borderRadius: 10}, {alignSelf: 'center'}, {top: 100}, {alignItems: 'center'}, {transform: [{translateY: error}]}, {zIndex: 1000}]}>
                    <AntDesign name="close" size={24} color="red" />
                    <Text style={[{color: 'red'}]}>The name must be at least 4 letters!</Text>
                </Animated.View>
            )
        }

        {
            emailError && (
                <Animated.View style={[{padding: 20}, {gap: 10}, {position: 'absolute'}, {backgroundColor: '#fff'}, {borderRadius: 10}, {alignSelf: 'center'}, {top: 100}, {alignItems: 'center'}, {transform: [{translateY: error}]}, {zIndex: 1000}]}>
                    <AntDesign name="close" size={24} color="red" />
                    <Text style={[{color: 'red'}]}>Please provide a valid email!</Text>
                </Animated.View>
            )
        }

        {
            passwordError && (
                <Animated.View style={[{padding: 20}, {gap: 10}, {position: 'absolute'}, {backgroundColor: '#fff'}, {borderRadius: 10}, {alignSelf: 'center'}, {top: 100}, {alignItems: 'center'}, {transform: [{translateY: error}]}, {zIndex: 1000}]}>
                    <AntDesign name="close" size={24} color="red" />
                    <Text style={[{color: 'red'}]}>The password must be at least 8 characters, and should include at least one letter!</Text>
                </Animated.View>
            )
        }

        {
            phoneNumberError && (
                <Animated.View style={[{padding: 20}, {gap: 10}, {position: 'absolute'}, {backgroundColor: '#fff'}, {borderRadius: 10}, {alignSelf: 'center'}, {top: 100}, {alignItems: 'center'}, {transform: [{translateY: error}]}, {zIndex: 1000}]}>
                    <AntDesign name="close" size={24} color="red" />
                    <Text style={[{color: 'red'}]}>Please provide a valid phone number!</Text>
                </Animated.View>
            )
        }

        {
            sendCodeError && (
                <Animated.View style={[{padding: 20}, {gap: 10}, {position: 'absolute'}, {backgroundColor: '#fff'}, {borderRadius: 10}, {alignSelf: 'center'}, {top: 100}, {alignItems: 'center'}, {transform: [{translateY: error}]}, {zIndex: 1000}]}>
                    <AntDesign name="close" size={24} color="red" />
                    <Text style={[{color: 'red'}]}>We couldn't send you the code, please try again later!</Text>
                </Animated.View>
            )
        }

        {/* Bottom sheet */}
      <Animated.View style={[{position: 'absolute'}, {bottom: 0}, {left: 0}, {right: 0}, {borderTopRightRadius: 50}, {borderTopLeftRadius: 50}, {backgroundColor: '#fff'}, {padding: 40}, {gap: 30}, {transform: [{translateY: bottomSheet}]}]}>
        <View style={[{gap: 10}]}>
          <Text style={[{fontSize: 16}]}>Name</Text>
          <TextInput value={name} onChangeText={(text) => setName(text)} style={[{height: height / 13}, {borderRadius: 10}, {backgroundColor: 'lightgray'}, {fontSize: 16}, {paddingLeft: 30}]} placeholder='Jhon doe' />
        </View>

        <View style={[{gap: 10}]}>
          <Text style={[{fontSize: 16}]}>Email</Text>
          <TextInput value={email} onChangeText={(text) => setEmail(text)} style={[{height: height / 13}, {borderRadius: 10}, {backgroundColor: 'lightgray'}, {fontSize: 16}, {paddingLeft: 30}]} placeholder='example@gmail.com' />
        </View>

        <View style={[{gap: 10}]}>
          <Text style={[{fontSize: 16}]}>Password</Text>
          <View style={[{justifyContent: 'center'}]}>
            <TextInput value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={hidePassword} style={[{height: height / 13}, {borderRadius: 10}, {backgroundColor: 'lightgray'}, {fontSize: 16}, {paddingLeft: 30}]} placeholder='your password' />
            <Pressable onPress={() => setHidePassword(!hidePassword)} style={[{position: 'absolute'}, {right: 20}]}>
              <AntDesign name="eye" size={24} color="gray" />
            </Pressable>
          </View>
        </View>
        
        <View style={[{gap: 10}]}>
          <Text style={[{fontSize: 16}]}>Phone Number</Text>
          <TextInput value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)} style={[{height: height / 13}, {borderRadius: 10}, {backgroundColor: 'lightgray'}, {fontSize: 16}, {paddingLeft: 30}]} placeholder='your phone number...' keyboardType='numeric' />
        </View>

        <Pressable onPress={register} style={[{backgroundColor: '#000'}, {padding: 23}, {borderRadius: 15}, {justifyContent: 'center'}, {alignItems: 'center'}]}>
          {
            registerLoading ? (
                <ActivityIndicator size={'large'} color={'#fff'} />
            ) : (
                <Text style={[{color: '#fff'}, {fontWeight: 500}]}>SIGN UP</Text>
            )
          }
        </Pressable>
      </Animated.View>
      {/* //////////// */}
    </View>
  )
};

export default RegisterScreen;