import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Layout from '@/layout/layout'
import { colors } from '@/constants/Colors'
import MasterDashboard from '@/app/(pages)/(master)/(dashboard)/MasterDashboard'

const MasterDashboardScreen = () => {
  return (
    // <Layout>
    <MasterDashboard />
    // </Layout>
  )
}

export default MasterDashboardScreen

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: 25
  }
})