import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { colors } from '@/constants/Colors'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import { getUserLocation } from '@/helpers/global_functions/user_functions/user-functions'
import { useUserStore } from '@/helpers/stores/user/user-store'
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response'
import { stadium_get } from '@/helpers/api/api'
import { RootStackParamList } from '@/types/root/root'
import { StadiumTypes } from '@/types/stadium/stadium'
import { Loading } from '@/components/loading/loading'
import StadiumCard from '@/components/cards/StadiumCard'

type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "index"
>;

const ClientDashboard = () => {
  const { userLocation, setUserLocation } = useUserStore();
  const staduims = useGlobalRequest(`${stadium_get}?lat=${userLocation?.coords.latitude}&lang=${userLocation?.coords.longitude}`, 'GET');
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      getUserLocation(setUserLocation)
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      staduims.globalDataFunc();
    }, [userLocation?.coords])
  );

  if (staduims.loading) {
    return <Loading />
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Главная</Text>
          <View style={styles.headerIcon}>
            <MaterialIcons name="history" onPress={() => navigation.navigate('(pages)/(history)/(client)/history')} size={30} color="white" />
            <Entypo name="share" size={27} color="white" />
          </View>
        </View>
        <View style={{ marginTop: 15 }}>
          {/* <Buttons title='Buti masterom'/> */}
          <View>
            <Text style={styles.subTitle}>Мои записи</Text>
            <View style={{ marginTop: 15 }}>
              {staduims.response && staduims.response.map((item: StadiumTypes, index: number) => (
                <StadiumCard
                  key={index}
                  data={item}
                  onMapPress={() => navigation.navigate('(pages)/(maps)/(stadium-locations)/stadium-locations', { id: item.id })}
                  onPress={() => { }}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ClientDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.darkGreen,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
  headerIcon: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center'
  },
  title: {
    fontSize: 25,
    color: colors.white
  },
  subTitle: {
    fontSize: 18,
    color: colors.white
  }
})