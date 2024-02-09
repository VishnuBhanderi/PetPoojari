import { View, Text } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link } from 'expo-router';
import { Redirect } from 'expo-router';

const index = () => {
  return (
    <Redirect href={'/(auth)/SignIn'} />
  );
};

export default index;