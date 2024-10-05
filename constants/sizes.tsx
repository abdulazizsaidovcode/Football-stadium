import { Dimensions } from "react-native";

interface Size {
    defaultPadding: number;
    extraSmall: number;
    smallText: number;
    mediumText: number;
    largeText: number;
    extraLargeText: number;
    buttonWidth: number;
    marginBottom: number;
}

interface Sizes {
    Tablet: Size;
    Phone: Size;
}

export const Sizes: Sizes = {
    Tablet: {
        defaultPadding: 32,
        extraSmall: 12,
        smallText: 22,
        mediumText: 30,
        largeText: 70,
        extraLargeText: 28,
        buttonWidth: 300,
        marginBottom: 20
    },
    Phone: {
        defaultPadding: 16,
        extraSmall: 14,
        smallText: 16,
        mediumText: 18,
        largeText: 34,
        extraLargeText: 26,
        buttonWidth: 250,
        marginBottom: 10
    }
};

const { width: screenWidth } = Dimensions.get('window');
const isTablet: boolean = screenWidth > 768;

export const getSize = (key: keyof Size) => {
    return isTablet ? Sizes.Tablet[key] : Sizes.Phone[key];
};
