import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Layout from '@/layout/layout';

const MasterStadium = () => {
  const stadiums = [
    { id: 1, name: 'Stadium 1', location: 'Location 1', image: 'https://picsum.photos/400/200' },
    { id: 2, name: 'Stadium 2', location: 'Location 2', image: 'https://picsum.photos/400/200' },
    { id: 3, name: 'Stadium 3', location: 'Location 3', image: 'https://picsum.photos/500/200' },
  ];

  return (
    <Layout scroll>
      <Image
        // source={{ uri: 'https://picsum.photos/500' }}
        style={styles.image}  // Added style to image
      />
      <View style={styles.container}>
        <Text style={styles.title}>Мои стадионы</Text>
        <Text style={styles.defaultTitle}>Где расположены стадионы?</Text>
      </View>
      <ScrollView contentContainerStyle={styles.stadiumList}>
        {stadiums.map((stadium) => (
          <View key={stadium.id} style={styles.card}>
            <Image source={{ uri: stadium.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.date}>September 14, 2024</Text>
              <Text style={styles.titleCard}>{stadium.name}</Text>
              <Text style={styles.description}>
                {stadium.location} is one of the major locations of the city, offering a rich history and numerous modern amenities. Discover more about this stadium!
              </Text>
              <Text style={styles.link}>Find out more</Text>
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

  defaultTitle: {
    color: "#6A9C89",
    fontSize: 16,
    // marginVertical: 10,
  },
  image: {
    width: 500,
    height: 100,
    resizeMode: 'cover',
  },
  stadiumList: {
    padding: 20,
  },
  card: {
    backgroundColor: '#698474', // dark background for the card
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%', // ensure the image takes full width of the card
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  date: {
    fontSize: 12,
    color: '#A9A9A9', // lighter text color for the date
    marginBottom: 5,
  },
  titleCard: {
    fontSize: 20,
    color: '#FFFFFF', // white text color for the title
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC', // light gray for the description text
    marginBottom: 15,
  },
  link: {
    fontSize: 14,
    color: '#00BFFF', // light blue for the 'Find out more' link
  },
});
