import { ADD_COUPON, GET_ALL_COUPON, EDIT_COUPON, GET_ONE_COUPON, DELTET_COUPON } from '../type';
import { useInsertData } from '../../hooks/useInsertData';
import { useGetDataToken } from '../../hooks/useGetData';
import useDeleteData from './../../hooks/useDeleteData';
import { useInsUpdateData } from '../../hooks/useUpdateData';

// Add Coupon
export const addCoupon = (body) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/coupons`, body);
        console.log(response)
        dispatch({
            type: ADD_COUPON,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: ADD_COUPON,
            payload: e.response,
        })
    }
}
// Get All Coupon
export const getAllCoupon = () => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/coupons`);
        dispatch({
            type: GET_ALL_COUPON,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: GET_ALL_COUPON,
            payload: e.response,
        })
    }
}
// Get One Coupon
export const getOneCoupon = (id) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/coupons/${id}`);
        dispatch({
            type: GET_ONE_COUPON,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: GET_ONE_COUPON,
            payload: e.response,
        })
    }
}
// Delete Coupon
export const deleteCoupon = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/v1/coupons/${id}`);
        dispatch({
            type: DELTET_COUPON,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: DELTET_COUPON,
            payload: e.response,
        })
    }
}
// Edit Coupon
export const editCoupon = (id, body) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/v1/coupons/${id}`, body);
        dispatch({
            type: EDIT_COUPON,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: EDIT_COUPON,
            payload: e.response,
        })
    }
}