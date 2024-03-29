import { View, Text, Image, StyleSheet, Pressable, useColorScheme, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Button from '@/components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { useProduct } from '@/api/products';
import RemoteImage from '@/components/RemoteImage';


const ProductDetailsScreen = () => {
    const { id: idString } = useLocalSearchParams();

    const id = parseFloat(typeof idString === 'string' ? idString: idString?.[0]);

    const { data: product, error, isLoading } = useProduct(id);
    const colorScheme = useColorScheme();

    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

    const { addItem } = useCart();

    const router = useRouter();

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
            <RemoteImage path={product.image} fallback={defaultPizzaImage} style={styles.image} />


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