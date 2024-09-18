import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import Layout from '@/layout/layout';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { BASE_URL, file_get, stadium_get_master } from '@/helpers/api/api';
import { StadiumTypes } from '@/types/stadium/stadium';
import { colors } from '@/constants/Colors';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import Buttons from '@/components/button/button';
import { useNavigation } from '@react-navigation/native';
import AddStadium from './(add-stadium)/add-stadium';
import Stadion from '@/assets/images/Real.jpg';
const Stadium = () => {
  const stadiums = useGlobalRequest<StadiumTypes>(stadium_get_master, 'GET');
  const navigation = useNavigation()
  useEffect(() => {
    stadiums.globalDataFunc();
  }, []);

  return (
    <Layout scroll>
      <Image source={Stadion} style={styles.Image} />
      <Text style={styles.ImageBox}></Text>
      <ScrollView contentContainerStyle={styles.stadiumList}>
        <View style={styles.header}>
          <Text style={styles.title}>Стадионы</Text>
          <View style={styles.headerIcon}>
            {/* <Entypo name="share" size={27} color="white" /> */}
          </View>
        </View>
        <Buttons title='+ Add' onPress={() => navigation.navigate('(pages)/(master)/(stadium)/(add-stadium)/add-stadium')} />
        {stadiums.response && stadiums.response.map((stadium: any) => (
          <View key={stadium.id} style={styles.card}>
            <Image
              source={{ uri: `${file_get}${stadium.isMainAttachmentId}` }}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.titleCard}>{stadium.name}</Text>
              <Text style={styles.description}>{stadium.description}</Text>
              <Text style={styles.location}>
                Location: {stadium.lat}, {stadium.lang}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
};

export default Stadium;

const styles = StyleSheet.create({
  stadiumList: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 30
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
  Image: {
    width: '120%',
    position: 'absolute',
    top: 0,
    left: 0,
    height: 130,
    zIndex: -2,
  },
  ImageBox: {
    width: '120%',
    position: 'absolute',
    opacity: 0.8,
    backgroundColor: "black",
    top: 0,
    left: 0,
    height: 130,
  },
  card: {
    backgroundColor: '#698474',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  titleCard: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});
