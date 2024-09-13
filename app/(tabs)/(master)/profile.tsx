import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Layout from '@/layout/layout'
import { colors } from '@/constants/Colors'

const MasterProfile = () => {
  return (
    <Layout>
      <Text style={styles.title}>MasterProfile</Text>
    </Layout>
  )
}

export default MasterProfile;

const styles = StyleSheet.create({
    title: {
        color: colors.white,
        fontSize: 25
    }
})