import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '@/constants/Colors';

interface TimesCardProps {
    title: string;
    onSelect: () => void;
    isSelected: boolean;
    isInRange: boolean;
    disabled: boolean;
    isBrone: boolean
}
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const TimesCard: React.FC<TimesCardProps> = ({ title, isBrone, onSelect, isSelected, isInRange, disabled }) => {
    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={!disabled ? onSelect : undefined}
            style={[
                styles.container,
                isSelected && styles.selected,
                isInRange && !isSelected && styles.inRange,
                disabled && styles.disabled
            ]}
            disabled={disabled}
        >
            <Text style={[styles.title, { color: isSelected ? 'white' : colors.inDarkGreen }]}>{title && title.slice(0, 5)}</Text>
        </TouchableOpacity>
    );
};

export default TimesCard;

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 40,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: screenWidth / 90,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    title: {
        fontSize: 15,
        color: colors.inDarkGreen
    },
    selected: {
        backgroundColor: colors.inDarkGreen,
    },
    inRange: {
        backgroundColor: '#aaaaaa',
    },
    disabled: {
        backgroundColor: '#cccccc',
    }
});