import { order_detail } from '@/helpers/api/api';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react'

function OrderDetail() {
    const route = useRoute();
    const { id } = route.params as { id: string | number };
    // fetch order data from server by id and render it
    const orderDetail = useGlobalRequest(order_detail + id, 'GET')

    useEffect(() => {
        orderDetail.globalDataFunc()
    }, [])

    return (
        <div>

        </div>
    )
}

export default OrderDetail
