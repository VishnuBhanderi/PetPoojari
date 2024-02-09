import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, useColorScheme } from "react-native";


export default function AuthStack() {
  const colorScheme = useColorScheme();
  return <Stack>
    <Stack.Screen name="SignIn" options={{
      title: 'Sign In',
    }} />

  </Stack>
}