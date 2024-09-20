import React from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

interface LottieRefreshControlProps {
    refreshing: boolean;
    onRefresh: () => void;
    lottieSource: any;  // Lottie JSON file
    lottieStyle?: object;
}

const LottieRefreshControl: React.FC<LottieRefreshControlProps> = ({
    refreshing,
    onRefresh,
    lottieSource,
    lottieStyle,
}) => {
    return (
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="transparent"
            colors={['transparent']}  // Hide the default spinner
        >
            {refreshing && (
                <View style={styles.lottieContainer}>
                    <LottieView
                        source={lottieSource}
                        autoPlay
                        loop
                        style={[styles.defaultLottieStyle, lottieStyle]}
                    />
                </View>
            )}
        </RefreshControl>
    );
};

const styles = StyleSheet.create({
    lottieContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        // Use padding instead of margin
        paddingBottom: 30,
    },
    defaultLottieStyle: {
        width: 100,
        height: 200,
    },
});

export default LottieRefreshControl;
