import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Layout from '@/layout/layout'
import { colors } from '@/constants/Colors'

const MasterDashboard = () => {
  return (
    <Layout>
      <Text style={styles.title}>MasterDashboard</Text>
    </Layout>
  )
}

export default MasterDashboard

const styles = StyleSheet.create({
    title: {
        color: colors.white,
        fontSize: 25
    }
})