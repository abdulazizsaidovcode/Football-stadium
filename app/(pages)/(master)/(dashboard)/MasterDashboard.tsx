import Buttons from '@/components/button/button';
import { Colors } from '@/constants/Colors';
import { user_me } from '@/helpers/api/api';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import Layout from '@/layout/layout';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
// import AntDesign from '@expo/vector-icons/AntDesign';

export default function Dashboard() {
  const userMee = useGlobalRequest(user_me, 'GET');
  useEffect(() => { 
    userMee.globalDataFunc();
  }, [])
  console.log(userMee.response);

  return (
    <Layout padding scroll>
      <View style={styles.header}>
        <View style={styles.profile}>
          <Image source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Гузаль Шерматова</Text>
            <Text style={styles.phone}>+998 93 123-45-67</Text>
          </View>
        </View>
      </View>

      <View style={styles.schedule}>
        <Text style={styles.sectionTitle}>все заказы сегодня</Text>
        <Text style={styles.sectionSubtitle}>еще не доступен</Text>
        <View style={styles.scheduleButtons}>
          <TouchableOpacity style={styles.scheduleButton}>
            <Buttons title='Break Up' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.scheduleButton}>
            <Buttons title='edit' />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.clientsSection}>
        <Text style={styles.clientsTitle}>Мои клиенты</Text>
        <Text style={styles.clientsCount}>0</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Выполненные записи</Text>
            <Text style={styles.statValue}>0/0</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Доход на сегодня (сум)</Text>
            <Text style={styles.statValue}>0</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Запросы на бронирования</Text>
            <Text style={styles.statValue}>0</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>В зале ожидания</Text>
            <Text style={styles.statValue}>0</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Отменённые записи</Text>
            <Text style={styles.statValue}>0</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Мой доход</Text>
            <Text style={styles.statValue}>0</Text>
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  padding: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  header: {
    marginTop: 0,
    marginBottom: 20,
    borderBottomColor: "#000",
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
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
  role: {
    fontSize: 14,
    color: '#fff',
  },
  settingsButton: {
    // backgroundColor: '#F94D5A',
    paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  settingsText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  schedule: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionSubtitle: {
    color: '#A9A9A9',
    marginBottom: 20,
  },
  scheduleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleButton: {
    flex: 1,
    // backgroundColor: '#2A2839',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  scheduleButtonText: {
    color: '#fff',
  },
  clientsSection: {
    marginTop: 30,
  },
  clientsTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  clientsCount: {
    fontSize: 36,
    color: '#C4DAD2',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statBox: {
    backgroundColor: '#698474',
    width: '48%',
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 10,
    marginBottom: 20,
  },
  statTitle: {
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    color: '#C4DAD2',
    fontWeight: 'bold',
    marginTop: 10,
  },
  businessCardButton: {
    backgroundColor: '#F94D5A',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  businessCardText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
