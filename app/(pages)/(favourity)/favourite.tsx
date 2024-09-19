import StadiumCard from '@/components/cards/StadiumCard';
import NavigationMenu from '@/components/navigation/NavigationMenu'
import { favourite_get } from '@/helpers/api/api';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import Layout from '@/layout/layout'
import { StadiumTypes } from '@/types/stadium/stadium';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/root/root'; // Adjust the import according to your file structure
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type NavigationProp = StackNavigationProp<RootStackParamList, 'favourite'>; // Replace 'favourite' with the actual screen name in your stack navigator

export default function Favourite() {
  const [id, setId] = useState<string>('');
  const GetFav = useGlobalRequest(favourite_get, "GET");
  const DelFav = useGlobalRequest(`${favourite_get}/${id}`, "DELETE");
  const navigation = useNavigation<NavigationProp>();
  useEffect(() => {
    GetFav.globalDataFunc();
  }, [])
  return (
    <Layout scroll padding>
      <NavigationMenu name='Любимый' />
      <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {GetFav.response && GetFav.response.map((item: StadiumTypes, index: number) => (
          <StadiumCard
            key={index}
            data={item}
            onFavPress={() => {
              setId(item.id);
              console.log(item.id);
              GetFav.globalDataFunc();
            }}
            iconColor={<MaterialCommunityIcons name="delete-restore" size={24} color="white" />}
            onMapPress={() => navigation.navigate('(pages)/(maps)/(stadium-locations)/stadium-locations', { id: item.id })}
            onPress={() => navigation.navigate('(pages)/(order)/(order-save)/order-save', { id: item.id })}
          />
        ))}
      </View>
    </Layout>
  )
}
