import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/Colors';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { order_history } from '@/helpers/api/api';
import Layout from '@/layout/layout';
import { Loading } from '@/components/loading/loading';

const ClientHistory = () => {
  const [loading, setLoading] = useState<boolean>(true); // Set loading to true initially
  const GetHistory = useGlobalRequest(order_history, "GET");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await GetHistory.globalDataFunc();
      setLoading(false); // Set loading to false after fetching data
    };

    fetchData();
  }, []);

  return (
    <Layout scroll style={styles.container}>
      <NavigationMenu name='History' />
      {loading ? (
        <Loading />
      ) : GetHistory.response && GetHistory.response.length > 0 ? (
        GetHistory.response.map((item: { orderNumber: number, id: number | string, startTime: string, endTime: string, date: string, orderStatus: string }) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.orderNumber}>Order Number: {item.orderNumber}</Text>
            <Text style={styles.orderTime}>Time: {item.startTime} - {item.endTime}</Text>
            <Text style={styles.orderDate}>Date: {item.date}</Text>
            <Text style={styles.orderStatus}>Status: {item.orderStatus}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No data found</Text> // Message when no data is found
      )}
    </Layout>
  );
};

export default ClientHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGreen,
    paddingHorizontal: 16,
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
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    marginTop: 20,
  },
});
