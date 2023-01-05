import { useGetDataToken } from '../../hooks/useGetData';
import { useInsertData } from '../../hooks/useInsertData';
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, USER_WISHLIST } from '../type';
import useDeleteData from './../../hooks/useDeleteData';

// Add Product To Wishlist 
export const addProductToWishList = (body) => async (dispatch) => {
    try {
        const response = await useInsertData("/api/v1/wishlist", body);
        dispatch({
            type: ADD_TO_WISHLIST,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: ADD_TO_WISHLIST,
            payload: e.response,
        })
    }
}
// Remove Product To Wishlist 
export const removeProductToWishList = (prodID) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/v1/wishlist/${prodID}`);
        dispatch({
            type: REMOVE_FROM_WISHLIST,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: REMOVE_FROM_WISHLIST,
            payload: e.response,
        })
    }
}
// Get Wishlist Product 
export const getProductWishList = () => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/wishlist`);
        dispatch({
            type: USER_WISHLIST,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: USER_WISHLIST,
            payload: e.response,
        })
    }
}