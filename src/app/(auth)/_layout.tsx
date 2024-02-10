import Colors from "@/constants/Colors";
import { useAuth } from "@/providers/AuthProvider";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Redirect, Stack } from "expo-router";
import { Pressable, useColorScheme } from "react-native";


export default function AuthStack() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();

  if (session) {
    console.warn('session exists');
    return <Redirect href={'/'} />
    
  }

  return <Stack />;

}