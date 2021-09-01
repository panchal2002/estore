
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrderHistory } from '../../../redux/Orders/orders.actions';
import ManageOrderHistory from '../ManageOrderHistory'
import './styles.scss';

const mapState = ({ user, ordersData }) => ({
    currentUser: user.currentUser,
    orderHistory: ordersData.orderHistory.data
});

const Dashboard = props => {
    const dispatch = useDispatch();
    const { currentUser, orderHistory } = useSelector(mapState);

    // console.log(currentUser)
    const configManageOrder = {
        uid: currentUser.id,
        isAdmin: true
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

            <ManageOrderHistory orders={orderHistory} />
        </div>
    );
};

export default Dashboard;