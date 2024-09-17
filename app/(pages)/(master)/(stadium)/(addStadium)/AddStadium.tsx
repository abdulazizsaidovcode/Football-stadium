import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import Layout from '@/layout/layout';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { stadium_post_master } from '@/helpers/api/api';
import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';

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
    images: [],
    mainImage: null,
  });

  const [error, setError] = useState('');

  const navigation = useNavigation();

  const handleInputChange = (field: any, value: string | number | boolean) => {
    setStadium({ ...stadium, [field]: value });
  };

  const validateForm = () => {
    if (!stadium.name || !stadium.number || !stadium.price) {
      setError('Name, Number, and Price are required.');
      return false;
    }
    if (isNaN(Number(stadium.number)) || isNaN(Number(stadium.price))) {
      setError('Number and Price should be valid numbers.');
      return false;
    }
    if (stadium.images.length === 0) {
      setError('Please select at least one image.');
      return false;
    }
    if (!stadium.mainImage) {
      setError('Please select a main image.');
      return false;
    }
    setError('');
    return true;
  };

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setStadium({ ...stadium, images: result.assets });
    }
  };

  const setMainImage = (uri: string) => {
    setStadium({ ...stadium, mainImage: uri });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('name', stadium.name);
    formData.append('number', stadium.number);
    formData.append('lat', stadium.lat);
    formData.append('lang', stadium.lang);
    formData.append('price', stadium.price);
    formData.append('initialPay', stadium.initialPay);
    formData.append('length', stadium.length);
    formData.append('width', stadium.width);
    formData.append('description', stadium.description);
    formData.append('startHour', stadium.startHour);
    formData.append('startMinute', stadium.startMinute);
    formData.append('endHour', stadium.endHour);
    formData.append('endMinute', stadium.endMinute);

    // Append images to formData
    stadium.images.forEach((image, index) => {
      formData.append(`images[${index}]`, {
        uri: image.uri,
        type: 'image/jpeg',
        name: `image_${index}.jpg`,
      });
    });

    // Append main image
    formData.append('mainImage', stadium.mainImage);

    try {
      // Send request
      const sendCode = await useGlobalRequest(stadium_post_master, 'POST', formData);

      if (sendCode.success) {
        // If successful, navigate back
        navigation.goBack();
      } else {
        // Handle unsuccessful response
        setError('Failed to add stadium. Please try again.');
      }
    } catch (error) {
      // Handle any other error
      setError('Submission failed. Please try again.');
    }
  };


  return (
    <Layout scroll>
      <View style={styles.container}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Text style={styles.title}>Add Stadium</Text>
        <Text style={styles.subtitle}>Please fill in the required fields</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="Name"
          value={stadium.name}
          onChangeText={(text) => handleInputChange('name', text)}
          style={styles.input}
        />
        <Text style={styles.label}>Number</Text>
        <TextInput
          placeholder="Number"
          value={stadium.number}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('number', text)}
          style={styles.input}
        />

        <Text style={styles.label}>Latitude</Text>
        <TextInput
          placeholder="Latitude"
          value={stadium.lat}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('lat', text)}
          style={styles.input}
        />

        <Text style={styles.label}>Longitude</Text>
        <TextInput
          placeholder="Longitude"
          value={stadium.lang}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('lang', text)}
          style={styles.input}
        />

        <Text style={styles.label}>Price</Text>
        <TextInput
          placeholder="Price"
          value={stadium.price}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('price', text)}
          style={styles.input}
        />

        <Text style={styles.label}>Initial Pay</Text>
        <TextInput
          placeholder="Initial Pay"
          value={stadium.initialPay}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('initialPay', text)}
          style={styles.input}
        />

        <Text style={styles.label}>Length</Text>
        <TextInput
          placeholder="Length"
          value={stadium.length}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('length', text)}
          style={styles.input}
        />

        <Text style={styles.label}>Width</Text>
        <TextInput
          placeholder="Width"
          value={stadium.width}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('width', text)}
          style={styles.input}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="Description"
          value={stadium.description}
          onChangeText={(text) => handleInputChange('description', text)}
          style={styles.input}
        />

        <Text style={styles.label}>Start Hour</Text>
        <TextInput
          placeholder="Start Hour"
          value={stadium.startHour}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('startHour', text)}
          style={styles.input}
        />

        <Text style={styles.label}>Start Minute</Text>
        <TextInput
          placeholder="Start Minute"
          value={stadium.startMinute}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('startMinute', text)}
          style={styles.input}
        />

        <Text style={styles.label}>End Hour</Text>
        <TextInput
          placeholder="End Hour"
          value={stadium.endHour}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('endHour', text)}
          style={styles.input}
        />

        <Text style={styles.label}>End Minute</Text>
        <TextInput
          placeholder="End Minute"
          value={stadium.endMinute}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange('endMinute', text)}
          style={styles.input}
        />



        <Text style={styles.label}>Images</Text>
        <Button title="Pick Images" onPress={pickImages} />
        <ScrollView horizontal>
          {stadium.images.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => setMainImage(image.uri)}>
              <Image source={{ uri: image.uri }} style={styles.image} />
              {stadium.mainImage === image.uri && <Text style={styles.mainLabel}>Main</Text>}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Button title="Submit Stadium" onPress={handleSubmit} />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 35,
    marginBottom: 10,
    marginTop: 40,
    fontWeight: 'bold',
    color: '#C4DAD2',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#fff',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    color: '#fff',
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  mainLabel: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    paddingHorizontal: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
});

// import React, { useEffect, useState } from 'react';
// import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT, MapPressEvent, Region } from 'react-native-maps';
// import NavigationMenu from '@/components/navigation/navigation-menu';
// import Explanations from '@/components/(explanations)/explanations';
// import LocationInput from '../locationInput';
// import { mapCustomStyle } from '@/type/map/map';
// import tw from 'tailwind-react-native-classnames';
// import { getUserLocation } from '@/helpers/api-function/getMe/getMee';
// import useGetMeeStore from '@/helpers/state_managment/getMee';
// import Textarea from '@/components/select/textarea';
// import Buttons from '@/components/(buttons)/button';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// const AddMasterLocation: React.FC = () => {
//     const [markerPosition, setMarkerPosition] = useState<Region | null>(null);
//     const { userLocation, setUserLocation } = useGetMeeStore()

//     useEffect(() => {
//         getUserLocation(setUserLocation)
//     }, [])

//     const handleMapPress = (e: MapPressEvent) => {
//         const { latitude, longitude } = e.nativeEvent.coordinate;
//         setMarkerPosition({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView>
//                 <NavigationMenu name='Мой адрес работы' />
//                 <View>
//                     <Explanations text='Настройте локацию своего рабочего места' />
//                     <View style={{ marginTop: 10, flexDirection: 'column', gap: 10 }}>
//                         <LocationInput
//                             placeholder='Введите название салона красоты'
//                             labalVisible
//                             label='Название салона'
//                         />
//                         <View>
//                             <Text style={[tw`text-gray-500 mb-2 text-md`]}>Укажите свой салон на карте</Text>
//                             <View style={{ borderRadius: 20, overflow: 'hidden', height: screenHeight / 3 }}>
//                                 <MapView
//                                     provider={PROVIDER_DEFAULT}
//                                     style={styles.map}
//                                     // customMapStyle={mapCustomStyle}
//                                     onPress={handleMapPress}
//                                     showsUserLocation
//                                     initialRegion={{
//                                         latitude: userLocation.coords.latitude, // Default initial region
//                                         longitude: userLocation.coords.longitude,
//                                         latitudeDelta: 0.0922,
//                                         longitudeDelta: 0.0421,
//                                     }}
//                                 >
//                                     {markerPosition && (
//                                         <Marker
//                                             coordinate={markerPosition}
//                                             title='Мое рабочее место'
//                                             description='Выбранное местоположение'
//                                         />
//                                     )}
//                                 </MapView>
//                             </View>
//                         </View>
//                         <View>
//                             <Text style={[tw`text-gray-500 mb-2 text-md`]}>Адрес</Text>
//                             <Textarea value='' />
//                         </View>
//                         <LocationInput
//                             labalVisible
//                             label='Ориентир'
//                         />
//                     </View>
//                 </View>
//             </ScrollView>
//             <View>
//                 <Buttons
//                     title={`Сохранить`}
//                     // onPress={saveAlbum}
//                     // isDisebled={!(images.length === 0 || !albumName)}
//                 />
//             </View>
//         </SafeAreaView>
//     );
// };

// export default AddMasterLocation;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#21212E',
//         padding: 16,
//         position: 'relative'
//     },
//     map: {
//         width: screenWidth * 1.05,
//         height: screenHeight / 2,
//     },
// })
