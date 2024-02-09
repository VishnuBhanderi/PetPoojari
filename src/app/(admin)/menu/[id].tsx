import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Button from '@/components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams();

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
            <Stack.Screen options={{ title: product.name }} />
            <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />
            <Text style={styles.subtitle}>Select size</Text>
            <View style={styles.sizes}>
                {sizes.map((size) => (
                    <Pressable onPress={() => { setSelectedSize(size) }} style={[styles.size, { backgroundColor: selectedSize != size ? 'white' : 'gainsboro' }]} key={size}>
                        <Text style={[styles.sizeText, { color: selectedSize == size ? 'black' : 'gray' }]}>{size}</Text>
                    </Pressable>
                ))}
            </View>


            <Text style={styles.price}>${product.price}</Text>
            <Button text="Add to cart" onPress={addToCart} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        flex: 1
    },
    subtitle: {
        marginVertical: 10,
        fontWeight: '600',
      },
    image: {
        width: '100%',
        aspectRatio: 1
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        marginTop: 'auto'
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    size: {

        backgroundColor: 'gainsboro',
        padding: 10,
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sizeText: {
        fontSize: 20,
        fontWeight: '500'
    }
})
export default ProductDetailsScreen