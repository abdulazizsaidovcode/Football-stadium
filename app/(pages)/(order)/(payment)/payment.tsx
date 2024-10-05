import { View, Text, ScrollView, TextInput, StyleSheet, RefreshControl, Animated, SafeAreaView, Dimensions } from 'react-native';
import React, { useState, useCallback, useRef, useEffect } from 'react';
// import LottieView from 'lottie-react-native';
import Buttons from '@/components/button/button';
import { colors } from '@/constants/Colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import LoadingButtons from '@/components/button/loadingButton';
import { useOrderStory } from '@/helpers/stores/order/order-store';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { card } from '@/helpers/api/api';
import { useFocusEffect } from 'expo-router';
import { Loading } from '@/components/loading/loading';
import CreditCard from '@/components/cards/credit-card';
import { Entypo, Feather } from '@expo/vector-icons';
import { RootStackParamList } from '@/types/root/root';
import { getSize } from '@/constants/sizes';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList>;
const isTablet = screenWidth > 768;


const Payment = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const { pay, setPay, setCardExpire, setCardNumber } = useOrderStory();
    const [cardId, setCardId] = useState('')
    const cards = useGlobalRequest(card.split('/api/v1').join(''), 'GET');

    // const lottieRef = useRef<LottieView>(null);
    // const paddingValue = useRef(new Animated.Value(0)).current; // Padding animation value

    const handleFirstNameChange = (name: string): void => {
        setPay(name);
    };
    useFocusEffect(
        useCallback(() => {
            cards.globalDataFunc()
        }, [])
    );
    const selectCard = (id: string) => {
        console.log(cardId, '1');
        console.log(id, 2);

        if (cardId !== id) {
            setCardId(id)
            let card = cards.response.find((item: { id: string }) => item.id == id)
            setCardExpire(card.cardExpire)
            setCardNumber(card.cardNumber)
        } else if (cardId == id) {
            setCardId('')
        }
    }
    console.log(cards.loading);
    console.log(cardId);
    console.log(cards.response);




    // useEffect(() => {
    //     // Dastlab Lottie animatsiyani to'xtating
    //     lottieRef.current?.pause();
    // }, []);

    // const onRefresh = useCallback(() => {
    //     setRefreshing(true);

    //     // Refresh animation boshlanganda Lottie'ni o'ynatish
    //     lottieRef.current?.play();

    //     Animated.timing(paddingValue, {
    //         toValue: 50,
    //         duration: 100,
    //         useNativeDriver: false,
    //     }).start(() => {
    //         setTimeout(() => {
    //             setRefreshing(false);

    //             // Refresh tugaganda Lottie'ni to'xtatish
    //             lottieRef.current?.pause();

    //             Animated.timing(paddingValue, {
    //                 toValue: 0,
    //                 duration: 100,
    //                 useNativeDriver: false,
    //             }).start();
    //         }, 1500); // Duration of the pull-to-refresh animation
    //     });
    // }, [paddingValue]);

    return (
        <SafeAreaView style={styles.container}>
            {/* <LottieView
                source={require('../../../../assets/animation/Animation - ball-green.json')} // Path to your Lottie file
                ref={lottieRef}
                autoPlay={false}  // AutoPlay false qilib qo'yamiz
                loop
                style={styles.lottieAnimationTest}
            /> */}
            <View style={{ paddingHorizontal: getSize('defaultPadding') }}>
                <NavigationMenu name='qedir' />
            </View>
            <ScrollView
                style={{ flex: 1 }}
                showsHorizontalScrollIndicator={false}
            // refreshControl={
            //     <RefreshControl
            //         refreshing={refreshing}
            //         onRefresh={onRefresh}
            //         tintColor="transparent" // Hides the default spinner
            //         colors={['transparent']} // Hides the default spinner on Android
            //     >
            //         <Animated.View style={{ paddingTop: paddingValue }}></Animated.View>
            //     </RefreshControl>
            // }
            >
                <View style={styles.topSection}>
                    <Text style={styles.label}>{"so'mmani kiriting"}</Text>
                    <TextInput
                        editable={!!cardId}
                        keyboardType='numeric'
                        style={[styles.input, { backgroundColor: cardId == '' ? 'gray' : colors.inDarkGreen, marginBottom: 20 }]}
                        placeholder={("so'mmani kiriting")}
                        placeholderTextColor="#FFF"
                        value={pay}
                        onChangeText={handleFirstNameChange}
                    />
                </View>
                <ScrollView horizontal={isTablet} style={{ paddingHorizontal: getSize('defaultPadding'), flexDirection: isTablet ? 'row' : "column", flex: 1, gap: 10 }}>
                    <View style={[{ padding: 0, flexDirection: isTablet ? 'row' : "column", width: '100%', flex: 1, gap: 10 }, isTablet && { justifyContent: 'flex-start', alignItems: 'flex-start' }]}>
                        {
                            cards.loading ?
                                (
                                    <View style={{ height: screenHeight / 1.5 }}>
                                        <Loading />
                                    </View>
                                )
                                : (
                                    cards.response && cards.response.length > 0 ?
                                        (
                                            cards.response.map((item: { cardExpire: string, cardNumber: string, id: string, main: boolean, owner: string }, index: number) => (
                                                <View>
                                                    <CreditCard
                                                        key={index}
                                                        cardExpiry={item.cardExpire}
                                                        cardNumber={item.cardNumber}
                                                        main={cardId ? true : false}
                                                        owner={item.owner}
                                                        onMainSelect={() => selectCard(item.id)}
                                                    />
                                                </View>
                                            ))
                                        ) : (
                                            <View style={{ height: screenHeight / 1.5, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
                                                <Feather name="credit-card" size={70} color="white" />
                                                <Text style={{ color: colors.white, fontSize: 20 }}>Siz toʻlov kartasini qoʻshmagansiz</Text>
                                                <Text style={{ color: '#828282', fontSize: 14, textAlign: 'center', marginBottom: 10 }}>Ilova orqali tez va oson toʻlovlarni amalga oshirish uchun karta qoʻshing</Text>
                                                <Buttons icon={<Entypo name="plus" size={24} color="white" />} title="Karta qo'shish" onPress={() => navigation.navigate('(pages)/(card)/(add-card)/add-card')} />
                                            </View>
                                        )
                                )
                        }
                    </View>
                </ScrollView>


            </ScrollView>

            <View style={styles.bottomSection}>
                {!loading ? (
                    <Buttons
                        title={("Continue")}
                        isDisebled={(pay !== '')}
                        onPress={() => {
                            setLoading(true);
                            setTimeout(() => {
                                setLoading(false);
                                navigation.goBack();
                            }, 1000);
                        }}
                    />
                ) : (
                    <LoadingButtons title={("Continue")} />
                )}
            </View>
        </SafeAreaView>
    );
}; const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGreen,
        paddingHorizontal: getSize('defaultPadding'),
        justifyContent: 'space-between',
    },
    topSection: {
        flex: 1,
        // paddingTop: 30,
        backgroundColor: colors.darkGreen,
        paddingHorizontal: getSize('defaultPadding'),
    },
    lottieAnimationTest: {
        width: 100,
        height: 100,
        top: 120,
        alignSelf: 'center',
        position: 'absolute',
    },
    label: {
        color: '#FFFFFF',
        fontSize: getSize('smallText'),
        marginTop: 20,
    },
    input: {
        height: 55,
        borderColor: '#4B4B64',
        backgroundColor: colors.inDarkGreen,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 10,
        color: '#FFFFFF',
    },
    bottomSection: {
        justifyContent: 'flex-end',
        backgroundColor: colors.darkGreen,
        paddingTop: 15,
        paddingHorizontal: 16
    },
});

export default Payment;