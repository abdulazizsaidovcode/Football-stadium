import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '@/constants/Colors'
import Buttons from '../button/button'
import { Feather, FontAwesome6 } from '@expo/vector-icons'
import { StadiumTypes } from '@/types/stadium/stadium'
import { file_get } from '@/helpers/api/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from 'expo-router'
import { haveOrNot } from '@/helpers/global_functions/favourite/favourite'
import { getSize } from '@/constants/sizes'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const isTablet = screenWidth > 768;

const StadiumCard: React.FC<{ disabled?: boolean, data: StadiumTypes, onMapPress: () => void, onPress: () => void, iconColor?: string | any, fetchFunction: () => void }> = ({ data, onMapPress, onPress, fetchFunction }) => {
    const [role, setRole] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Loading state for the image

    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            const storedRole = await AsyncStorage.getItem('role');
            const storedToken = await AsyncStorage.getItem('token');
            setRole(storedRole);
            setToken(storedToken);
        };

        fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.title}>{data.name}</Text>
                <Text style={styles.priceTitle}>{data.price} sum</Text>
            </View>

            {/* Image loading indicator */}
            <View style={{ position: 'relative', height: isTablet ? 500 : 200, marginBottom: getSize('marginBottom') }}>
                {isLoading && (
                    <ActivityIndicator
                        size="large"
                        color={colors.green}
                        style={styles.loadingIndicator}
                    />
                )}
                <Image
                    height={isTablet ? 500 : 200}
                    style={[styles.image, isLoading && { opacity: 0.5 }]} // Dim the image when loading
                    source={data.isMainAttachmentId
                        ? { uri: file_get + data.isMainAttachmentId }
                        : require('../../assets/images/defaultImg.jpeg')
                    }
                    onLoadStart={() => setIsLoading(true)} // Show spinner when image starts loading
                    onLoadEnd={() => setIsLoading(false)}   // Hide spinner when image finishes loading
                />
            </View>

            <Text style={[styles.description, { marginBottom: getSize('marginBottom') }]}>{data.description}</Text>
            <View style={styles.btnContainer}>
                <View style={{ width: '70%' }}>
                    <Buttons onPress={onPress} title='Записаться' />
                </View>
                <TouchableOpacity
                    onPress={onMapPress}
                    activeOpacity={.8}
                    style={styles.locationBtn}>
                    <FontAwesome6 name="location-dot" size={getSize('mediumText') + (isTablet ? 13 : 0)} color="white" />
                </TouchableOpacity>
                {role && token ? data.id && haveOrNot(data.favourite, data.id, fetchFunction) :
                    <TouchableOpacity
                        onPress={() => alert("Birinchi logindan o'ting")}
                        activeOpacity={0.8}
                        style={{
                            padding: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: colors.green,
                            borderRadius: 50,
                            width: isTablet ? 70 : 46,
                        }}>
                        <Feather name="bookmark" size={getSize('mediumText') + (isTablet ? 15 : 0)} color="white" />
                    </TouchableOpacity>}
            </View>
        </View>
    )
}

export default StadiumCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#698474',
        padding: getSize('defaultPadding') - 5,
        borderRadius: 10
    },
    title: {
        fontSize: getSize('mediumText'),
        color: colors.white,
        marginVertical: 5
    },
    priceTitle: {
        fontSize: getSize('smallText'),
        color: colors.lightGreen,
        marginVertical: 5
    },
    description: {
        fontSize: getSize('smallText'),
        color: colors.white,
        marginVertical: 5
    },
    locationBtn: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.green,
        borderRadius: 50,
        width: isTablet ? 70 : 46,
    },
    btnContainer: {
        flexDirection: 'row',
        gap: 3,
        justifyContent: 'space-between'
    },
    image: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    loadingIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -20 }, { translateY: -20 }],
    },
});
