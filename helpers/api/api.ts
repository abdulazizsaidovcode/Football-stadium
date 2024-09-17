export const BASE_URL: string = 'http://134.122.77.107:8085/api/v1/';

// AUTH
export const auth_login: string = `${BASE_URL}auth/login`;
export const auth_register: string = `${BASE_URL}auth/register`;
export const auth_register_client: string = `${BASE_URL}auth/client/register`;
export const auth_check_code: string = `${BASE_URL}auth/check-code`;
export const auth_send_code: string = `${BASE_URL}auth/send-code-to-phone`;

// USER
export const user_me: string = `${BASE_URL}user/me`;
export const user_update: string = `${BASE_URL}user/update`;

// FILE 
export const file_upload: string = `${BASE_URL}file/upload`;
export const file_update: string = `${BASE_URL}file/update`;
export const file_get: string = `${BASE_URL}file/`;
export const file_delete: string = `${BASE_URL}file/delete`;

// STADIUM
export const stadium_get: string = `${BASE_URL}stadium`;
export const stadium_get_master: string = `${BASE_URL}stadium/for/master`;
export const stadium_post_master: string = `${BASE_URL}stadium`;
export const stadium_get_one: string = `${BASE_URL}stadium/one`;
export const stadium_get_freetime: string = `${BASE_URL}stadium/free/time`;

// statistic 
    export const statistics_for_year : string = `${BASE_URL}for/master/year?`;
    export const statistics_for_month : string = `${BASE_URL}statistic/for/client`;
    export const statistic_get_stadium: string = `${BASE_URL}statistic/for/stadium`;
    export const statistic_get_by_date: string = `${BASE_URL}statistic/by/date`;
    export const statistic_get_by_stadium: string = `${BASE_URL}statistic/by/stadium`;