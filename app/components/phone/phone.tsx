import * as React from "react"
import { useState } from "react"
import { Text } from "../text"
import { StyleSheet, View, Image } from "react-native"
import { Button } from 'react-native-elements'
import { bowserLogo } from "."
import { withNavigation } from 'react-navigation';
import { TextInput } from "react-native-gesture-handler"
import { firebase } from "@react-native-firebase/auth"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  text: {
    fontSize: 18,
    textAlign: "center",
  }
})

const _PhoneInit = ({ text, next, navigation, header = "" }) => {
  const [phone, setPhone] = useState("");
  
  const send = async () => {
    console.tron.log('initPhoneNumber')
    firebase.functions().useFunctionsEmulator('http://localhost:5000')
    const result = await firebase.functions().httpsCallable('initPhoneNumber')({phone})
    console.tron.log(result)
    navigation.navigate(next, {phone})
  };

  return (
    <View style={styles.container}>
        <Text style={styles.text}>{header}</Text>
        <Image source={bowserLogo} />
        <Text style={styles.text}>{text}</Text>
        <TextInput style={styles.text} onChangeText={input => (setPhone(input))}>{phone}</TextInput>
        <Button title="Next" onPress={() => send()} containerStyle={styles.buttonContainer}/>
  </View>
  )
}

const _PhoneVerif = ({ text, next, navigation, header = "" }) => {
  const [code, setCode] = useState("");
  const phone = navigation.getParam('phone');

  const sendVerif = async () => {
    const data = {code, phone}
    console.tron.log('verifyPhoneNumber', data)
    firebase.functions().useFunctionsEmulator('http://localhost:5000')
    const result = await firebase.functions().httpsCallable('verifyPhoneNumber')(data)
    console.tron.log(result)
    navigation.navigate(next)
  };

  return (
    <View style={styles.container}>
        <Text style={styles.text}>{header}</Text>
        <Image source={bowserLogo} />
        <Text style={styles.text}>{text}</Text>
        <TextInput style={styles.text} onChangeText={input => (setCode(input))}>{code}</TextInput>
        <Button title="Next" onPress={() => sendVerif()} containerStyle={styles.buttonContainer}/>
  </View>
  )
}

export const PhoneVerif = withNavigation(_PhoneVerif)
export const PhoneInit = withNavigation(_PhoneInit)