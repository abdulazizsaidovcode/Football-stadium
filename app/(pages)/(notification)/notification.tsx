import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/Colors';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { delete_notification, get_notification, isread_notification, order_history } from '@/helpers/api/api';
import Layout from '@/layout/layout';
import { Loading } from '@/components/loading/loading';
import Buttons from '@/components/button/button';
import { useFocusEffect } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const Notification = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [notificationIds, setNotificationIds] = useState([])
  const [hasMore, setHasMore] = useState<boolean>(true);  // Control load more
  const GetNotification = useGlobalRequest(get_notification, "GET");
  const DeleteNotification = useGlobalRequest(delete_notification, "PUT");
  const IsReadNotification = useGlobalRequest(isread_notification, "PUT");

    useFocusEffect(
        useCallback(() => {
            GetNotification.globalDataFunc()
        }, [])
    )
 
  return (
    <Layout scroll style={styles.container}>
      <NavigationMenu name="Notifications" />
      {GetNotification.loading ? 
      <View style={{flex: 1, height: "100%", display: "flex", alignItems: "center"}}>
        <Loading />
      </View>
       :
      GetNotification.response ? (
        <>
          {GetNotification.response.map((item: any) => (
            <View key={item.id} style={styles.itemContainer}>
              <Text style={styles.orderDate }>{item?.text}</Text>
              <View style={{display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
              <Text style={styles.orderNumber}>Date: {item?.time.slice(0, 10)}</Text>
              <View style={{display: "flex", gap: 10, flexDirection: "row"}}>
              <MaterialIcons name="check" onPress={() => {}} size={20} color="white" />
              <MaterialIcons name="delete" onPress={() => {}} size={20} color="white" />
              </View>         
              </View>
            </View>
          ))}
        </>
      ) : (
        <Text style={styles.noDataText}>Уведомление не найдено</Text>
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
    fontSize: 17,
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
