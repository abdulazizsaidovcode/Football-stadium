import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import Layout from '@/layout/layout';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { file_get, stadium_get_master } from '@/helpers/api/api';
import { StadiumTypes } from '@/types/stadium/stadium';
import { colors } from '@/constants/Colors';
import Buttons from '@/components/button/button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Loading } from '@/components/loading/loading';

const Stadium = () => {
  const stadiums = useGlobalRequest<StadiumTypes>(stadium_get_master, 'GET');
  const navigation = useNavigation<any>();

  useFocusEffect(
    useCallback(() => {
      stadiums.globalDataFunc();
    }, [stadiums.globalDataFunc])
  )

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#2C3639', position: 'relative',
    }}>
      <ScrollView>

        <Image source={require('@/assets/images/Real.jpg')} style={styles.Image} />
        <Text style={styles.ImageBox}></Text>
        <ScrollView contentContainerStyle={styles.stadiumList}>
          <View style={styles.header}>
            <Text style={styles.title}>Stadionlar</Text>
            <View style={styles.headerIcon}>
              {/* <Entypo name="share" size={27} color="white" /> */}
            </View>
          </View>
          {stadiums.loading ? <View style={{ height: 500 }}><Loading /></View> : stadiums.response ? stadiums.response.map((stadium: StadiumTypes) => (
            <TouchableOpacity onPress={() => navigation.navigate('(pages)/(master)/(stadium)/(edit-stadium)/edit-stadium', { id: stadium.id })} activeOpacity={.8} key={stadium.id} style={styles.card}>
              <Image
                source={stadium.isMainAttachmentId ? { uri: `${file_get}${stadium.isMainAttachmentId}` } : require('../../../../assets/images/defaultImg.jpeg')}
                style={styles.cardImage}

              />
              <View style={styles.cardContent}>
                <Text style={styles.titleCard}>{stadium.name}</Text>
                <Text style={styles.description}>{stadium.description}</Text>
              </View>
            </TouchableOpacity>
          )) : <Text style={{ marginTop: 20, textAlign: 'center', color: "white" }}>Stadionlaringiz mavjud emas</Text>}
        </ScrollView>
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 0, paddingHorizontal: 16, width: '100%', backgroundColor: colors.darkGreen, paddingVertical: 10 }}>
        <Buttons title='+ Add' onPress={() => navigation.navigate('(pages)/(master)/(stadium)/(add-stadium)/add-stadium')} />
      </View>
    </SafeAreaView>
  );
};

export default Stadium;

const styles = StyleSheet.create({
  stadiumList: {
    padding: 20,
    marginBottom: 50
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
