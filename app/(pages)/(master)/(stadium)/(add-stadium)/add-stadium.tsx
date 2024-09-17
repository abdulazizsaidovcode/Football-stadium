import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
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
  const { setUserLocation, userLocation } = useUserStore()

  useEffect(() => {
    getUserLocation(setUserLocation)
  }, [])

  const handleMapPress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });
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
          />
          <Input
            labalVisible
            label='Count'
            placeholder='Enter count'
          />
          <Input
            labalVisible
            label='Price'
            placeholder='Enter price'
          />
          <Input
            labalVisible
            label='Initial pay'
            placeholder='Enter initial pay'
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
              />
            </View>
            <View style={{ width: '47%' }}>
              <Input
                labalVisible
                label='Height'
                placeholder='Enter height'
              />
            </View>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={[styles.label, { marginBottom: 8 }]}>Description</Text>
            <Textarea placeholder='Enter description'/>
          </View>
          <View></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddStadium

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
})