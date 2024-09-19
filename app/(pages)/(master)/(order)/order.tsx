import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Layout from "@/layout/layout";
import { useGlobalRequest } from "@/helpers/global_functions/global-response/global-response";
import {
  order_day_master,
  order_reject,
  stadium_get_master,
  user_me,
} from "@/helpers/api/api";
import Buttons from "@/components/button/button";
import { colors } from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "expo-router";
import { RootStackParamList } from "@/types/root/root";
import { NavigationProp } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import CenteredModal from "@/components/modal/sentralmodal";
import { StadiumTypes } from "@/types/stadium/stadium";
import OrderCard from "@/components/cards/orderCard";
import OrderStore from "@/helpers/stores/order/orderStore";

type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "(pages)/(master)/(order)/order"
>;
export default function MasterOrder() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const {OrderData, setOrderData} = OrderStore()

  const userMee = useGlobalRequest(user_me, "GET");
  const orderReject = useGlobalRequest(
    order_reject + OrderData?.id,
    "PUT",
    {}
  );
  const OrdersDay = useGlobalRequest(order_day_master, "GET");
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const stadiums = useGlobalRequest<StadiumTypes>(stadium_get_master, "GET");

  const openModal = () => setIsModalVisible(!isModalVisible);
  const openRejectModal = () => setIsRejectModalVisible(!isRejectModalVisible);

  const navigateToOrder = () => {
    if (selectedValue) {
      navigation.navigate("(pages)/(order)/(order-save)/order-save", {
        id: selectedValue,
      });
    } else {
      alert("Bron qilinga stadiumni tanlang!");
      //   console.log(selectedValue, 87);
    }
    openModal();
  };

  useFocusEffect(
    useCallback(() => {
      OrdersDay.globalDataFunc();
      stadiums.globalDataFunc();
    }, [])
  );

  console.log("orderData", OrderData);


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.darkGreen,
        paddingHorizontal: 16,
      }}
    >
      <Layout scroll>
        <View style={styles.Container}>
          <Text style={styles.title}>Bugungi qilingan bronlaringiz</Text>

          {OrdersDay.response && OrdersDay.response.length > 0 ? (
            OrdersDay.response.map((item: any) => (
              <OrderCard
                boxOnPress={async () => {
                   await setOrderData(item)
                   await navigation.navigate('(pages)/(master)/(order)/orderDetail')
                }}
                data={item}
                onPress={() => {
                  openRejectModal();
                  setOrderData(item);
                }}
              />
            ))
          ) : (
            <Text
              style={{ marginTop: 20, textAlign: "center", color: "white" }}
            >
              Order Mavjud emas
            </Text>
          )}
        </View>
      </Layout>
      <Buttons
        onPress={() => {
          // userMee.globalDataFunc();
          if (stadiums.response && stadiums.response.length == 0) {
            alert("avval ozingizga staduin qoshishingiz kerak");
          }
          if (stadiums.response && stadiums.response.length == 1) {
            // console.log(stadiums.response, "ooooo");
            // console.log(stadiums.response[0].id, "ooooo");
            navigation.navigate("(pages)/(order)/(order-save)/order-save", {
              id: stadiums.response[0].id,
            });
          }
          if (stadiums.response && stadiums.response.length > 1) {
            openModal();
          }
        }}
        title="Bron qo'shish"
        icon={<Entypo name="plus" size={24} color="white" />}
      />
      <View style={{ marginBottom: 10 }}></View>

      <CenteredModal
        isModal={isModalVisible}
        toggleModal={openModal}
        btnWhiteText="Close"
        btnRedText="Confirm"
        isFullBtn={true}
        onConfirm={navigateToOrder}
      >
        <View style={styles.modalContent}>
          <Text style={{ color: "#fff", fontSize: 20, marginBottom: 10 }}>
            Stadionni tanlang
          </Text>
          <Picker
            selectedValue={selectedValue}
            style={styles.picker}
            mode="dropdown"
            prompt="Stadionni tanlang"
            itemStyle={{
              color: "#fff",
              zIndex: 100,
              backgroundColor: colors.green,
              width: "100%",
              height: "100%",
              justifyContent: "flex-start",
            }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            {stadiums.response &&
              stadiums.response.map((res: any, index: any) => (
                <Picker.Item
                  label={`${index + 1}: ${res.name}`}
                  value={res.id}
                />
              ))}
          </Picker>
          <Text style={{ color: "#fff", fontSize: 16 }}>
            Tanlangan stadion:
            {stadiums.response &&
              stadiums.response.find((item: any) => item.id == selectedValue)
                ?.name}
          </Text>
        </View>
      </CenteredModal>
      <CenteredModal
        isModal={isRejectModalVisible}
        toggleModal={openRejectModal}
        btnWhiteText="Close"
        btnRedText="Reject"
        isFullBtn={true}
        onConfirm={async () => {
          if (OrderData && OrderData?.id) {
            await orderReject.globalDataFunc();
            if (orderReject.response) {
              openRejectModal();
              OrdersDay.globalDataFunc()
              alert("Order bekor qilindi!")
            }
            await setOrderData(null);
          } else {
            await setOrderData(null);
          }
        }}
      >
        <Text style={[styles.OrderText, { paddingVertical: 10 }]}>
          Orderni rad etmoqchimisiz{" "}
        </Text>
      </CenteredModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    marginTop: 30,
    marginBottom: 40,
    borderBottomColor: "#000",
    paddingHorizontal: 10,
  },
  Buttons: {
    display: "flex",
  },
  title: {
    fontSize: 22,
    color: "white",
    marginBottom: 10,
  },
  OrderText: {
    fontSize: 15,
    color: "white",
    marginBottom: 5,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
    paddingHorizontal: 20,
  },
  order: {
    backgroundColor: "#698474",
    borderRadius: 10,
    padding: 15, // paddingni o'zgartirdim
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // shadow qo'shdim
  },
  orderTitle: {
    fontSize: 20, // o'lchamni kichraytirdim
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center", // matnni markazlashtirdim
  },
  cardDefText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center", // matnni markazlashtirdim
  },
  profile: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  phone: {
    fontSize: 14,
    color: "#fff",
  },
  editButton: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
  },
  input: {
    borderBottomWidth: 1,
    color: "#fff",
    borderBottomColor: "#ccc",
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  picker: {
    backgroundColor: colors.green,
    color: "#fff",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    height: 60,
    width: "100%",
  },
});
