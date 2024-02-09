import { StyleSheet, Image, FlatList, Pressable, TextInput } from 'react-native';

import { Text, View } from '@components/Themed';
import Button from '@/components/Button';
import { Link, Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import { useState } from 'react';


export default function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
        
        <Stack.Screen options={{ title: 'Sign Up' }} />
      <Text style={styles.lable}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder='jon@gmail.com' style={styles.input} />


      <Text style={styles.lable}>Password</Text>
      <TextInput
         value={password}
         onChangeText={setPassword}
         placeholder='Enter Your Password'
         style={styles.input}
         secureTextEntry={true}
      />
      <Button text="Create Account" onPress={() => { }} style={styles.button} />
      <Link href={`/(auth)/SignIn`} asChild>
        <Pressable>
          <Text style={styles.textButton}> Sign In </Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 10,
    flex: 1
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
    borderColor: 'grey',
    borderWidth: 0.5
  },
  lable: {
    color: 'grey',
    fontSize: 16,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10
  },
  button:{
    marginTop: 20
  }
})
