import React, { useEffect, useRef } from 'react';
import { RefreshControl, StyleSheet, View, Animated } from 'react-native';
// import LottieView from 'lottie-react-native';

interface LottieRefreshControlTestProps {
    refreshing: boolean;
    onRefresh: () => void;
    lottieSource: any;  // Lottie JSON file
    lottieStyle?: object;
}

const LottieRefreshControlTest: React.FC<LottieRefreshControlTestProps> = ({
    refreshing,
    onRefresh,
    lottieSource,
    lottieStyle,
}) => {
    const animationValue = useRef(new Animated.Value(-100)).current; // Start off-screen
    const paddingValue = useRef(new Animated.Value(0)).current; // Padding animation value

    useEffect(() => {
        if (refreshing) {
            // Animate Lottie to 0 and padding to 100 when refreshing starts
            Animated.parallel([
                Animated.timing(animationValue, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(paddingValue, {
                    toValue: 50,
                    duration: 300,
                    useNativeDriver: false, // Padding can't use native driver
                }),
            ]).start();
        } else {
            // Reset Lottie to -200 and padding to 0 when refreshing ends
            Animated.parallel([
                Animated.timing(animationValue, {
                    toValue: -200,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(paddingValue, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: false,
                }),
            ]).start();
        }
    }, [refreshing]);

    return (
        <Animated.View style={{ paddingTop: paddingValue }}>
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="transparent"
                colors={['transparent']}  // Hide the default spinner
            >
                {refreshing && (
                    <Animated.View style={[styles.lottieContainer, { transform: [{ translateY: animationValue }] }]}>
                        {/* <LottieView
                            source={lottieSource}
                            autoPlay
                            loop
                            style={[styles.defaultLottieStyle, lottieStyle]}
                        /> */}
                    </Animated.View>
                )}
            </RefreshControl>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    lottieContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    defaultLottieStyle: {
        width: 100,
        height: 200,
        marginBottom: 20,
    },
});

export default LottieRefreshControlTest;
