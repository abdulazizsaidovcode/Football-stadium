import { colors } from "@/constants/Colors";
import { favourite_add, favourite_delate, favourite_get } from "@/helpers/api/api";
import { getConfig } from "@/helpers/api/token";
import { StadiumTypes } from "@/types/stadium/stadium";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import axios from "axios"
import { TouchableOpacity } from "react-native";
import { toastMessage } from "../toast-message/toast-message";

export const fetchFavouriteOrders = async (setFavouriteOrders: (val: StadiumTypes[]) => void, setIsloading: (val: boolean) => void) => {
    setIsloading(true)
    const config = await getConfig();
    try {
        const { data } = await axios.get(favourite_get, config ? config : {})
        if (data.data) {
            setFavouriteOrders(data.body)
            setIsloading(false)
        } else {
            setFavouriteOrders([])
            setIsloading(false)
            toastMessage(data.error.code, data.error.message)
        }
    } catch (error) {
        console.error(error);
        setFavouriteOrders([])
        setIsloading(false)
    }
}

export const addFavouriteOrder = async (masterId: string, setFavouriteOrders: (val: StadiumTypes[]) => void, setIsloading: (val: boolean) => void) => {
    const config = await getConfig();
    try {
        const { data } = await axios.post(`${favourite_add}/${masterId}`, {}, config ? config : {})
        if (data.data) {
            alert('Мастер успешно добавлен в список любимый мастеров.',)
            fetchFavouriteOrders(setFavouriteOrders, setIsloading)
        } else {
            toastMessage(data.error.code, data.error.message)
        }
    } catch (error) {
        console.error(error);
    }
}

export const deleteFavouriteOrder = async (masterId: string, setFavouriteOrders: (val: StadiumTypes[]) => void, setIsloading: (val: boolean) => void, toggleModal?: () => void) => {
    const config = await getConfig();

    try {
        const { data } = await axios.delete(`${favourite_delate}/${masterId}`, config ? config : {})
        if (data.data) {
            await fetchFavouriteOrders(setFavouriteOrders, setIsloading)
            toggleModal && toggleModal()
            alert('Мастер успешно удален из списка любимый мастеров.',)
        } else {
            toastMessage(data.error.code, data.error.message)
        }
    } catch (error: any) {
        console.log(error);
    }
}

export const haveOrNot = (favourite: boolean, masterId: any, setFavouriteOrders: (val: StadiumTypes[]) => void, setIsloading: (val: boolean) => void) => {
    console.log('masterId', masterId);

    if (favourite) {
        return (
            <TouchableOpacity onPress={() => deleteFavouriteOrder(masterId, setFavouriteOrders, setIsloading)} activeOpacity={0.8} style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.green,
                borderRadius: 50,
                width: 46,
            }}>
                <MaterialIcons name="bookmark" size={24} color="white" />
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity onPress={() => addFavouriteOrder(masterId, setFavouriteOrders, setIsloading)} activeOpacity={0.8} style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.green,
                borderRadius: 50,
                width: 46,
            }}>
                <Feather name="bookmark" size={24} color="white" />
            </TouchableOpacity>
        )
    }
};
