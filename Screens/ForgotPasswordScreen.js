import { View, Text, TextInput, Pressable, Animated, Dimensions, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../FirebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

const ForgotPasswordScreen = () => {

    const navigation = useNavigation();

    const { width, height } = Dimensions.get('window');

    const bottomSheet = new Animated.Value(height);

    const [email, setEmail] = useState('');
    const [sentEmail, setSentEmail] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);

    useEffect(() => {
        Animated.timing(bottomSheet, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }).start();
    }, []);

    const sendRecoverEmail = () => {
        if (email !== '') {
            setResetLoading(true);

            sendPasswordResetEmail(auth, email)
                .then(() => {
                    setSentEmail(true);
                    setResetLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                })
        } else {
            setEmailError(true);

            setTimeout(() => {
                setEmailError(false);
            }, 2000);
        };
    };

  return (
    <View style={[{flex: 1}, {backgroundColor: '#000'}]}>
        <Pressable onPress={() => navigation.navigate('Sign')} style={[{position: 'absolute'}, {height: 50}, {width: 50}, {borderRadius: 100 / 2}, {left: 30}, {top: 30}, {backgroundColor: '#fff'}, {justifyContent: 'center'}, {alignItems: 'center'}]}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
        </Pressable>

        <Text style={[{color: '#fff'}, {textAlign: 'center'}, {marginTop: 100}, {fontSize: 30}, {fontWeight: 800}]}>Forgot Password</Text>
        <Text style={[{color: '#fff'}, {textAlign: 'center'}, {marginTop: 20}, {fontSize: 20}, {fontWeight: 300}, {marginHorizontal: 20}]}>Provide your old email address to recover your account!</Text>

        {/* Bottom sheet */}
        <Animated.View style={[{position: 'absolute'}, {bottom: 0}, {left: 0}, {right: 0}, {borderTopRightRadius: 50}, {borderTopLeftRadius: 50}, {backgroundColor: '#fff'}, {padding: 40}, {gap: 30}, {transform: [{translateY: bottomSheet}]}]}>
            <View style={[{gap: 10}]}>
                <Text style={[{fontSize: 16}]}>Email</Text>
                <TextInput onChangeText={(text) => setEmail(text)} style={[{height: height / 13}, {borderRadius: 10}, {backgroundColor: 'lightgray'}, {fontSize: 16}, {paddingLeft: 30}]} placeholder='example@gmail.com' />
            </View>

            {
                sentEmail && (
                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {padding: 20}, {gap: 10}, {borderRadius: 10}, {backgroundColor: 'green'}, {justifyContent: 'space-between'}]}>
                        <Text style={[{color: '#fff'}]}>We sent you an email, check your inbox!</Text>
                        <Ionicons name="checkmark-circle" size={24} color="#fff" />
                    </View>
                )
            }

            {
                emailError && (
                    <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {padding: 20}, {gap: 10}, {borderRadius: 10}, {backgroundColor: 'red'}, {justifyContent: 'space-between'}]}>
                        <Text style={[{color: '#fff'}]}>Please provide a valid email!</Text>
                        <MaterialIcons name="error" size={24} color="#fff" />
                    </View>
                )
            }

            <Pressable onPress={sendRecoverEmail} style={[{backgroundColor: '#000'}, {padding: 23}, {borderRadius: 15}, {justifyContent: 'center'}, {alignItems: 'center'}]}>
                {
                    resetLoading ? (
                        <ActivityIndicator size={'large'} color={'#fff'} />
                    ) : (
                        <Text style={[{color: '#fff'}, {fontWeight: 500}]}>Reset password</Text>
                    )
                }
            </Pressable>
        </Animated.View>
        {/* //////////// */}
    </View>
  )
};

export default ForgotPasswordScreen;