import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, useColorScheme } from "react-native";


export default function MenuStack() {
  const colorScheme = useColorScheme();
  return <Stack >
    <Stack.Screen name="index" options={{
      title: 'Menu', headerRight: () => (
        <>
          <Link href="/(admin)/menu/create" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="plus-square-o"
                  size={25}
                  color={Colors[colorScheme ?? 'light'].tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
          <Link href="/" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="power-off"
                  size={25}
                  color={Colors[colorScheme ?? 'light'].tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        </>
      ),
    }} />



  </Stack>
}