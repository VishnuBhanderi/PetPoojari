import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import products from '@assets/data/products';

const CreateProductScreen = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [error, setError] = useState('');

    const { id } = useLocalSearchParams();
    const product = products.find((p) => p.id.toString() === id);
    const isUpdating = !!id;

    const preFillTheForm = () => {
        if (isUpdating) {
            setName(product?.name || '');
            setPrice(product?.price.toString() || '');
            setImage(product?.image || null);
        }
    }
    useEffect(() => {
        preFillTheForm();
    }, [id])

    const router = useRouter();
    const validateInput = () => {
        //Validate Input
        setError('');
        if (!name || !price) {
            setError('Name and Price are required')
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setError('Price is not a number')
            return false;
        }
        return true;
    }

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }
        setError('');
        console.warn('Creating  Product: ', name)

        //Save in Database

        setName('');
        setPrice('');
        setImage('');
        router.back();

    }

    const onUpdate = () => {
        if (!validateInput()) {
            return;
        }
        setError('');
        console.warn('Updating Product: ', name)

        //Update in Database

        setName('');
        setPrice('');
        setImage('');
        router.back();

    }

    const onSubmit = () => {
        if (isUpdating) {
            onUpdate();
        } else {
            onCreate();
        }
    }

    const onDelete = () => {
        console.warn('Deleting Product: ', name)
        //Delete from Database
        setName('');
        setPrice('');
        setImage('');
        router.back();
    }

    const confirmDelete = () => {
      Alert.alert('Delete', 'Are you sure you want to delete this product?', [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: onDelete,
        },
      ]);
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: isUpdating ? 'Update Dish' : 'Create Dish' }} />

            <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} resizeMode="contain" />

            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

            <Text style={styles.lable}>Name</Text>
            <TextInput value={name} onChangeText={setName} placeholder='Name' style={styles.input} />


            <Text style={styles.lable}>Price</Text>
            <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder='9.99'
                style={styles.input}
                keyboardType='numeric'
            />
            <Text style={{ color: 'red' }}>{error}</Text>
            <Button text={isUpdating ? 'Update Product' : 'Create Product'} onPress={onSubmit} />
            {isUpdating && <Button text='Delete Product' onPress={confirmDelete} />}
        </View>
    )
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
    },
    lable: {
        color: 'grey',
        fontSize: 16,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
        borderRadius: 50,
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10
    }
})
export default CreateProductScreen