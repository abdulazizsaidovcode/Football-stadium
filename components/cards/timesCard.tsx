import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '@/constants/Colors';
import { getSize } from '@/constants/sizes';

interface TimesCardProps {
    title: string;
    onSelect: () => void;
    isSelected: boolean;
    isInRange: boolean;
    disabled: boolean;
    isBrone: boolean
}
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const isTablet = screenWidth > 768;

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
        width: isTablet ? 120 : 80,
        height: isTablet ? 60 : 40,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: screenWidth / 90 - (isTablet ? 3 : 0),
        borderWidth: 1,
        borderColor: 'transparent',
    },
    title: {
        fontSize: getSize('smallText'),
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