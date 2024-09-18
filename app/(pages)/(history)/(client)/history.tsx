import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/Colors'
import NavigationMenu from '@/components/navigation/NavigationMenu'
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response'
import { order_history } from '@/helpers/api/api'
import Layout from '@/layout/layout'

const ClientHistory = () => {
  const GetHistory = useGlobalRequest(order_history, "GET")
  useEffect(() => {
    GetHistory.globalDataFunc()
  }, [])

  return (
    <Layout scroll style={styles.container}>
      <NavigationMenu name='History' />
      {GetHistory.response && GetHistory.response.map((item: { orderNumber: number, id: number | string, startTime: string, endTime: string, date: string, orderStatus: string }) => (
        <View key={item.id} style={styles.itemContainer}>
          <Text style={styles.orderNumber}>Order Number: {item.orderNumber}</Text>
          <Text style={styles.orderTime}>Time: {item.startTime} - {item.endTime}</Text>
          <Text style={styles.orderDate}>Date: {item.date}</Text>
          <Text style={styles.orderStatus}>Status: {item.orderStatus}</Text>
        </View>
      ))}
    </Layout>
  )
}

export default ClientHistory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGreen,
    // color: "white",
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingTop: 16,
  },
  itemContainer: {
    backgroundColor: '#698474',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "white",
    marginBottom: 8,
  },
  orderTime: {
    color: "white",
    fontSize: 14,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: "white",
    marginBottom: 4,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "white",
  },
});