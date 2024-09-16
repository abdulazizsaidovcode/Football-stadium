import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import Layout from '@/layout/layout';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { BASE_URL, file_get, stadium_get_master } from '@/helpers/api/api';

const Stadium = () => {
  const stadiums = useGlobalRequest(stadium_get_master, 'GET');

  useEffect(() => {
    stadiums.globalDataFunc();
  }, []);

  return (
    <Layout scroll>
      <ScrollView contentContainerStyle={styles.stadiumList}>
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
  card: {
    backgroundColor: '#698474',
    borderRadius: 10,
    marginBottom: 20,
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
