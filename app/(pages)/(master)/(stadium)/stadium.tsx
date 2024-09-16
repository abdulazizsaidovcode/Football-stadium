import { Image, StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '@/layout/layout';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { BASE_URL } from '@/helpers/api/api';
import { getConfig } from '@/helpers/api/token';

const Stadium = () => {
  const [form, setForm] = useState({
    name: '',
    number: 0,
    lat: 0,
    lang: 0,
    price: 0,
    initialPay: '',
    length: 0,
    width: 0,
    description: '',
    startHour: 0,
    startMinute: 0,
    endHour: 0,
    endMinute: 0,
    attechmentIds: [''],
  });
  const [editingStadium, setEditingStadium] = useState(null);
  const [stadiums, setStadiums] = useState([]);

  const { loading, error, response, globalDataFunc } = useGlobalRequest<any[]>(
    `${BASE_URL}stadium/for/master`,
    'GET',
    getConfig()
  );

  // Fetch data on component mount
  useEffect(() => {
    globalDataFunc().then((res) => {
      setStadiums(res.data || []);
    });
  }, []);

  const handleSubmit = () => {
    const method = editingStadium ? 'PUT' : 'POST';
    const url = editingStadium
      ? `${BASE_URL}stadium/${editingStadium.id}`
      : `${BASE_URL}stadium`;

    const { loading, error, response, globalDataFunc } = useGlobalRequest<any>(
      url,
      method,
      form
    );

    globalDataFunc().then(() => {
      setForm({
        name: '',
        number: 0,
        lat: 0,
        lang: 0,
        price: 0,
        initialPay: '',
        length: 0,
        width: 0,
        description: '',
        startHour: 0,
        startMinute: 0,
        endHour: 0,
        endMinute: 0,
        attechmentIds: [''],
      });
      setEditingStadium(null);
      globalDataFunc().then((res) => setStadiums(res.data || []));
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleEdit = (stadium: any) => {
    setForm({
      name: stadium.name,
      number: stadium.number,
      lat: stadium.lat,
      lang: stadium.lang,
      price: stadium.price,
      initialPay: stadium.initialPay,
      length: stadium.length,
      width: stadium.width,
      description: stadium.description,
      startHour: stadium.startHour,
      startMinute: stadium.startMinute,
      endHour: stadium.endHour,
      endMinute: stadium.endMinute,
      attechmentIds: stadium.attechmentIds,
    });
    setEditingStadium(stadium);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading stadiums: {error.message}</Text>;
  }

  return (
    <Layout scroll>
      <View style={styles.container}>
        <Text style={styles.title}>Add/Edit Stadium</Text>
        <TextInput
          placeholder="Name"
          value={form.name}
          onChangeText={(text) => handleInputChange('name', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Number"
          value={form.number.toString()}
          onChangeText={(text) => handleInputChange('number', parseInt(text))}
          style={styles.input}
        />
        <Button title={editingStadium ? "Update Stadium" : "Add Stadium"} onPress={handleSubmit} />
      </View>

      <ScrollView contentContainerStyle={styles.stadiumList}>
        {stadiums && stadiums.map((stadium: any) => (
          <View key={stadium.id} style={styles.card}>
            <Image source={{ uri: `${BASE_URL}/attachments/${stadium.isMainAttachmentId}` }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.titleCard}>
                {stadium.name}
              </Text>
              <Text style={styles.description}>{stadium.description}</Text>
              <Button title="Edit" onPress={() => handleEdit(stadium)} />
            </View>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
};

export default Stadium;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    padding: 10,
    width: '100%',
  },
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
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC',
  },
});
