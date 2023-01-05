import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeOrderDeliver, changeOrderPay } from '../../redux/actions/ordersAction';
import notify from '../useNotifaction';

const ChangeOrderStatusHook = (id) => {
    const [loading, setLoading] = useState(true);
    const [loadingDeliver, setLoadingDeliver] = useState(true);
    const [pay, setPay] = useState(0);
    const [deliver, setDeliver] = useState(0);
    const dispatch = useDispatch()
    const changePayOrder = async () => {
        if (pay === 'true') {
            console.log(pay)
            setLoading(true)
            await dispatch(changeOrderPay(id))
            setLoading(false)
        } else if (pay === '0') {
            console.log('من فضلك اختر قيمة')
        }
    }

    const changeDeliverOrder = async () => {
        if (deliver === 'true') {
            setLoadingDeliver(true)
            await dispatch(changeOrderDeliver(id))
            setLoadingDeliver(false)
        } else if (deliver === '0') {
            console.log('من فضلك اختر قيمة')
        }
    }
    // Get Order Pay Change
    const resOneOrder = useSelector(state => state.orderReducer.changePay)
    useEffect(() => {
        if (loading === false) {
            if (resOneOrder && resOneOrder.status === 200) {
                notify("تم تغير حالة الدفع بنجاح", "success")
                setTimeout(() => {
                    window.location.reload(false)
                }, 1000);
            } else {
                notify("هناك مشكله فى عملية التغير", "error")
            }
            console.log(resOneOrder)
        }
    }, [loading])
    // Get Order Deliver Change
    const resDeliverOrder = useSelector(state => state.orderReducer.changeDeliver)
    useEffect(() => {
        if (loadingDeliver === false) {
            if (resDeliverOrder && resDeliverOrder.status === 200) {
                notify("تم تغير حالة التوصيل بنجاح", "success")
                setTimeout(() => {
                    window.location.reload(false)
                }, 1000);
            } else {
                notify("هناك مشكله فى عملية التغير", "error")
            }
            console.log(resDeliverOrder)
        }
    }, [loadingDeliver])

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
    const onChangePaid = (e) => {
        setPay(e.target.value)
    }
    const onChangeDeliver = (e) => {
        setDeliver(e.target.value)
    }
    return [formatDate, onChangePaid, changePayOrder, onChangeDeliver, changeDeliverOrder];
}
export default ChangeOrderStatusHook;