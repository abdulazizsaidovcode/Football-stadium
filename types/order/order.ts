interface Order {
    freeTime: string[];
    setFreeTime: (val: string) => void;
    pay: string;
    setPay: (val: string) => void;
    cardExpire: string
    setCardExpire: (val: string) => void;
    cardNumber: string
    setCardNumber: (val: string) => void
}