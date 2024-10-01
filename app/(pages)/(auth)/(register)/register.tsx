import { colors } from '@/constants/Colors'
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';
import Buttons from '@/components/button/button';
import { useAuthStore } from '@/helpers/stores/auth/auth-store';
import { FontAwesome } from '@expo/vector-icons';

type SettingsScreenNavigationProp = NavigationProp<any, '(pages)/(auth)/(register)/getInfo'>;

const MasterorClient: React.FC = () => {
  const { setRole } = useAuthStore()
  const navigation = useNavigation<SettingsScreenNavigationProp>();


  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.logo}>
        <FontAwesome name="soccer-ball-o" size={50} color="black" />
      </View>
      <Text style={styles.title}>Bookers Beauty</Text>
      <Text style={styles.selectLanguage}>{'qaysi role uchun royhatdan otmoqchisiz'}</Text>
      <View style={styles.button}>
        <Buttons title={'Master'} onPress={() => {
          setRole("MASTER")
          navigation.navigate('(pages)/(auth)/(register)/getInfo')
        }} />
        <Buttons title={'Client'} onPress={() => {
          setRole("CLIENT")
          navigation.navigate('(pages)/(auth)/(register)/getInfo')
        }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 10,
  },
  welcome: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 5,
  },
  selectLanguage: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 20,
  },
  button: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 15,

  }
});

export default MasterorClient;
