import { View, Text, Pressable, Animated, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import PhoneInput from 'react-native-international-phone-number';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = () => {

    const navigation = useNavigation();

    const { width, height } = Dimensions.get('window');

    const [registerLoading, setRegisterLoading] = useState(false);

    const [hidePassword, setHidePassword] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    const [nameError, setNameError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [signError, setSignError] = useState('');

    const nameRegex = /^(?:[a-zA-Z].*){4,}$/;

    const register = () => {
        if (!nameRegex.test(name)) {
            setNameError(true);

            setTimeout(() => {
                setNameError(false);
            }, 2000);
        } else if (phoneNumber === '') {
            setPhoneNumberError(true);

            setTimeout(() => {
                setPhoneNumberError(false);
            }, 2000);
        } else {
            setRegisterLoading(true);

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;

                    (async () => {
                        try {
                            await addDoc(collection(db, 'users'), {
                                uid: user.uid,
                                name: name,
                                profilePhoto: 'https://firebasestorage.googleapis.com/v0/b/now-p-224b3.appspot.com/o/user_1077114.png?alt=media&token=d39f9694-afd2-41ec-abf7-238089666bea',
                                phoneNumber: `${selectedCountry.callingCode}${phoneNumber}`
                            });

                            (async () => {
                                try {
                                    await AsyncStorage.setItem('user', JSON.stringify(user));
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'AccessLocation' }]
                                    });
                                    setRegisterLoading(false);
                                } catch (err) {
                                    console.error(err);
                                }
                            })();
                        } catch (err) {
                            console.error(err);
                        }
                    })();
                })
                .catch((err) => {
                    console.error(err);
                    setRegisterLoading(false);
                    setSignError(err.code);

                    setTimeout(() => {
                        setSignError('');
                    }, 2000);
                })
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
                <View style={[{padding: 20}, {gap: 10}, {position: 'absolute'}, {backgroundColor: 'red'}, {borderRadius: 10}, {alignSelf: 'center'}, {top: 100}, {alignItems: 'center'}, {zIndex: 1000}]}>
                    <AntDesign name="close" size={24} color="#fff" />
                    <Text style={[{color: '#fff'}]}>The name must be at least 4 letters!</Text>
                </View>
            )
        }

        {
            phoneNumberError && (
                <View style={[{padding: 20}, {gap: 10}, {position: 'absolute'}, {backgroundColor: 'red'}, {borderRadius: 10}, {alignSelf: 'center'}, {top: 100}, {alignItems: 'center'}, {zIndex: 1000}]}>
                    <AntDesign name="close" size={24} color="#fff" />
                    <Text style={[{color: '#fff'}]}>Please provide a valid phone number!</Text>
                </View>
            )
        }

        {
            signError !== '' && (
                <View style={[{padding: 20}, {gap: 10}, {position: 'absolute'}, {backgroundColor: 'red'}, {borderRadius: 10}, {alignSelf: 'center'}, {top: 100}, {alignItems: 'center'}, {zIndex: 1000}]}>
                    <AntDesign name="close" size={24} color="#fff" />
                    <Text style={[{color: '#fff'}]}>{signError}</Text>
                </View>
            )
        }

        {/* Bottom sheet */}
      <View style={[{position: 'absolute'}, {bottom: 0}, {left: 0}, {right: 0}, {borderTopRightRadius: 50}, {borderTopLeftRadius: 50}, {backgroundColor: '#fff'}, {padding: 40}, {gap: 30}]}>
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
            <PhoneInput
                placeholder='your phone number'
                defaultCountry='DZ'
                excludedCountries={['IL']}
                value={phoneNumber}
                onChangePhoneNumber={(number) => setPhoneNumber(number)}
                selectedCountry={selectedCountry}
                onChangeSelectedCountry={(country) => setSelectedCountry(country)}
                phoneInputStyles={{
                    container: {
                        height: height / 13,
                        borderWidth: 0
                    },
                    flagContainer: {
                        backgroundColor: '#fff',
                        borderBottomWidth: 2
                    },
                    divider: {
                        width: 2,
                        height: 25
                    }
                }}

                modalStyles={{
                    modal: {
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 50,
                        overflow: 'hidden',
                        padding: 20
                    },
                    searchInput: {
                        height: height / 13
                    },
                    countryButton: {
                        height: height / 13,
                        borderWidth: 0,
                        backgroundColor: 'rgba(0, 0, 0, .1)',
                        marginBottom: 20
                    }
                }}
            />
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
      </View>
      {/* //////////// */}
    </View>
  )
};

export default RegisterScreen;