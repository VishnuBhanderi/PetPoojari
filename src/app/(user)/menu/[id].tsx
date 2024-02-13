import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { defaultPizzaImage } from '@/components/ProductListItem';
import Button from '@/components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import { useProduct } from '@/api/products';
import RemoteImage from '@/components/RemoteImage';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
    const { id: idString } = useLocalSearchParams();

    const id = parseFloat(typeof idString === 'string' ? idString: idString?.[0]);

    const { data: product, error, isLoading } = useProduct(id);

    const { addItem } = useCart();

    const router = useRouter();

    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

    const addToCart = () => {
        if (!product) {
            return;
        }
        addItem(product, selectedSize);
        router.push('/cart');
    }

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>Failed to fetch the products</Text>
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product.name }} />
            <RemoteImage path={product.image} fallback={defaultPizzaImage} style={styles.image} />
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