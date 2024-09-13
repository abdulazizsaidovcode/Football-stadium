import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Layout from '@/layout/layout'
import { colors } from '@/constants/Colors'
import Dashboard from '@/app/(pages)/(master)/(dashboard)/MasterDashboard'

const MasterDashboard = () => {
  return (
    // <Layout>
      <Dashboard/>
    // </Layout>
  )
}

export default MasterDashboard

const styles = StyleSheet.create({
    title: {
        color: colors.white,
        fontSize: 25
    }
})