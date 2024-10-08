import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Image, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Layout from '@/layout/layout';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { statistics_for_year, user_me, user_update } from '@/helpers/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '@/components/input/input';
import CenteredModal from '@/components/modal/sentralmodal';
import { LineChart } from 'react-native-chart-kit';
import { colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import { RootStackParamList } from '@/types/root/root';
import { NavigationProp } from '@react-navigation/native';
import { getSize } from '@/constants/sizes';

type UserResponse = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "(pages)/(client)/(dashboard)/dashboard"
>;

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')
const isTablet = screenWidth > 768;

const MasterDashboardScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const userMee = useGlobalRequest(user_me, 'GET');
  const [year, setYear] = useState<number>(2024);
  const getStatistics = useGlobalRequest(`${statistics_for_year}?year=${year}`, 'GET', {}, 'DEFAULT');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserResponse>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const userEdit = useGlobalRequest(user_update, 'PUT', formData);

  useEffect(() => {
    userMee.globalDataFunc();
    getStatistics.globalDataFunc();
  }, []);

  useEffect(() => {
    if (userMee.response) {
      setFormData({
        firstName: userMee.response.firstName || '',
        lastName: userMee.response.lastName || '',
        phoneNumber: userMee.response.phoneNumber || '',
      });
    }
  }, [userMee.response]);

  useEffect(() => {
    const updateToken = async () => {
      if (userEdit.response) {
        await AsyncStorage.setItem('token', userEdit.response);
      }
    };
    updateToken();
  }, [userEdit.response]);

  const handleEditPress = () => {
    setIsModalVisible(true);
  };

  const handleLogoutPress = () => {
    setIsLogoutModalVisible(true);
  };

  const handleSave = async () => {
    try {
      userEdit.globalDataFunc();
      setIsModalVisible(false);
      userMee.globalDataFunc();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');
    setIsLogoutModalVisible(false);
    navigation.navigate('(pages)/(client)/(dashboard)/dashboard');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout scroll>
        <Image source={require('@/assets/images/Real.jpg')} style={styles.Image} />
        <Text style={styles.ImageBox}></Text>
        <View style={styles.header}>
          <View style={styles.profile}>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>
                {userMee.response?.lastName || "Guest"} {userMee.response?.firstName || ""}
              </Text>
              <Text style={styles.phone}>{userMee.response?.phoneNumber || "+998XXXXXXXXX"}</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
              <AntDesign name="edit" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={handleLogoutPress}>
              <FontAwesome name="sign-out" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={{ marginTop: isTablet ? 100 : 50, width: 100 }}>
            <Input
              labalVisible
              label='Year'
              placeholder='Enter count'
              type='numeric'
              value={year.toString()}
              onChangeText={(text) => setYear(Number(text))}
            />
          </Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {
              getStatistics.response && getStatistics.response.length > 0 ? (
                <LineChart
                  data={{
                    labels: getStatistics.response.map((item: { month: number }) => item.month || "0"),
                    datasets: [{
                      data: getStatistics.response.map((item: { totalPrice: number }) => item.totalPrice || 0),
                    }]
                  }}
                  width={Dimensions.get('window').width / 1.05}
                  height={220}
                  yAxisLabel={'$'}
                  chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: colors.inDarkGreen,
                    backgroundGradientTo: colors.lightGreen,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  bezier
                  style={{
                    borderRadius: 16,
                  }}
                />
              ) : (
                <Text style={{ marginTop: 20, textAlign: 'center', color: "white" }}>Buyurtmalar mavjud emas</Text>
              )
            }
          </View>
        </View>
        <CenteredModal
          isModal={isModalVisible}
          isFullBtn
          btnRedText='Save'
          btnWhiteText='Cancel'
          toggleModal={() => setIsModalVisible(false)}
          onConfirm={handleSave}
        >
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor={'white'}
              value={formData.firstName}
              onChangeText={(text) => setFormData({ ...formData, firstName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor={'white'}
              value={formData.lastName}
              onChangeText={(text) => setFormData({ ...formData, lastName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor={'white'}
              value={formData.phoneNumber}
              onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
            />
          </View>
        </CenteredModal>
        <CenteredModal
          isModal={isLogoutModalVisible}
          isFullBtn
          btnRedText='Logout'
          btnWhiteText='Cancel'
          toggleModal={() => setIsLogoutModalVisible(false)}
          onConfirm={logOut}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons name="cancel" size={100} color={colors.lightGreen} />
            <Text style={{ fontSize: 17, color: '#fff', textAlign: "center" }}>
              Siz aniq tizimdan chiqmoqchimisz ?
            </Text>
          </View>
        </CenteredModal>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    marginBottom: 40,
    borderBottomColor: "#000",
    paddingHorizontal: getSize('defaultPadding')
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
    padding: 12
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
    height: isTablet ? 200 : 130,
    zIndex: -2,
  },
  ImageBox: {
    width: '120%',
    position: 'absolute',
    opacity: 0.8,
    backgroundColor: "black",
    top: 0,
    left: 0,
    height: isTablet ? 200 : 130,
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
  },
  name: {
    fontSize: getSize('mediumText'),
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

export default MasterDashboardScreen