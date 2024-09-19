import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/Colors';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { delete_notification, get_notification, isread_notification, order_history } from '@/helpers/api/api';
import Layout from '@/layout/layout';
import { Loading } from '@/components/loading/loading';
import Buttons from '@/components/button/button';

const Notification = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [notificationIds, setNotificationIds] = useState([])
  const [hasMore, setHasMore] = useState<boolean>(true);  // Control load more
  const GetNotification = useGlobalRequest(get_notification, "GET");
  const DeleteNotification = useGlobalRequest(delete_notification, "PUT");
  const IsReadNotification = useGlobalRequest(isread_notification, "PUT");



  return (
    <Layout scroll style={styles.container}>
      <NavigationMenu name="История заказов" />
      {GetNotification.response.length > 0 ? (
        <>
          {GetNotification.response.map((item: any) => (
            <View key={item.id} style={styles.itemContainer}>
              <Text style={styles.orderDate}>Date: {item.date}</Text>
              <Text style={styles.orderNumber}>Order Number: {item.orderNumber}</Text>
              <Text style={styles.orderTime}>Time: {item.startTime} - {item.endTime}</Text>
              <Text style={styles.orderStatus}>Status: {item.orderStatus}</Text>
            </View>
          ))}
        </>
      ) : (
        <Text style={styles.noDataText}>Заказы не найдены</Text>
      )}
    </Layout>
  );
};

export default Notification;

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
