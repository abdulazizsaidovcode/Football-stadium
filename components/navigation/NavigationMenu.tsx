import { View, Text, StyleSheet } from 'react-native';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "expo-router";
import { INavigationProps } from "@/types/navigation/navigation";
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { colors } from '@/constants/Colors';
import { getSize } from '@/constants/sizes';

const NavigationMenu = ({ toggleModal, name, deleteIcon, all = false, delOnPress, editOnPress, addOnPress, navigate }: INavigationProps) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Feather name="chevron-left" size={getSize("mediumText") + 8} color="white" onPress={navigate ? navigate : () => navigation.goBack()} />
            <Text style={styles.title}>{name}</Text>
            {deleteIcon
                ? <MaterialIcons name="delete" size={25} color="white" onPress={toggleModal} />
                : <Text style={{}}></Text>
            }
            {all ?
                <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="add-circle-outline" size={25} color="white" onPress={addOnPress} />
                    <AntDesign name="edit" size={25} color="white" onPress={editOnPress} />
                    <MaterialIcons name="delete" size={25} color="white" onPress={delOnPress} />
                </View> : ''}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginHorizontal: 7,
        paddingVertical: 20,
        backgroundColor: colors.darkGreen
    },
    title: {
        color: 'white',
        fontSize: getSize("mediumText"),
    },
});

export default NavigationMenu;
