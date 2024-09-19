import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/Colors';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { order_history } from '@/helpers/api/api';
import Layout from '@/layout/layout';
import { Loading } from '@/components/loading/loading';
import Buttons from '@/components/button/button';

const ClientHistory = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);  // Page state for pagination
  const [historyData, setHistoryData] = useState<any[]>([]);  // Store all data
  const [hasMore, setHasMore] = useState<boolean>(true);  // Control load more
  const GetHistory = useGlobalRequest(order_history, "GET");

  const fetchData = async (page: number) => {
    setLoading(true);
    const response = await GetHistory.globalDataFunc({ page });  // Send page in request
    if (response && response.length > 0) {
      setHistoryData((prevData) => [...prevData, ...response]);  // Append new data
      if (response.length < 10) setHasMore(false);  // Assuming 10 items per page
    } else {
      setHasMore(false);  // No more data to load
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);  // Fetch initial data on mount
  }, [page]);

  const loadMoreData = () => {
    if (hasMore) setPage((prevPage) => prevPage + 1);  // Load next page
  };

  return (
    <Layout scroll style={styles.container}>
      <NavigationMenu name="History" />
      {loading && page === 1 ? (  // Show loading only on initial fetch
        <Loading />
      ) : historyData.length > 0 ? (
        <>
          {historyData.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <Text style={styles.orderDate}>Date: {item.date}</Text>
              <Text style={styles.orderNumber}>Order Number: {item.orderNumber}</Text>
              <Text style={styles.orderTime}>Time: {item.startTime} - {item.endTime}</Text>
              <Text style={styles.orderStatus}>Status: {item.orderStatus}</Text>
            </View>
          ))}
          {hasMore && (
            <Buttons title="Показать больше" onPress={loadMoreData} />
          )}
        </>
      ) : (
        <Text style={styles.noDataText}>Заказы не найдены</Text>
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
    fontSize: 14,
    color: "white",
    marginBottom: 4,
  },
  orderTime: {
    color: "white",
    fontSize: 14,
    marginBottom: 4,
  },
  orderDate: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "white",
    marginBottom: 8,
  },
  orderStatus: {
    fontSize: 16,
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
