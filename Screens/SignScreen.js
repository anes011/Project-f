import { View, Text, TextInput, Dimensions, Pressable, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import CheckBox from 'expo-checkbox';

const SignScreen = () => {

  const { width, height } = Dimensions.get('window');

  const [hidePassword, setHidePassword] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const value = new Animated.Value(height);

  useEffect(() => {
    Animated.timing(value, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <View style={[{flex: 1}, {backgroundColor: 'rgb(186, 104, 200)'}]}>
      <View style={[{justifyContent: 'center'}, {alignItems: 'center'}, {marginTop: 130}, {gap: 20}]}>
        <Text style={[{fontSize: 30}, {fontWeight: 800}, {color: '#fff'}]}>Log In</Text>
        <Text style={[{fontSize: 20}, {fontWeight: 300}, {color: '#fff'}]}>Please sign in to your existing account</Text>
      </View>
      
      {/* Bottom sheet */}
      <Animated.View style={[{position: 'absolute'}, {bottom: 0}, {left: 0}, {right: 0}, {borderTopRightRadius: 50}, {borderTopLeftRadius: 50}, {backgroundColor: '#fff'}, {padding: 40}, {gap: 30}, {transform: [{translateY: value}]}]}>
        <View style={[{gap: 10}]}>
          <Text style={[{fontSize: 16}]}>Email</Text>
          <TextInput style={[{height: height / 13}, {borderRadius: 10}, {backgroundColor: 'lightgray'}, {fontSize: 16}, {paddingLeft: 30}]} placeholder='example@gmail.com' />
        </View>

        <View style={[{gap: 10}]}>
          <Text style={[{fontSize: 16}]}>Password</Text>
          <View style={[{justifyContent: 'center'}]}>
            <TextInput secureTextEntry={hidePassword} style={[{height: height / 13}, {borderRadius: 10}, {backgroundColor: 'lightgray'}, {fontSize: 16}, {paddingLeft: 30}]} placeholder='your password' />
            <Pressable onPress={() => setHidePassword(!hidePassword)} style={[{position: 'absolute'}, {right: 20}]}>
              <AntDesign name="eye" size={24} color="gray" />
            </Pressable>
          </View>
        </View>

        <View style={[{flexDirection: 'row'}, {justifyContent: 'space-between'}]}>
          <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 10}]}>
            <CheckBox onValueChange={() => setRememberMe(!rememberMe)} value={rememberMe} color={rememberMe ? 'rgb(186, 104, 200)' : 'lightgray'} style={[{borderRadius: 5}, {height: 23}, {width: 23}]} />
            <Text style={[{color: 'gray'}]}>Remember me</Text>
          </View>

          <Pressable>
            <Text style={[{fontWeight: 500}, {color: 'rgb(186, 104, 200)'}]}>Forgot Password</Text>
          </Pressable>
        </View>

        <Pressable style={[{backgroundColor: 'rgb(186, 104, 200)'}, {padding: 23}, {borderRadius: 15}, {justifyContent: 'center'}, {alignItems: 'center'}]}>
          <Text style={[{color: '#fff'}, {fontWeight: 500}]}>LOG IN</Text>
        </Pressable>

        <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {justifyContent: 'center'}, {gap: 20}]}>
          <Text>Don't have an account?</Text>
          <Pressable>
            <Text style={[{fontWeight: 500}, {color: 'rgb(186, 104, 200)'}]}>SIGN UP</Text>
          </Pressable>
        </View>
      </Animated.View>
      {/* //////////// */}
    </View>
  )
};

export default SignScreen;