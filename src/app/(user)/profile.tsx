import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';
import { Stack, useRouter } from 'expo-router';


export default function ProfileScreen() {

    const router = useRouter();
    return (
        <View style={styles.container}>
            <Button text="SignOut" onPress={async () => {
                await supabase.auth.signOut();
                console.log('signed out');
                router.push('/(auth)/SignIn');
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
