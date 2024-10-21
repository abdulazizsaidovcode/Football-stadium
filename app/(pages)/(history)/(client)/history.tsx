import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { colors } from '@/constants/Colors';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { order_history } from '@/helpers/api/api';
import Layout from '@/layout/layout';
import { Loading } from '@/components/loading/loading';
import Buttons from '@/components/button/button';
import { useFocusEffect } from '@react-navigation/native';
import { getSize } from '@/constants/sizes';
interface OrderHistory {
  id: string;
  date: string;
  orderNumber: string;
  startTime: string;
  endTime: string;
  orderStatus: string;
}
const ClientHistory = () => {
  const [historyData, setHistoryData] = useState<OrderHistory[]>([]);
  const [size, setSize] = useState(10)
  const [totalElements, setTotalElements] = useState(10)
  const GetHistory = useGlobalRequest(`${order_history}?page=0&size=${size}`, "GET");

  useFocusEffect(
    useCallback(() => {
      GetHistory.globalDataFunc()
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (GetHistory.response) {
        setHistoryData(GetHistory.response.object)
        setTotalElements(GetHistory.response.totalElements)
      }
    }, [GetHistory.response])
  );

  // console.log(totalElements);

  return (
    <Layout scroll style={styles.container}>
      <NavigationMenu name="Buyurtmalar tarixi" />
      {GetHistory.loading ? (
        <Loading />
      ) : historyData.length > 0 ? (
        <>
          {historyData.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <Text style={styles.orderDate}>Sana: {item.date}</Text>
              <Text style={styles.orderTime}>Vaqt: {item.startTime} - {item.endTime}</Text>
              <Text style={styles.orderStatus}>Status: {item.orderStatus}</Text>
            </View>
          ))}
        </>
      ) : (
        <Text style={styles.noDataText}>Заказы не найдены</Text>
      )}
      {historyData && size < totalElements && < Buttons
        title='Yandan koproq'
        onPress={() => {
          setSize((prevSize) => prevSize + 10);
          GetHistory.globalDataFunc()
        }}
      />}
    </Layout>
  );
};

export default ClientHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 3,
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
    fontSize: getSize('smallText'),
    color: "white",
    marginBottom: 4,
  },
  orderTime: {
    color: "white",
    fontSize: getSize('smallText'),
    marginBottom: 4,
  },
  orderDate: {
    fontWeight: 'bold',
    fontSize: getSize('smallText'),
    color: "white",
    marginBottom: 8,
  },
  orderStatus: {
    fontSize: getSize('smallText'),
    fontWeight: 'bold',
    color: "white",
  },
  noDataText: {
    textAlign: 'center',
    fontSize: getSize('smallText'),
    color: 'white',
    marginTop: 20,
  },
});
