import { BackHandler, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Colors, colors } from '@/constants/Colors';
import { Entypo, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { getUserLocation } from '@/helpers/global_functions/user_functions/user-functions';
import { useUserStore } from '@/helpers/stores/user/user-store';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { favourite_add, favourite_get, stadium_get, stadium_search } from '@/helpers/api/api';
import { RootStackParamList } from '@/types/root/root';
import { StadiumTypes } from '@/types/stadium/stadium';
import { Loading } from '@/components/loading/loading';
import StadiumCard from '@/components/cards/StadiumCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Buttons from '@/components/button/button';
import Input from '@/components/input/input';

type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "(pages)/(client)/(dashboard)/dashboard"
>;

const ClientDashboard = () => {
  const { userLocation, setUserLocation } = useUserStore();
  const [token, setToken] = useState<string | null>(null);
  const [stadiumData, setStadiumData] = useState<StadiumTypes[] | null>(null);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [backPressCount, setBackPressCount] = useState(0);
  const [role, setRole] = useState<string | null>(null);
  const [getId, setGetId] = useState<string>('');
  const [getFavId, setFavGetId] = useState<string>('');

  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const stadiumsRequest = useGlobalRequest(
    inputValue ? `${stadium_search}?name=${inputValue}` : `${stadium_get}?lat=${userLocation?.coords.latitude}&lang=${userLocation?.coords.longitude}`,
    'GET'
  );

  const favRequest = useGlobalRequest(favourite_get, 'GET');

  const addFavRequest = useGlobalRequest(`${favourite_add}/${getId}`, 'POST', {}, 'DEFAULT');

  // Combine useFocusEffect hooks
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await getUserLocation(setUserLocation);
        setToken(await AsyncStorage.getItem('token'));
        setRole(await AsyncStorage.getItem('role'));
        stadiumsRequest.globalDataFunc();
        favRequest.globalDataFunc();
      };

      fetchData();

      const onBackPress = () => {
        if (backPressCount === 0) {
          setBackPressCount(backPressCount + 1);
          alert("Orqaga qaytish uchun yana bir marta bosing");
          setTimeout(() => {
            setBackPressCount(0);
          }, 2000);
          return true;
        } else {
          BackHandler.exitApp();
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [backPressCount, stadiumsRequest, favRequest, setUserLocation])
  );

  useEffect(() => {
    if (stadiumsRequest.response) {
      setStadiumData(stadiumsRequest.response);
    } else if (stadiumsRequest.error) {
      setStadiumData(null);
    }
  }, [stadiumsRequest.response, stadiumsRequest.error]);

  useEffect(() => {
    if (inputValue) {
      stadiumsRequest.globalDataFunc();
    }
  }, [inputValue]);

  useEffect(() => {
    if (getId) {
      addFavRequest.globalDataFunc();
      favRequest.globalDataFunc();
    }
  }, [getId]);

  useEffect(() => {
    if (favRequest.response) {
      const favId = favRequest.response.map((item: { id: string }) => item.id);
      setFavGetId(favId[0] || '');
    }
  }, [favRequest.response]);

  if (stadiumsRequest.loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <ScrollView>
        {role && token && (
          <View style={styles.header}>
            <Text style={styles.title}>Главная</Text>
            <View style={styles.headerIcon}>
              <MaterialIcons
                name="history"
                onPress={() => navigation.navigate('(pages)/(history)/(client)/history')}
                size={30}
                color="white"
              />
              <Entypo name="share" size={27} color="white" />
            </View>
          </View>
        )}
        <View style={{ marginTop: 15 }}>
          <Input
            value={inputValue || ''}
            onChangeText={setInputValue}
            label='Поиск по имени'
          />
          <Text style={styles.subTitle}>{role && token ? "Мои записи" : "Stadionlar"}</Text>
          <View style={{ marginTop: 15, gap: 10 }}>
            {stadiumData && stadiumData.map((item: StadiumTypes, index: number) => (
              <StadiumCard
                key={index}
                data={item}
                onFavPress={() => {
                  setGetId(item.id);
                }}
                iconColor={getFavId === item.id ? <FontAwesome6 name="hello" size={24} color="white" /> : undefined}
                onMapPress={() => navigation.navigate('(pages)/(maps)/(stadium-locations)/stadium-locations', { id: item.id })}
                onPress={() => navigation.navigate('(pages)/(order)/(order-save)/order-save', { id: item.id })}
              />
            ))}
          </View>
          <Buttons onPress={() => navigation.navigate('(pages)/(auth)/(login)/login')} title='Login' />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
});
