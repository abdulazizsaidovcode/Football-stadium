import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Layout from '@/layout/layout'
import Dashboard from './(dashboard)'

const Master = () => {
  return (
    <Layout>
      <Text style={styles.Text}>Master</Text>
      <Dashboard/>
    </Layout>
  )
}
const styles = StyleSheet.create({
  Text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    // backgroundColor: '#007bff'
  }
})
export default Master