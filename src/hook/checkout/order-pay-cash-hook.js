import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrderCash } from '../../redux/actions/checkoutAction';
import { getOneUserAddress } from '../../redux/actions/userAddressesAction';
import notify from '../useNotifaction';
import GetAllUserCartHook from './../cart/get-all-user-cart-hook';

const OrderPayCashHook = () => {
    const [loading, setLoading] = useState(true);
    const [loadingCreate, setLoadingCreate] = useState(true);
    const [addressDetalis, setAddressDetalis] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [, , , , , cartID] = GetAllUserCartHook();

    // When Change Address By User
    const handelChooseAddress = (e) => {
        setAddressDetalis([])
        if (e.target.value != '0')
            get(e.target.value);
    }
    const get = async (id) => {
        setLoading(true)
        await dispatch(getOneUserAddress(id))
        setLoading(false)
    }
    // Get Address Detalis For User
    const resAddress = useSelector(state => state.userAddressesReducer.oneAddress)
    useEffect(() => {
        if (loading === false) {
            if (resAddress && resAddress.status === "success") {
                setAddressDetalis(resAddress.data)
            } else
                setAddressDetalis([])
        }
    }, [loading])
    // When User Click
    const handelCreateOrderCash = async () => {
        if (cartID === '0') {
            notify("من فضلك اضف منتجات الى العربه اولا", "warn")
            return
        }
        if (addressDetalis.length <= 0) {
            notify("من فضلك اختر عنوان اولا", "warn")
            return
        }
        setLoadingCreate(true)
        await dispatch(createOrderCash(cartID, {
            shippingAddress: {
                details: addressDetalis.alias,
                phone: addressDetalis.phone,
                city: "",
                postalCode: ""
            }
        }))
        setLoadingCreate(false)
    }
    // Get Response For Create Orser Cash
    const resOrserCash = useSelector(state => state.checkoutReducer.createOrderCash)
    useEffect(() => {
        if (loadingCreate === false) {
            if (resOrserCash && resOrserCash.status === 201) {
                notify("تم انشاء طلبك بنجاح", "success")
                setTimeout(() => {
                    navigate('/user/allorders')
                }, 1500);
            } else {
                notify("فشل فى اكمال الطلب من فضلك حاول مره اخرى", "warn")
            }
        }
    }, [loadingCreate])
    return [handelChooseAddress, addressDetalis, handelCreateOrderCash];
}
export default OrderPayCashHook;