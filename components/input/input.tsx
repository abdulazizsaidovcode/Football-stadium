import { colors } from "@/constants/Colors";
import React from "react";
import { Text, View, TextInput, SafeAreaView, StyleSheet } from "react-native";

const Input: React.FC<{
    label?: string;
    labalVisible?: boolean;
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    type?: "default" | "numeric" | "email-address" | "phone-pad";
}> = (
    {
        label,
        labalVisible = true,
        value,
        onChangeText,
        placeholder,
        type
    }) => {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    {labalVisible && (
                        <Text style={[styles.label, label ? styles.marginBottom : null]}>{label}</Text>
                    )}
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        placeholderTextColor='#828282'
                        value={value}
                        keyboardType={type}
                    />
                </View>
            </SafeAreaView>
        );
    };

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    label: {
        color: "white",
        fontSize: 16,
    },
    marginBottom: {
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.inDarkGreen, // Equivalent to gray-500
        borderRadius: 12, // Equivalent to rounded-xl
        paddingVertical: 12, // Equivalent to py-3
        paddingHorizontal: 20, // Equivalent to px-5
        marginBottom: 12, // Equivalent to mb-3
        width: "100%",
        height: 56, // Equivalent to h-14
        color: "white",
        fontSize: 18, // Equivalent to text-lg
    },
});

export default Input;
