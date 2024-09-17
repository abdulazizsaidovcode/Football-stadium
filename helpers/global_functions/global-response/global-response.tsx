import { useMutation } from "react-query";
import axios from "axios";
import { toastMessage } from "../toast-message/toast-message";
import { getConfig } from "@/helpers/api/token";

export interface UseGlobalResponse<T> {
    loading: boolean;
    error: any;
    response: T | any | undefined;
    globalDataFunc: () => void;
}

export function useGlobalRequest<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: T
): UseGlobalResponse<T> {
    const mutation = useMutation({
        mutationFn: async () => {
            let res;
            console.log(url);
            
            const config = await getConfig();
            switch (method) {
                case 'GET':
                    res = await axios.get(url, config || {});
                    break;
                case 'POST':
                    res = await axios.post(url, data || {}, config || {});
                    break;
                case 'PUT':
                    res = await axios.put(url, data || {}, config || {});
                    break;
                case 'DELETE':
                    res = await axios.delete(url, config || {});
                    break;
                default:
                    return alert('Method xaltolik yuz berdi!');
            }
            if (res.data.error) toastMessage(res.data.error.code, res.data.error.message);
            return res.data.data;
        },
        onError: (error: any) => console.log(error)
    });

    return {
        loading: mutation.status === 'loading',
        error: mutation.error,
        response: mutation.data,
        globalDataFunc: mutation.mutateAsync,
    };
}