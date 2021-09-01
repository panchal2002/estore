
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrderHistory } from './../../redux/Orders/orders.actions';
import OrderHistory from './../../components/OrderHistory';
import './styles.scss';

const mapState = ({ user, ordersData }) => ({
    currentUser: user.currentUser,
    orderHistory: ordersData.orderHistory.data
});

const Dashboard = props => {
    const dispatch = useDispatch();
    const { currentUser, orderHistory } = useSelector(mapState);


    const configManageOrder = {
        uid: currentUser.id,
        isAdmin: false
    }
    useEffect(() => {
        dispatch(
            getUserOrderHistory(configManageOrder)
        );

    }, []);

    return (
        <div>
            <h1>
                Order History
            </h1>

            <OrderHistory orders={orderHistory} />
        </div>
    );
};

export default Dashboard;