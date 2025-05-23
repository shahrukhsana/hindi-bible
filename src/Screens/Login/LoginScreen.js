/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../Constants/Colors.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';

import { GlobalContext } from '../../Components/GlobalContext';
import { postData, apiUrl } from '../../Components/api';
const urls=apiUrl();

const LoginScreen = () => {

  const { extraData } = useContext(GlobalContext);

  const navigation = useNavigation(); 
  const [passwordVisible, setPasswordVisible] = useState(false);


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 


  // extraData = Object.assign(extraData, {"user":{
  //   "setUsername":setUsername,
  //   "setPassword":setPassword,
  // },});

  const handleLogin = async () => {
  if (!username || !password) {
    Alert.alert('Error', 'Please enter username and password');
    return;
  }
  const filedata = {
    "username":username,
    "password":password
  };
  const response = await postData(filedata, urls.login,"POST", navigation,extraData);

  };



  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={styles.button}>
        <GradiantButton
          title="Home"
          height="35"
          width="30%"
          fontSize={16}
          gradientType="yellow"
          borderRadius={5}
          onPress={() => navigation.navigate('Home')}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>CREATE ACCOUNT (अकाउंट बनाइये)</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>USERNAME</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.showButton} onPress={() => setPasswordVisible(!passwordVisible)}>
              <Icon name={passwordVisible ? 'eye' : 'eye-off'} size={25} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={[styles.button, { marginBottom: 20 }]}>
        <GradiantButton
          title="LOGIN"
          height="35"
          width="30%"
          fontSize={16}
          gradientType="orange"
          borderRadius={5}
          onPress={handleLogin}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.primary,
  },
  topBar: {
    marginTop: 25,
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: BACKGROUND_COLORS.skyBlue,
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: 20,
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 25,
    marginHorizontal: 30,
  },
  formTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
    textAlign: 'center',
  },
  input: {
    backgroundColor: BACKGROUND_COLORS.white,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  passwordInputContainer: {
    position: 'relative',
  },
  showButton: {
    position: 'absolute',
    right: 10,
    top: 9,
  },
});

export default LoginScreen;
