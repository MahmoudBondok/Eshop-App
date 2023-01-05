import {
    DELETE_PRODUCTS, GET_ALL_PRODUCTS_CATEGORY, GET_ALL_PRODUCTS_BRAND,
    UPDATE_PRODUCTS, CREATE_PRODUCTS, GET_PRODUCT_LIKE,
    GET_ALL_PRODUCTS, GET_PRODUCT_DETALIS, GET_ERROR
} from '../type';
import { useGetData } from './../../hooks/useGetData';
import useDeleteData from './../../hooks/useDeleteData';
import { useInsertDataWithImage } from '../../hooks/useInsertData';
import { useInUpdateDataWithImage } from '../../hooks/useUpdateData';

// Create Products With Pagination
export const createProduct = (formatData) => async (dispatch) => {
    try {
        const response = await useInsertDataWithImage("/api/v1/products", formatData);
        dispatch({
            type: CREATE_PRODUCTS,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error  " + e,
        })
    }
}
// Get All Products With Pagination
export const getAllProducts = (limit) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products?limit=${limit}`);
        dispatch({
            type: GET_ALL_PRODUCTS,
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
// Get All Products By Category
export const getAllProductsByCategory = (page, limit, categoryID) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products?limit=${limit}&category=${categoryID}&page=${page}`);
        dispatch({
            type: GET_ALL_PRODUCTS_CATEGORY,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: GET_ALL_PRODUCTS_CATEGORY,
            payload: e.response,
        })
    }
}
// Get All Products By Brand
export const getAllProductsByBrand = (page, limit, brandID) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products?limit=${limit}&brand=${brandID}&page=${page}`);
        dispatch({
            type: GET_ALL_PRODUCTS_BRAND,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: GET_ALL_PRODUCTS_BRAND,
            payload: e.response,
        })
    }
}
// Get All Products With Pagination With Pages Number
export const getAllProductsPage = (page, limit) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products?page=${page}&limit=${limit}`);
        dispatch({
            type: GET_ALL_PRODUCTS,
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
// Get All Products With Query String
export const getAllProductsSearch = (queryString) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products?${queryString}`);
        dispatch({
            type: GET_ALL_PRODUCTS,
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
// Get One Product With Id
export const getOneProduct = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products/${id}`);
        dispatch({
            type: GET_PRODUCT_DETALIS,
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
// Get One Product With Id
export const getProductLike = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products?category=${id}`);
        dispatch({
            type: GET_PRODUCT_LIKE,
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
// Delete Prooduct With Id
export const deleteProducts = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/v1/products/${id}`);
        dispatch({
            type: DELETE_PRODUCTS,
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
// Update Prooduct With Id
export const updateProducts = (id, data) => async (dispatch) => {
    try {
        const response = await useInUpdateDataWithImage(`/api/v1/products/${id}`, data);
        dispatch({
            type: UPDATE_PRODUCTS,
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