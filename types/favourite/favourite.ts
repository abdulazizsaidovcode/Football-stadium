export interface FavouriteOrdersStoreTypes {
    masterId: string,
    setMasterId: (val: string) => void;
    isModal: boolean,
    setIsModal: (val: boolean) => void;
    isLoading: boolean,
    setIsLoading: (val: boolean) => void;
    favouriteOrders: any[];
    setFavouriteOrders: (val: any[]) => void;
}
