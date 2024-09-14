import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Layout from '@/layout/layout';
import { colors } from '@/constants/Colors';

const MasterStadium = () => {
  const stadiums = [
    { id: 1, name: 'Stadium 1', location: 'Location 1', image: 'https://picsum.photos/400/200' },
    { id: 2, name: 'Stadium 2', location: 'Location 2', image: 'https://picsum.photos/401/200' },
    { id: 3, name: 'Stadium 3', location: 'Location 3', image: 'https://picsum.photos/402/200' },
  ];

  return (
    <Layout scroll>
      <Image
        source={{ uri: 'https://picsum.photos/500' }}
        style={styles.image}  // Added style to image
      />
      <View style={styles.container}>
        <Text style={styles.title}>Стадионы</Text>
        <Text style={styles.defaultTitle}>Где расположены стадионы?</Text>
      </View>
      <ScrollView contentContainerStyle={styles.stadiumList}>
        {stadiums.map((stadium) => (
          <View key={stadium.id} style={styles.card}>
            <Image source={{ uri: stadium.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.titleCard}>{stadium.name}</Text>
              <Text style={styles.location}>{stadium.location}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
};

export default MasterStadium;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  title: {
    color: "#C4DAD2",
    marginTop: -40,
    fontSize: 30,
    marginVertical: 20,
  },
  titleCard: {
    color: "#C4DAD2",
    // marginTop: 0,
    fontSize: 30,
    marginVertical: 10,
  },
  defaultTitle: {
    color: "#6A9C89",
    fontSize: 16,
    // marginVertical: 10,
  },
  image: {
    width: 500,
    height: 200,
    resizeMode: 'cover',
  },
  stadiumList: {
    padding: 20,
  },

  card: {
    backgroundColor: "#6A9C89",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
    overflow: 'hidden', // Ensures the border radius applies to the image as well
  },
  cardContent: {
    padding: 15,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
