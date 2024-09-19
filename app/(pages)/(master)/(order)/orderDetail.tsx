import React, { useCallback, useEffect } from "react";
import {
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import { colors } from "@/constants/Colors";
import { file_get, order_detail, stadium_get_one } from "@/helpers/api/api";
import { useGlobalRequest } from "@/helpers/global_functions/global-response/global-response";
import OrderStore from "@/helpers/stores/order/orderStore";
import { useFocusEffect } from "expo-router";

const { width: viewportWidth } = Dimensions.get("window");

function OrderDetail() {
  const { OrderData } = OrderStore();

  // Fetch order data from server by id and render it
  const orderDetail = useGlobalRequest(order_detail + OrderData?.id, "GET");
  const stadiumDetail = useGlobalRequest(`${stadium_get_one}/${orderDetail?.response?.stadiumId}`, "GET");

  useFocusEffect(
    useCallback(() => {
      orderDetail.globalDataFunc();
    }, [])
  );

  useEffect(() => {
    if (orderDetail?.response?.stadiumId) {
      stadiumDetail.globalDataFunc();
    }
  }, [orderDetail?.response?.stadiumId]);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View>
        <Image
          style={styles.imageStyle}
          source={
            item
              ? { uri: file_get + item }
              : require('../../../../assets/images/defaultImg.jpeg')
          }
        />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          <NavigationMenu name={"Detail"} />
        </View>
        <ScrollView style={{ paddingHorizontal: 16 }}>
          <View style={styles.detailContainer}>
            {stadiumDetail?.response?.attechmentIds?.length > 0 && (
              <Carousel
                loop
                width={viewportWidth}
                height={200}
                autoPlay={true}
                autoPlayInterval={3000} // 3 sekundda avtomatik almashinadi
                data={stadiumDetail?.response?.attechmentIds}
                renderItem={({ item }: {item: any}) => renderItem({ item })}
                scrollAnimationDuration={1000} // Animatsiya tezligi
                pagingEnabled={true}
                mode="parallax"
                modeConfig={{
                  parallaxScrollingScale: 0.9,
                  parallaxScrollingOffset: 50,
                  parallaxAdjacentItemScale: 0.75,
                }}
              />
            )}
            <View style={{ display: "flex", gap: 20, paddingVertical: 20 }}>
              {/* Detail fields */}
              <View style={styles.detailTitle}>
                <Text style={styles.title}>Name: </Text>
                <Text style={styles.titleDesc}>
                  {orderDetail?.response?.firstName || "-"}
                </Text>
              </View>
              <View style={styles.detailTitle}>
                <Text style={styles.title}>Last name: </Text>
                <Text style={styles.titleDesc}>
                  {orderDetail?.response?.lastName || "-"}
                </Text>
              </View>
              <View style={styles.detailTitle}>
                <Text style={styles.title}>Stadium name: </Text>
                <Text style={styles.titleDesc}>
                  {orderDetail?.response?.stadiumName || "-"}
                </Text>
              </View>
              <View style={styles.detailTitle}>
                <Text style={styles.title}>Amount paid: </Text>
                <Text style={styles.titleDesc}>
                  {orderDetail?.response?.paySum || "-"}
                </Text>
              </View>
              <View style={styles.detailTitle}>
                <Text style={styles.title}>Date: </Text>
                <Text style={styles.titleDesc}>
                  {orderDetail?.response?.date || "-"}
                </Text>
              </View>
              <View style={styles.detailTitle}>
                <Text style={styles.title}>Start time: </Text>
                <Text style={styles.titleDesc}>
                  {orderDetail?.response?.startTime || "-"}
                </Text>
              </View>
              <View style={styles.detailTitle}>
                <Text style={styles.title}>End time: </Text>
                <Text style={styles.titleDesc}>
                  {orderDetail?.response?.endTime || "-"}
                </Text>
              </View>
              <View style={styles.detailTitle}>
                <Text style={styles.title}>Status: </Text>
                <Text
                  style={[
                    styles.titleDesc,
                    {
                      color:
                        orderDetail?.response?.orderStatus === "CANCELED"
                          ? "red"
                          : "#fff",
                    },
                  ]}
                >
                  {orderDetail?.response?.orderStatus || "-"}
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
  imageStyle: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
});
