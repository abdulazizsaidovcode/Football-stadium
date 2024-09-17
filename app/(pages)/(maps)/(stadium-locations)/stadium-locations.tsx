import { ActivityIndicator, Dimensions, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigationMenu from '@/components/navigation/NavigationMenu'
import { colors } from '@/constants/Colors'
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response'
import { stadium_get_one } from '@/helpers/api/api'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'
import { mapCustomStyle } from '@/types/map/map'

//EXAMPLE FOR NAVIGATE
// () => navigation.navigate('(pages)/(maps)/(stadium-locations)/stadium-locations', { id: item.id })

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const StadiumLocations = () => {
  const route = useRoute();
  const { id } = route.params as { id: string | number };

  const stadium = useGlobalRequest(`${stadium_get_one}/${id}`, 'GET');

  useFocusEffect(
    useCallback(() => {
      stadium.globalDataFunc();
    }, [id])
  );

  return (
    <SafeAreaView style={styles.container}>
      <NavigationMenu name={stadium.response ? stadium.response.name : 'Topilmadi'} />
      <View style={{ overflow: 'hidden', borderRadius: 30 }}>
        <MapView
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
          style={styles.map}
          customMapStyle={mapCustomStyle}
          initialRegion={{
            latitude: stadium.response ? stadium.response.lat : 0,
            longitude: stadium.response ? stadium.response.lng : 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: stadium.response ? stadium.response.lat : 0,
              longitude: stadium.response ? stadium.response.lng : 0,
            }}
            title={stadium.response ? stadium.response.name : 'Не найдено'}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default StadiumLocations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGreen,
  },
  map: {
    width: screenWidth,
    height: screenHeight,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight / 1.17,
  },
});
