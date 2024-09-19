import { order_detail } from '@/helpers/api/api';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import OrderStore from '@/helpers/stores/order/orderStore';
import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react'

function OrderDetail() {
    const route = useRoute();
   
    const {OrderData} = OrderStore()
    // fetch order data from server by id and render it
    const orderDetail = useGlobalRequest(order_detail + OrderData?.id, 'GET')

    useEffect(() => {
        orderDetail.globalDataFunc()
    }, [])

    return (
        <div>

        </div>
    )
}

export default OrderDetail
