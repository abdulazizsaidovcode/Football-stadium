import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
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
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "expo-router";
import { RootStackParamList } from "@/types/root/root";
import { NavigationProp } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import CenteredModal from "@/components/modal/sentralmodal";
import { StadiumTypes } from "@/types/stadium/stadium";
import OrderCard, { OrderTofay } from "@/components/cards/orderCard";
import OrderStore from "@/helpers/stores/order/orderStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSize } from "@/constants/sizes";

type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "(pages)/(master)/(order)/order"
>;

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')
const isTablet = screenWidth > 768;

export default function MasterOrder() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [role, setRole] = useState<string | null>('')

  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const { OrderData, setOrderData } = OrderStore()

  const userMee = useGlobalRequest(user_me, "GET");
  const orderReject = useGlobalRequest(
    order_reject + OrderData?.id,
    "PUT",
    {}
  );
  const OrdersDay = useGlobalRequest(order_day_master, "GET");
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const stadiums = useGlobalRequest<StadiumTypes>(stadium_get_master, "GET");
  const [selectedValue, setSelectedValue] = useState<string>('');

  const openModal = () => setIsModalVisible(!isModalVisible);
  const openRejectModal = () => setIsRejectModalVisible(!isRejectModalVisible);

  const navigateToOrder = () => {
    if (selectedValue) {
      navigation.navigate("(pages)/(order)/(order-save)/order-save", {
        id: selectedValue,
      });
    } else {
      alert("Bron qilinga stadiumni tanlang!");
    }
    openModal();
  };

  useFocusEffect(
    useCallback(() => {
      OrdersDay.globalDataFunc();
      stadiums.globalDataFunc();
      getRole()
    }, [])
  );

  async function getRole() {
    let getrole = await AsyncStorage.getItem('role')
    setRole(getrole)
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.darkGreen,
        paddingVertical: 0,
      }}
    >
      <Layout scroll>
        <View style={styles.container}>
          <Text style={styles.title}>Bugungi qilingan bronlaringiz</Text>

          {OrdersDay.response && OrdersDay.response.length > 0 ? (
            OrdersDay.response.map((item: OrderTofay) => (
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
      <View style={{ paddingHorizontal: getSize('defaultPadding'), paddingVertical: 10, backgroundColor: colors.darkGreen }}>
        {role == 'MASTER' && <Buttons
          onPress={() => {
            if (stadiums.response && stadiums.response.length == 0) {
              alert("avval ozingizga staduin qoshishingiz kerak");
            }
            if (stadiums.response && stadiums.response.length == 1) {
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
        />}
      </View>

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
              stadiums.response.map((res: { name: string, id: number | string }, index: string) => (
                <Picker.Item
                  label={`${index + 1}: ${res.name}`}
                  value={res.id}
                />
              ))}
          </Picker>
          <Text style={{ color: "#fff", fontSize: 16 }}>
            Tanlangan stadion:
            {stadiums.response &&
              stadiums.response.find((item: { id: number | null | string }) => item.id == selectedValue)
                ?.name}
          </Text>
        </View>
      </CenteredModal>
      <CenteredModal
        isModal={isRejectModalVisible}
        toggleModal={openRejectModal}
        btnWhiteText="Orqaga"
        btnRedText="Rad etish"
        isFullBtn={true}
        onConfirm={() => {
          if (OrderData && OrderData?.id) {
            orderReject.globalDataFunc();
            if (orderReject.response) {
              openRejectModal();
              OrdersDay.globalDataFunc()
              alert("Buyurtma muvaffaqiyatli rad etildi!")
            }
            setOrderData(null);
          } else {
            setOrderData(null);
          }
        }}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <MaterialCommunityIcons name="cancel" size={100} color={colors.lightGreen} />
          <Text style={[styles.OrderText, { paddingVertical: 10 }]}>
            Siz aniq bu buyurtmani rad etmoqchimisiz?
          </Text>
        </View>
      </CenteredModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#000",
    paddingHorizontal: getSize('defaultPadding'),
  },
  Buttons: {
    display: "flex",
  },
  title: {
    fontSize: getSize('mediumText') + (isTablet ? 12 : 0),
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
