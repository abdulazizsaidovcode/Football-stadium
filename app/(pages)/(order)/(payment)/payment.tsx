import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import Buttons from '@/components/button/button'
import { colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import LoadingButtons from '@/components/button/loadingButton';
import { useOrderStory } from '@/helpers/stores/order/order-store';

const Payment = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = React.useState(false)
    const { pay, setPay } = useOrderStory()

    const handleFirstNameChange = (name: string): void => {
        setPay(name);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={styles.topSection}>
                <Text style={styles.label}>{"so'mmani kiriting"}</Text>
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    placeholder={("so'mmani kiriting")}
                    placeholderTextColor="#FFF"
                    value={pay}
                    onChangeText={handleFirstNameChange}
                />
                {/* {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null} */}
            </ScrollView>
            <View style={styles.bottomSection}>
                {!loading ?
                    <Buttons title={("Continue")}
                        isDisebled={(pay !== '')}
                        onPress={() => {
                            setLoading(true)
                            setTimeout(() => {
                                setLoading(false)
                                navigation.goBack()
                            }, 1000)
                        }}
                    /> :
                    <LoadingButtons
                        title={("Continue")}
                    />
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGreen,
        padding: 16,
        justifyContent: 'space-between',
    },
    topSection: {
        flex: 1,
        paddingTop: 30,
    },
    progressBar: {
        flexDirection: 'row',
        height: 5,
        borderRadius: 5,
        paddingHorizontal: 20,
        marginTop: 100,

    },
    progressIndicator: {
        flex: 1,
        backgroundColor: '#9C0A35',
        borderRadius: 5,
    },
    progressSegment: {
        flex: 1,
        backgroundColor: '#8A8A8A',
        marginLeft: 5,
        borderRadius: 5,
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
        paddingTop: 15
    },
    button: {
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    errorText: {
        color: '#FF0000',
        marginTop: 5,
    },
    skipButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    skipButtonText: {
        color: colors.darkGreen,
        fontSize: 16,
    },
});

export default Payment