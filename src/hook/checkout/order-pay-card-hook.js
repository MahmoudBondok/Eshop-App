import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import notify from '../useNotifaction';
import { createOrderCARD } from '../../redux/actions/checkoutAction';
import GetAllUserCartHook from './../cart/get-all-user-cart-hook';

const OrderPayCardHook = (addressDetalis) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const [, , , , , cartID] = GetAllUserCartHook();

    // When User Click
    const handelCreateOrderCARD = async () => {
        if (cartID === '0') {
            notify("من فضلك اضف منتجات الى العربه اولا", "warn")
            return
        }
        if (addressDetalis.length <= 0) {
            notify("من فضلك اختر عنوان اولا", "warn")
            return
        }
        setLoading(true)
        await dispatch(createOrderCARD(cartID, {
            shippingAddress: {
                details: addressDetalis.alias,
                phone: addressDetalis.phone,
                city: "",
                postalCode: ""
            }
        }))
        setLoading(false)
    }
    // Get Response For Create Order Card
    const resOrderCard = useSelector(state => state.checkoutReducer.createOrderCard)
    useEffect(() => {
        if (loading === false) {
            if (resOrderCard && resOrderCard.status === "success") {
                notify("تم انشاء طلبك بنجاح", "success")
                console.log(resOrderCard.session.url)
                if (resOrderCard.session.url) {
                    window.open(resOrderCard.session.url)
                }
            } else {
                notify("فشل فى اكمال الطلب من فضلك حاول مره اخرى", "warn")
            }
        }
    }, [loading])
    return [handelCreateOrderCARD];
}
export default OrderPayCardHook;