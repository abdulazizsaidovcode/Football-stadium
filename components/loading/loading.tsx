import { colors } from "@/constants/Colors"
import { ActivityIndicator, View } from "react-native"
export const Loading = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.darkGreen }}>
            <ActivityIndicator size="large" color={colors.lightGreen} />
        </View>
    )
}