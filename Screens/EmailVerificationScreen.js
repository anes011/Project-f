import { View, Text, Pressable, Animated, TextInput, Dimensions, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import data from '../Context';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

const CELL_COUNT = 4;

const EmailVerificationScreen = () => {

    const navigation = useNavigation();

    const { verificationCode, setVerificationCode,
    email, password, name, phoneNumber } = useContext(data);

    const { width, height } = Dimensions.get('window');

    const bottomSheet = new Animated.Value(height);

    const [value, setValue] = useState('');
    const [codeError, setCodeError] = useState(false);
    const [resentCode, setResentCode] = useState(false);
    const [resendError, setResendError] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    useEffect(() => {
        Animated.timing(bottomSheet, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }).start();
    }, []);

    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const verifyCode = () => {
        if (parseInt(value) === verificationCode) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;

                    const saveMoreUserInfo = async () => {
                        try {
                            const docRef = await addDoc(collection(db, 'users'), {
                                uid: user.uid,
                                name: name,
                                profilePhoto: 'https://firebasestorage.googleapis.com/v0/b/project-f-74ed8.appspot.com/o/user_1077114.png?alt=media&token=45cb78a9-52d8-41df-8f24-f2a04b32d62b',
                                phoneNumber: phoneNumber
                            });

                            console.log("Document written with ID: ", docRef.id);
                        } catch (err) {
                            console.error(err);
                        }
                    };

                    saveMoreUserInfo();
                })
                .catch((err) => {
                    console.error(err);
                })
        } else {
            setCodeError(true);

            setTimeout(() => {
                setCodeError(false);
            }, 2000);
        };
    };

    const resendCode = () => {
        setResendLoading(true);
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
                    setResendLoading(false);
                    setResentCode(true);

                    setTimeout(() => {
                        setResentCode(false);
                    }, 2000);
                } else {
                    setResendError(true);

                    setTimeout(() => {
                        setResendError(false);
                    }, 2000);
                };
            } catch (err) {
                console.error(err);
            }
        };

        sendCode();
    };

  return (
    <View style={[{flex: 1}, {backgroundColor: '#000'}]}>
        <Pressable onPress={() => navigation.navigate('Register')} style={[{position: 'absolute'}, {height: 50}, {width: 50}, {borderRadius: 100 / 2}, {left: 30}, {top: 30}, {backgroundColor: '#fff'}, {justifyContent: 'center'}, {alignItems: 'center'}]}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
        </Pressable>

        <View style={[{justifyContent: 'center'}, {alignItems: 'center'}, {marginTop: 100}, {gap: 10}]}>
            <Text style={[{fontSize: 30}, {fontWeight: 800}, {color: '#fff'}]}>Verification</Text>
            <Text style={[{fontSize: 20}, {fontWeight: 300}, {color: '#fff'}]}>We have sent a code to your email!</Text>
        </View>

        {/* Bottom sheet */}
      <Animated.View style={[{position: 'absolute'}, {bottom: 0}, {left: 0}, {right: 0}, {borderTopRightRadius: 50}, {borderTopLeftRadius: 50}, {backgroundColor: '#fff'}, {padding: 40}, {gap: 30}, {transform: [{translateY: bottomSheet}]}]}>
        {/* Confirmation input field */}
        <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            caretHidden={false}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
            <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor/> : null)}
            </Text>
            )}
        />
        {/* //////////////////////// */}
        <Pressable onPress={verifyCode} style={[{backgroundColor: '#000'}, {padding: 23}, {borderRadius: 15}, {justifyContent: 'center'}, {alignItems: 'center'}]}>
          <Text style={[{color: '#fff'}, {fontWeight: 500}]}>Verify</Text>
        </Pressable>

        {
            codeError && (
                <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {padding: 20}, {gap: 10}, {borderRadius: 10}, {backgroundColor: 'red'}, {justifyContent: 'space-between'}]}>
                    <Text style={[{color: '#fff'}]}>Oops! the code is incorrect.</Text>
                    <MaterialIcons name="error" size={24} color="#fff" />
                </View>
            )
        }

        {
            resentCode && (
                <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {padding: 20}, {gap: 10}, {borderRadius: 10}, {backgroundColor: 'green'}, {justifyContent: 'space-between'}]}>
                    <Text style={[{color: '#fff'}]}>We sent you another code!</Text>
                    <Ionicons name="checkmark-circle" size={24} color="#fff" />
                </View>
            )
        }

        {
            resendError && (
                <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {padding: 20}, {gap: 10}, {borderRadius: 10}, {backgroundColor: 'red'}, {justifyContent: 'space-between'}]}>
                    <Text style={[{color: '#fff'}]}>Somthing went wrong, please try again later!</Text>
                    <MaterialIcons name="error" size={24} color="#fff" />
                </View>
            )
        }

        <View style={[{flexDirection: 'row'}, {justifyContent: 'space-between'}, {alignItems: 'center'}]}>
            <Text>Did not receive code?</Text>
            {
                resendLoading ? (
                    <ActivityIndicator size={'large'} color={'#000'} />
                ) : (
                    <Pressable onPress={resendCode}>
                        <Text style={[{textDecorationLine: 'underline'}, {fontWeight: 500}]}>Resend</Text>
                    </Pressable>
                )
            }
        </View>
      </Animated.View>
      {/* //////////// */}
    </View>
  )
};

const styles = StyleSheet.create({
    cell: {
      width: 60,
      height: 60,
      fontSize: 40,
      backgroundColor: 'lightgrey',
      textAlign: 'center',
      borderRadius: 10,
      color: '#fff'
    },
    focusCell: {
      backgroundColor: '#000',
    },
});

export default EmailVerificationScreen;