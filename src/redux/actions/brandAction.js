import { GET_ALL_BRAND, GET_ONE_BRAND, GET_ERROR, CREATE_BRAND } from '../type';
import { useGetData } from '../../hooks/useGetData';
import { useInsertDataWithImage } from '../../hooks/useInsertData';

// Get All Brand
export const getAllBrand = (limit) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/brands?limit=${limit}`);
        dispatch({
            type: GET_ALL_BRAND,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}
// Get One Brand
export const getOneBrand = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/brands/${id}`);
        dispatch({
            type: GET_ONE_BRAND,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}
// Get All Brand With Pagination
export const getAllBrandPage = (page) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/brands?limit=4&page=${page}`);
        dispatch({
            type: GET_ALL_BRAND,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}
// Insert Brand With Pagination
export const createBrand = (formData) => async (dispatch) => {
    try {
        const response = await useInsertDataWithImage(`/api/v1/brands`, formData);
        dispatch({
            type: CREATE_BRAND,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}