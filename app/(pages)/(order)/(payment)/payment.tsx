import { View, Text, ScrollView, TextInput, StyleSheet, RefreshControl, Animated, SafeAreaView } from 'react-native';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import Buttons from '@/components/button/button';
import { colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import LoadingButtons from '@/components/button/loadingButton';
import { useOrderStory } from '@/helpers/stores/order/order-store';
import NavigationMenu from '@/components/navigation/NavigationMenu';

const Payment = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const { pay, setPay } = useOrderStory();
    const lottieRef = useRef<LottieView>(null);
    const paddingValue = useRef(new Animated.Value(0)).current; // Padding animation value

    const handleFirstNameChange = (name: string): void => {
        setPay(name);
    };

    useEffect(() => {
        // Dastlab Lottie animatsiyani to'xtating
        lottieRef.current?.pause();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        // Refresh animation boshlanganda Lottie'ni o'ynatish
        lottieRef.current?.play();

        Animated.timing(paddingValue, {
            toValue: 50,
            duration: 100,
            useNativeDriver: false,
        }).start(() => {
            setTimeout(() => {
                setRefreshing(false);

                // Refresh tugaganda Lottie'ni to'xtatish
                lottieRef.current?.pause();

                Animated.timing(paddingValue, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: false,
                }).start();
            }, 1500); // Duration of the pull-to-refresh animation
        });
    }, [paddingValue]);

    return (
        <SafeAreaView style={styles.container}>
            <LottieView
                source={require('../../../../assets/animation/Animation - ball-green.json')} // Path to your Lottie file
                ref={lottieRef}
                autoPlay={false}  // AutoPlay false qilib qo'yamiz
                loop
                style={styles.lottieAnimationTest}
            />
            <NavigationMenu name='qedir' />
            <ScrollView
                style={{ flex: 1 }}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="transparent" // Hides the default spinner
                        colors={['transparent']} // Hides the default spinner on Android
                    >
                        <Animated.View style={{ paddingTop: paddingValue }}></Animated.View>
                    </RefreshControl>
                }
            >
                <View style={styles.topSection}>
                    <Text style={styles.label}>{"so'mmani kiriting"}</Text>
                    <TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder={("so'mmani kiriting")}
                        placeholderTextColor="#FFF"
                        value={pay}
                        onChangeText={handleFirstNameChange}
                    />
                </View>
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
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
    topSection: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: colors.darkGreen,
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
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
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
    },
});

export default Payment;