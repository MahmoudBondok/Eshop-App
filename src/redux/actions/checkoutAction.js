import { CREATE_ORDER_CASH, CREATE_ORDER_CRAD } from '../type';
import { useGetDataToken } from '../../hooks/useGetData';
import { useInsertData } from '../../hooks/useInsertData';

// Create Order Cash For User
export const createOrderCash = (id, body) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/orders/${id}`, body);
        console.log(response)
        dispatch({
            type: CREATE_ORDER_CASH,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: CREATE_ORDER_CASH,
            payload: e.response,
        })
    }
}
// Create Order By Card For User
export const createOrderCARD = (id, body) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/orders/checkout-session/${id}`, body);
        console.log(response)
        dispatch({
            type: CREATE_ORDER_CRAD,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: CREATE_ORDER_CRAD,
            payload: e.response,
        })
    }
}