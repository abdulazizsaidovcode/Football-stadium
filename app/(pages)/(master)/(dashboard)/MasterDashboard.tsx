import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { order_day_master, statistics_for_year, user_me, user_update } from '@/helpers/api/api';

const MasterDashboard = () => {
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
    <View>
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
    </View>
  )
}

const styles = StyleSheet.create({
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
})

export default MasterDashboard