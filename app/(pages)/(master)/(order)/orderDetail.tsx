import NavigationMenu from "@/components/navigation/NavigationMenu";
import { colors } from "@/constants/Colors";
import { file_get, order_detail } from "@/helpers/api/api";
import { useGlobalRequest } from "@/helpers/global_functions/global-response/global-response";
import OrderStore from "@/helpers/stores/order/orderStore";
import Layout from "@/layout/layout";
import React, { useEffect } from "react";
import {
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface DetailData {
  date: string | null;
  firstName: string | null;
  lastName: string | null;
  startTime: string | null;
  endTime: string | null;
  stadiumId: string | null;
  paySum: number | null;
  cardNumber: string | number | null;
  orderStatus: string | null;
  orderId: string | null;
  stadiumName: string | null;
  attachmentList: any;
}

function OrderDetail() {
  const { OrderData } = OrderStore();
  // fetch order data from server by id and render it
  const orderDetail = useGlobalRequest<DetailData>(
    order_detail + OrderData?.id,
    "GET"
  );

  useEffect(() => {
    orderDetail.globalDataFunc();
  }, []);

  console.log("detail", orderDetail.response);
  console.log("detailError", orderDetail.error);
  console.log("orderDate", OrderData?.id);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={{paddingHorizontal: 16, paddingVertical: 16}}>
          <NavigationMenu name={"Detail"} />
        </View>
        <ScrollView style={{ paddingHorizontal: 16 }}>
          <View style={styles.detailContainer}>
            <Image
              height={200}
              style={{ objectFit: "cover", borderRadius: 10, width: "100%" }}
              source={
                orderDetail?.response?.attachmentList
                  ? file_get + orderDetail?.response.attachmentList[0]
                  : require("../../../../assets/images/defaultImg.jpeg")
              }
            />
            <View style={{ display: "flex", gap: 20, paddingVertical: 20 }}>
              <View style={styles.detailTitle}>
                <Text style={styles.title}>Name: </Text>
                <Text style={styles.titleDesc}>
                  {orderDetail?.response?.firstName
                    ? orderDetail?.response?.firstName
                    : "-"}
                </Text>
              </View>
              <View style={styles.detailTitle}>
                <Text style={styles.title}>Last name: </Text>
                <Text style={styles.titleDesc}>
                  {orderDetail?.response?.lastName
                    ? orderDetail?.response?.lastName
                    : "-"}
                </Text>
              </View>
              <View style={styles.detailTitle}>
                <Text style={styles.title}>Stadium name: </Text>
                <Text style={styles.titleDesc}>
                  {orderDetail?.response?.stadiumName
                    ? orderDetail?.response?.stadiumName
                    : "-"}
                </Text>
              </View>
              <View style={styles.detailTitle}>
                <Text style={styles.title}>Amount paid: </Text>
                <Text style={styles.titleDesc}>
                  {orderDetail?.response?.paySum
                    ? orderDetail?.response?.paySum
                    : "-"}
                </Text>
              </View>
              <View style={styles.detailTitle}>
                <Text style={styles.title}>Date: </Text>
                <Text style={styles.titleDesc}>
                  {orderDetail?.response?.date
                    ? orderDetail?.response?.date
                    : "-"}
                </Text>
              </View>
              <View style={styles.detailTitle}>
                <Text style={styles.title}>Start time: </Text>
                <Text style={styles.titleDesc}>
                  {orderDetail?.response?.startTime
                    ? orderDetail?.response?.startTime
                    : "-"}
                </Text>
              </View>
              <View style={styles.detailTitle}>
                <Text style={styles.title}>End time: </Text>
                <Text style={styles.titleDesc}>
                  {orderDetail?.response?.endTime
                    ? orderDetail?.response?.endTime
                    : "-"}
                </Text>
              </View>
              <View style={styles.detailTitle}>
                <Text style={styles.title}>Status: </Text>
                <Text style={[styles.titleDesc, {color: orderDetail?.response?.orderStatus === "CANCELED" ? "red" : "#fff"}]}>
                  {orderDetail?.response?.orderStatus
                    ? orderDetail?.response?.orderStatus
                    : "-"}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGreen,
  },
  detailContainer: {
    width: "100%",
    backgroundColor: "#698474",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
  },
  detailTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 20,
    color: "white",
  },
  titleDesc: {
    fontSize: 18,
    color: "white",
  },
});
