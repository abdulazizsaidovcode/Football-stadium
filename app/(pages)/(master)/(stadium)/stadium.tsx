import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import Layout from '@/layout/layout';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { card, file_get, stadium_get_master } from '@/helpers/api/api';
import { StadiumTypes } from '@/types/stadium/stadium';
import { colors } from '@/constants/Colors';
import Buttons from '@/components/button/button';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { Loading } from '@/components/loading/loading';
import { Entypo } from '@expo/vector-icons';
import { RootStackParamList } from '@/types/root/root';
import { getSize } from '@/constants/sizes';
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList>;

const Stadium = () => {
  const stadiums = useGlobalRequest(stadium_get_master, 'GET');
  const cards = useGlobalRequest(card.split('/api/v1').join(''), 'GET');
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      stadiums.globalDataFunc();
      cards.globalDataFunc();
    }, [])
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
            <Text style={styles.title}>Maydonlar</Text>
          </View>
          {!stadiums.loading ?
            stadiums.response ?
              stadiums.response.map((stadium: StadiumTypes) => (
                <TouchableOpacity onPress={() => navigation.navigate('(pages)/(master)/(stadium)/(edit-stadium)/edit-stadium', { id: stadium.id })} activeOpacity={.8} key={stadium.id} style={styles.card}>
                  <Image
                    source={stadium.isMainAttachmentId ? { uri: `${file_get}${stadium.isMainAttachmentId}` } : require('../../../../assets/images/defaultImg.jpeg')}
                    style={styles.cardImage}
                    height={200}
                  />
                  <View style={styles.cardContent}>
                    <Text style={styles.titleCard}>{stadium.name}</Text>
                    <Text style={styles.description}>{stadium.description}</Text>
                  </View>
                </TouchableOpacity>
              )) : <Text style={{ marginTop: 20, textAlign: 'center', color: "white" }}>Stadionlaringiz mavjud emas</Text>
            : <View style={{ height: 500 }}><Loading /></View>
          }
        </ScrollView>
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 0, paddingHorizontal: getSize('defaultPadding'), width: '100%', backgroundColor: colors.darkGreen, paddingVertical: 10 }}>
        <Buttons
          icon={<Entypo name="plus" size={24} color="white" />}
          title="Maydon qo'shish
          "
          onPress={() => {
            if (cards.response && cards.response.length === 0) {
              alert('Dovud kut birinchi carta qush')
            } else navigation.navigate('(pages)/(master)/(stadium)/(add-stadium)/add-stadium')
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Stadium;

const styles = StyleSheet.create({
  stadiumList: {
    padding: getSize('defaultPadding'),
    marginBottom: 50
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 30
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
    objectFit: 'cover',

  },
  cardContent: {
    padding: 15,
  },
  titleCard: {
    fontSize: getSize('mediumText'),
    color: '#FFFFFF',
    marginBottom: 10,
  },
  description: {
    fontSize: getSize('smallText'),
    color: '#CCCCCC',
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});
