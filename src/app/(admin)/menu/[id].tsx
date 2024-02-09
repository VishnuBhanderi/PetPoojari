import { View, Text, Image, StyleSheet, Pressable, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Button from '@/components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';


const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams();

    const colorScheme = useColorScheme();

    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

    const product = products.find((p) => p.id.toString() === id);

    const { addItem } = useCart();

    const router = useRouter();

    const addToCart = () => {
        if (!product) {
            return;
        }
        addItem(product, selectedSize);
        router.push('/cart');
    }

    if (!product) {
        return (

            <Text>Product not found</Text>

        )
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{
      title: 'Menu', headerRight: () => (
        <Link href={`/(admin)/menu/create?id=${id}`} asChild>
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="pencil"
                size={25}
                color={Colors[colorScheme ?? 'light'].tint}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
    }} />
            <Stack.Screen options={{ title: product.name }} />
            <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />


            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        
    },
    image: {
        width: '100%',
        aspectRatio: 1
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        // marginTop: 'auto'
    },
   
})
export default ProductDetailsScreen