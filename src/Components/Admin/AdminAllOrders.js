import React from 'react';
import { Row } from 'react-bootstrap';
import AdminAllOrdersItem from './AdminAllOrdersItem';
import UserGetAllOrderHook from './../../hook/user/user-get-all-order-hook';
import Pagination from '../Uitily/Pagination';

const AdminAllOrders = () => {
    const [, , paginate, orderData, onPress] = UserGetAllOrderHook();
    return (
        <div>
            <div className='admin-content-text'>ادارة جميع الطلبات</div>
            <Row className='justify-content-start'>
                {
                    orderData.length >= 1 ? (orderData.map((orderItem, index) => {
                        return <AdminAllOrdersItem key={index} orderItem={orderItem} />
                    })) : <h6>لا يوجد طلبات حتى </h6>
                }
                {
                    paginate.numberOfPages >= 2 ? (<Pagination onPress={onPress} pageCount={paginate.numberOfPages ? paginate.numberOfPages : 0} />) : null
                }
            </Row>
        </div>
    )
}
export default AdminAllOrders;