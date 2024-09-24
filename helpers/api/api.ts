export const BASE_URL: string = 'https://app.coinbyitca.uz/api/v1/';

// AUTH
export const auth_login: string = `${BASE_URL}auth/login`;
export const auth_register: string = `${BASE_URL}auth/register`;
export const auth_register_client: string = `${BASE_URL}auth/client/register`;
export const auth_check_code: string = `${BASE_URL}auth/check-code`;
export const auth_send_code: string = `${BASE_URL}auth/send-code-to-phone`;

// USER
export const user_me: string = `${BASE_URL}user/me`;
export const user_update: string = `${BASE_URL}user/update`;
export const user_found: string = `${BASE_URL}user/is/found`;

// FILE 
export const file_upload: string = `${BASE_URL}file/upload`;
export const file_update: string = `${BASE_URL}file/update`;
export const file_get: string = `${BASE_URL}file/`;
export const file_delete: string = `${BASE_URL}file/delete`;

// STADIUM
export const stadium_get: string = `${BASE_URL}stadium`;
export const stadium_get_master: string = `${BASE_URL}stadium/for/master`;
export const stadium_post_master: string = `${BASE_URL}stadium`;
export const stadium_add_attachment :string = `${BASE_URL}stadium/attachment`;
export const stadium_get_one: string = `${BASE_URL}stadium/one`;
export const stadium_get_freetime: string = `${BASE_URL}stadium/free/time`;
export const stadium_search: string = `${BASE_URL}stadium/search`;
export const stadium_delete: string = `${BASE_URL}stadium`;

// ORDERS

export const order_reject: string = `${BASE_URL}order/cancel-order/`;
export const order_detail: string = `${BASE_URL}order/`;
export const order_day_master: string = `${BASE_URL}order/today`;
export const statistics_for_year: string = `${BASE_URL}statistic/for/master/year`;

// order 
export const order_create: string = `${BASE_URL}order/create-order`

// History 
export const order_history: string = `${BASE_URL}order/history`;
export const order_today: string = `${BASE_URL}order/today`;

// favourite 
export const favourite_add: string = `${BASE_URL}favourite/save`;
export const favourite_get: string = `${BASE_URL}favourite/list`;
export const favourite_delate: string = `${BASE_URL}favourite/delete`;


// Notification
export const get_notification: string = `${BASE_URL}notification/my-notifications`;
export const get_notification_cout: string = `${BASE_URL}notification/count-unread-notifications`;
export const delete_notification: string = `${BASE_URL}notification/soft-delete`;
export const isread_notification: string = `${BASE_URL}notification/mark-as-read`;

// Card
export const card: string = `${BASE_URL}card`;
export const check_card: string = `${BASE_URL}card/check-code`;