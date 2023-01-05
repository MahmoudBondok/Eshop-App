import {
    CREATE_NEW_USER, RESET_PASSWORD, UPDATE_USER_PROFILE,
    VERIFY_PASSWORD, FOREGT_PASSWORD, GET_CURERNT_USER, LOGIN_USER, UPDATE_USER_PASSWORD
} from '../type';
import { useInsertData } from '../../hooks/useInsertData';
import { useGetDataToken } from './../../hooks/useGetData';
import { useInsUpdateData } from '../../hooks/useUpdateData';

// Create New User 
export const createNewUser = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/auth/signup`, data);
        dispatch({
            type: CREATE_NEW_USER,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: CREATE_NEW_USER,
            payload: e.response,
        })
    }
}
// Login User 
export const loginUser = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/auth/login`, data);
        dispatch({
            type: LOGIN_USER,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: LOGIN_USER,
            payload: e.response,
        })
    }
}
// Login User 
export const getLoggedUser = () => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/users/getMe`);
        dispatch({
            type: GET_CURERNT_USER,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: GET_CURERNT_USER,
            payload: e.response,
        })
    }
}
// Foregt Passwrod 
export const forgetPassword = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/auth/forgotPasswords`, data);
        dispatch({
            type: FOREGT_PASSWORD,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: FOREGT_PASSWORD,
            payload: e.response,
        })
    }
}
// Verify Passwrod 
export const verifyPassword = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/auth/verifyResetCode`, data);
        dispatch({
            type: VERIFY_PASSWORD,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: VERIFY_PASSWORD,
            payload: e.response,
        })
    }
}
// Reset Passwrod 
export const resetPassword = (data) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/v1/auth/resetPassword`, data);
        dispatch({
            type: RESET_PASSWORD,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: RESET_PASSWORD,
            payload: e.response,
        })
    }
}
// Update User Data
export const updateUserProfileData = (body) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/v1/users/updateMe`, body);
        console.log(response)
        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: e.response,
        })
    }
}
// Update User Password
export const updateUserPassword = (body) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/v1/users/changeMyPassword`, body);
        console.log(response)
        dispatch({
            type: UPDATE_USER_PASSWORD,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: UPDATE_USER_PASSWORD,
            payload: e.response,
        })
    }
}