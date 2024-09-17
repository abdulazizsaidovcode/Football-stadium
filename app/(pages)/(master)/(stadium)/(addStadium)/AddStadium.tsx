import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Text } from 'react-native';
import Layout from '@/layout/layout';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { useNavigation } from '@react-navigation/native';
import { stadium_post_master } from '@/helpers/api/api';

export default function AddStadium() {
  const [stadium, setStadium] = useState({
    name: '',
    number: '',
    lat: '',
    lang: '',
    price: '',
    initialPay: '',
    length: '',
    width: '',
    description: '',
    startHour: '',
    startMinute: '',
    endHour: '',
    endMinute: '',
    image: null,
  });

  const [error, setError] = useState(''); // For displaying validation messages

  const sendCode = useGlobalRequest(stadium_post_master, 'POST', stadium);
  const navigation = useNavigation();

  const handleInputChange = (field: any, value: string | number | boolean) => {
    setStadium({ ...stadium, [field]: value });
  };

  const validateForm = () => {
    // Basic validation for required fields
    if (!stadium.name || !stadium.number || !stadium.price) {
      setError('Name, Number, and Price are required.');
      return false;
    }

    // Validation for numeric fields
    if (isNaN(Number(stadium.number)) || isNaN(Number(stadium.price))) {
      setError('Number and Price should be valid numbers.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await sendCode();
      navigation.goBack();
    } catch (error) {
      setError('Submission failed. Please try again.');
    }
  };

  return (
    <Layout scroll>
      <View style={styles.container}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          placeholder="Name"
          value={stadium.name}
          onChangeText={(text) => handleInputChange('name', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Number"
          value={stadium.number}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('number', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Latitude"
          value={stadium.lat}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('lat', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Longitude"
          value={stadium.lang}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('lang', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Price"
          value={stadium.price}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('price', text)}
          style={styles.input}    
        />
        <TextInput
          placeholder="Initial Pay"
          value={stadium.initialPay}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('initialPay', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Length"
          value={stadium.length}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('length', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Width"
          value={stadium.width}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('width', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={stadium.description}
          onChangeText={(text) => handleInputChange('description', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Start Hour"
          value={stadium.startHour}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('startHour', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Start Minute"
          value={stadium.startMinute}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('startMinute', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="End Hour"
          value={stadium.endHour}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('endHour', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="End Minute"
          value={stadium.endMinute}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('endMinute', text)}
          style={styles.input}
        />

        <Button title="Submit Stadium" onPress={handleSubmit} />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
});
