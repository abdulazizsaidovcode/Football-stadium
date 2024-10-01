import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { colors } from "@/constants/Colors";
import { useGlobalRequest } from "@/helpers/global_functions/global-response/global-response";
import {
  delete_notification,
  get_notification,
  isread_notification,
} from "@/helpers/api/api";
import Layout from "@/layout/layout";
import { Loading } from "@/components/loading/loading";
import Buttons from "@/components/button/button";
import { useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const Notification = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [notificationIds, setNotificationIds] = useState<string[]>([]);
  const [isRead, setIsRead] = useState<boolean>(true);
  const GetNotification = useGlobalRequest(get_notification, "GET");
  const DeleteNotification = useGlobalRequest(delete_notification, "PUT", { ids: notificationIds });
  const IsReadNotification = useGlobalRequest(isread_notification, "PUT", { ids: notificationIds });

  // Focusing the component to refresh notifications
  useFocusEffect(
    useCallback(() => {
      GetNotification.globalDataFunc();
    }, [])
  );

  useEffect(() => {
    if (isRead) {
      IsReadNotification.globalDataFunc()
    } else {
      DeleteNotification.globalDataFunc()
    }
    GetNotification.globalDataFunc()
  }, [notificationIds])

  // Check icon press handler
  const handleCheckPress = () => {
    setIsRead(true)
    const unreadIds = GetNotification.response
      ?.filter((item: { read: string | number | null }) => !item.read)
      .map((item: { uuid: string | number | null }) => item.uuid) || [];
    setNotificationIds(unreadIds);
    console.log("Unread notification IDs:", unreadIds);
  };

  // Delete icon press handler
  const handleDeletePress = () => {
    setIsRead(false)
    const allIds = GetNotification.response?.map((item: { uuid: string | number | null }) => item.uuid) || [];
    setNotificationIds(allIds);
    console.log("All notification IDs:", allIds);
  };

  return (
    <Layout scroll style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 16,
        }}
      >
        <Text style={{ fontSize: 27, color: "#fff", fontWeight: "700" }}>
          Bildirishnomalar
        </Text>
        <View style={{ display: "flex", gap: 10, flexDirection: "row" }}>
          <MaterialIcons
            name="check"
            onPress={handleCheckPress}
            size={30}
            color="white"
          />
          <MaterialIcons
            name="delete"
            onPress={handleDeletePress}
            size={30}
            color="white"
          />
        </View>
      </View>
      {GetNotification.loading ? (
        <View
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Loading />
        </View>
      ) : GetNotification.response ? (
        <>
          {GetNotification.response.map((item: { time: string , text: string, id: string, read: string }) => (
            <View
              key={item.id}
              style={[
                styles.itemContainer,
                !item?.read && { borderColor: "#74db9e", borderWidth: 3 },
              ]}
            >
              <Text style={styles.orderDate}>{item?.text}</Text>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text style={styles.orderNumber}>
                  Date: {item.time && item?.time.slice(0, 10)}
                </Text>
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
    backgroundColor: "#698474",
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
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    marginBottom: 8,
  },
  orderStatus: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    marginTop: 20,
  },
});
