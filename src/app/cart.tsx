import { View, Text, Platform, FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '@/providers/CartProvider'
import CartListItem from '@/components/CartListItem'
import Button from '@/components/Button'

const CartScreen = () => {

    const { items, total } = useCart();
    if(items.length === 0){
        return (
            <View style={{ padding: 10 , alignItems:'center'}}>
                <Text style = {{fontSize:18, fontWeight:'500', marginVertical: 'auto'}}>Your cart is empty</Text>
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            </View>
        )
    }
    return (
        <View style={{ padding: 10 }}>

            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ padding: 10 }}
            />
            <Text style = {{fontSize:18, fontWeight:'500', marginVertical: 'auto'}}>Total : ${total}</Text>

            <Button text="Checkout" onPress={() => { }} />
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default CartScreen