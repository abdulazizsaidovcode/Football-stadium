import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Layout from '@/layout/layout'
import { colors } from '@/constants/Colors'

const MasterStadium = () => {
  return (
    <Layout>
      <Text style={styles.title}>MasterStadium</Text>
    </Layout>
  )
}

export default MasterStadium;

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: 25
  }
})