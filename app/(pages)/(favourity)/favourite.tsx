import StadiumCard from '@/components/cards/StadiumCard';
import NavigationMenu from '@/components/navigation/NavigationMenu'
import { favourite_get, favourite_delate } from '@/helpers/api/api'; // Make sure you have a delete endpoint or function
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import Layout from '@/layout/layout'
import { StadiumTypes } from '@/types/stadium/stadium';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/root/root';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Loading } from '@/components/loading/loading';

type NavigationProp = StackNavigationProp<RootStackParamList, 'favourite'>;

export default function Favourite() {
  const [id, setId] = useState<string>('');
  const GetFav = useGlobalRequest(favourite_get, "GET");
  const DelFav = useGlobalRequest(`${favourite_delate + id}`, "DELETE"); // Assuming favourite_delete is the correct endpoint for deleting a favorite
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    GetFav.globalDataFunc();
  }, [id]);

  useEffect(() => {
    DelFav.globalDataFunc();
    setId('');
    GetFav.globalDataFunc();
  }, [id]);

  return (
    <Layout scroll padding>
      <NavigationMenu name='Любимый' />
      {loading ? (
        <Loading /> 
      ) : (
        <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {GetFav.response && GetFav.response.length > 0 ? (
            GetFav.response.map((item: StadiumTypes, index: number) => (
              <StadiumCard
                key={index}
                data={item}
                onFavPress={() => {
                  setId(item.id);
                }}
                iconColor={<MaterialCommunityIcons name="delete-restore" size={24} color="white" />}
                onMapPress={() => navigation.navigate('(pages)/(maps)/(stadium-locations)/stadium-locations', { id: item.id })}
                onPress={() => navigation.navigate('(pages)/(order)/(order-save)/order-save', { id: item.id })}
              />
            ))
          ) : (
            <Text style={{ textAlign: 'center', fontSize: 16, color: 'gray' }}>No data found</Text>
          )}
        </View>
      )}
    </Layout>
  );
}
