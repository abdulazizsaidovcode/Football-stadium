import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Layout from '@/layout/layout';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { order_day_master, statistics_for_year, user_me, user_update } from '@/helpers/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '@/components/input/input';
import Stadion from '@/assets/images/Real.jpg';

export default function Dashboard() {
  const userMee = useGlobalRequest(user_me, 'GET');
  const OrdersDay = useGlobalRequest(order_day_master, 'GET');
  const [year, setYear] = useState(2024)
  const getStatistics = useGlobalRequest(`${statistics_for_year}year=${year}`, 'GET');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const userEdit = useGlobalRequest(user_update, 'PUT', formData);
  // console.log(userMee.response);
  useEffect(() => {
    userMee.globalDataFunc();
    getStatistics.globalDataFunc();
    OrdersDay.globalDataFunc();
    if (userMee.response) {
      setFormData({
        firstName: userMee.response.firstName || '',
        lastName: userMee.response.lastName || '',
        phoneNumber: userMee.response.phoneNumber || '',
      });
    }
  }, []);

  const handleEditPress = () => {
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    try {
      await userEdit.globalDataFunc();
      setIsModalVisible(false);
      userMee.globalDataFunc();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };


  return (
    <Layout scroll>
      <Image source={Stadion} style={styles.Image} />
      <Text style={styles.ImageBox}></Text>
      <View style={styles.header}>
        <View style={styles.profile}>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>
              {userMee.response?.lastName || "Network error"} {userMee.response?.firstName || "Network error"}
            </Text>
            <Text style={styles.phone}>{userMee.response?.phoneNumber || "Network error"}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <AntDesign name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 50, marginHorizontal: 20, width: 100 }}>
          <Input
            labalVisible
            label='Year'
            placeholder='Enter count'
            type='numeric'
            value={year.toString()}
            onChangeText={(text) => setYear(Number(text))}
          />
        </Text>
        <View style={styles.cardsContainer}>
          {
            getStatistics.response && getStatistics.response.length > 0 ? (
              getStatistics.response.map((item: { orderCount: string, date: string | number, totalPrice: string | number }) => (
                <TouchableOpacity style={styles.card} activeOpacity={1}>
                  <Text style={styles.cardText}>Zakazlar soni{item.orderCount || "0"}</Text>
                  <Text style={styles.cardDefText}>San'a: {item.date || '0'}</Text>
                  <Text style={styles.cardDefText}>Foyda: {item.totalPrice || "0"}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ marginTop: 20, textAlign: 'center', color: "white" }}>Zakaz qilinmagan</Text>
            )
          }

        </View>
      </View>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(text) => setFormData({ ...formData, firstName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(text) => setFormData({ ...formData, lastName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
            />
            <Text style={styles.Buttons}>
              <Button title="Save" color='green' onPress={handleSave} />
              <Button title="Cancel" color="red" onPress={() => setIsModalVisible(false)} />
            </Text>
          </View>
        </View>
      </Modal>
    </Layout>
  );
}


const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    marginBottom: 40,
    borderBottomColor: "#000",
  },
  Buttons: {
    display: "flex",
  },
  card: {
    backgroundColor: '#698474',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    overflow: 'hidden',
  },
  OrderText: {
    fontSize: 15,
    color: 'white',
    marginBottom: 5,
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
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
    paddingHorizontal: 20,
  },
  order: {
    backgroundColor: '#698474',
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 15, // paddingni o'zgartirdim
    marginBottom: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // shadow qo'shdim
  },
  orderTitle: {
    fontSize: 20, // o'lchamni kichraytirdim
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center', // matnni markazlashtirdim
  },
  cardDefText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center', // matnni markazlashtirdim
  },
  profile: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 14,
    color: '#fff',
  },
  editButton: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#698474',
    color: '#fff',
    borderRadius: 10,
  },
  input: {
    borderBottomWidth: 1,
    color: '#fff',
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
