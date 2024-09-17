import { Dimensions, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigationMenu from '@/components/navigation/NavigationMenu'
import Input from '@/components/input/input'
import Textarea from '@/components/textarea/textarea'
import MapView, { MapPressEvent, Marker, PROVIDER_DEFAULT, Region } from 'react-native-maps'
import { getUserLocation } from '@/helpers/global_functions/user_functions/user-functions'
import { useUserStore } from '@/helpers/stores/user/user-store'
import { mapCustomStyle } from '@/types/map/map'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const AddStadium = () => {
  const [markerPosition, setMarkerPosition] = useState<Region | null>(null);
  const [details, setDetails] = useState({ toilet: false, shower: false, shop: false });
  const { setUserLocation, userLocation } = useUserStore();
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    count: '',
    price: '',
    initialPay: '',
    width: '',
    height: ''
  });

  useEffect(() => {
    getUserLocation(setUserLocation);
  }, []);

  const handleMapPress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });
  };
  const payload = {
    name: formValues.name,
    description: formValues.description,
    width: +formValues.width,
    height: +formValues.height,
    number: +formValues.count,
    initialPay: +formValues.initialPay,
    lat: markerPosition?.latitude,
    lng: markerPosition?.longitude,
    shower: details.shower,
    shop: details.shop,
    toilet: details.toilet,
  }

  console.log(payload);
  

  const handleInputChange = (field: string, value: string) => {
    if (['count', 'price', 'initialPay', 'width', 'height', 'description'].includes(field)) {
      if (/^\d*\.?\d*$/.test(value)) {
        setFormValues({ ...formValues, [field]: value });
      }
    } else {
      setFormValues({ ...formValues, [field]: value });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationMenu name='Add stadium' />
      <ScrollView>
        <View>
          <Input
            labalVisible
            label='Name'
            placeholder='Enter name'
            value={formValues.name}
            onChangeText={(value) => handleInputChange('name', value)}
          />
          <Input
            labalVisible
            label='Count'
            placeholder='Enter count'
            type='numeric'
            value={formValues.count}
            onChangeText={(value) => handleInputChange('count', value)}
          />
          <Input
            labalVisible
            label='Price'
            placeholder='Enter price'
            type='numeric'
            value={formValues.price}
            onChangeText={(value) => handleInputChange('price', value)}
          />
          <Input
            labalVisible
            label='Initial pay'
            placeholder='Enter initial pay'
            type='numeric'
            value={formValues.initialPay}
            onChangeText={(value) => handleInputChange('initialPay', value)}
          />
          <Text style={[styles.label, { marginBottom: 8 }]}>Description</Text>
          <View style={{ borderRadius: 20, overflow: 'hidden', height: screenHeight / 3, marginBottom: 12 }}>
            <MapView
              provider={PROVIDER_DEFAULT}
              style={styles.map}
              customMapStyle={mapCustomStyle}
              onPress={handleMapPress}
              showsUserLocation
              initialRegion={{
                latitude: userLocation?.coords ? userLocation.coords.latitude : 0,
                longitude: userLocation?.coords ? userLocation.coords.longitude : 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {markerPosition && (
                <Marker
                  coordinate={markerPosition}
                />
              )}
            </MapView>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '47%' }}>
              <Input
                labalVisible
                label='Width'
                placeholder='Enter width'
                type='numeric'
                value={formValues.width}
                onChangeText={(value) => handleInputChange('width', value)}
              />
            </View>
            <View style={{ width: '47%' }}>
              <Input
                labalVisible
                label='Height'
                placeholder='Enter height'
                type='numeric'
                value={formValues.height}
                onChangeText={(value) => handleInputChange('height', value)}
              />
            </View>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={[styles.label, { marginBottom: 8 }]}>Description</Text>
            <Textarea
              onChangeText={(value) => handleInputChange('description', value)}
              placeholder='Enter description'
              value={formValues.description}
            />
          </View>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.inDarkGreen, padding: 10, borderRadius: 10 }}>
              <Text style={[styles.label]}>Toilet</Text>
              <Switch
                onValueChange={() => setDetails({ ...details, toilet: !details.toilet })}
                value={details.toilet}
                trackColor={{ false: "#767577", true: colors.lightGreen }}
                thumbColor={'#fff'}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.inDarkGreen, padding: 10, borderRadius: 10, marginVertical: 10 }}>
              <Text style={[styles.label]}>Shop</Text>
              <Switch
                onValueChange={() => setDetails({ ...details, shop: !details.shop })}
                value={details.shop}
                trackColor={{ false: "#767577", true: colors.lightGreen }}
                thumbColor={'#fff'}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.inDarkGreen, padding: 10, borderRadius: 10 }}>
              <Text style={[styles.label]}>Shower</Text>
              <Switch
                onValueChange={() => setDetails({ ...details, shower: !details.shower })}
                value={details.shower}
                trackColor={{ false: "#767577", true: colors.lightGreen }}
                thumbColor={'#fff'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddStadium;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGreen,
    paddingHorizontal: 16
  },
  label: {
    color: "white",
    fontSize: 16,
  },
  map: {
    width: screenWidth * 1.05,
    height: screenHeight / 2,
  },
});
