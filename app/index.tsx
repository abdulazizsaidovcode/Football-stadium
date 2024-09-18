import React, { useEffect, useState } from 'react'
import Welcome from '@/components/welcome/welcome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ClientTabLayout from './(tabs)/(client)/_layout'
import MasterTabLayout from './(tabs)/(master)/_layout'

const Index = () => {
  const [role, setRole] = useState<string | null>('')
  const [token, setToken] = useState<string | null>('')
  useEffect(() => {
    const getToken = async () => {
      // await AsyncStorage.removeItem('role');
      // await AsyncStorage.removeItem('token');  
      const role = await AsyncStorage.getItem('role');
      const token = await AsyncStorage.getItem('token');
      setRole(role);
      setToken(token);
    }

    getToken()
  }, []);

  return token && role ? role === 'CLIENT' ? <ClientTabLayout /> : <MasterTabLayout /> : <Welcome />
}

export default Index;