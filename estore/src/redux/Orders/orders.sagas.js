import ordersTypes from './orders.types';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
    handleSaveOrder, handleGetUserOrderHistory,
    handleGetOrder, handleUpdateOrderApprovalStatus
} from './orders.helpers';
import { auth } from '../../firebase/utils';
import { clearCart } from '../Cart/cart.actions';
import { setUserOrderHistory, setOrderDetails } from './orders.actions';

export function* getUserOrderHistory({ payload }) {
    try {
        const history = yield handleGetUserOrderHistory(payload);
        yield put(
            setUserOrderHistory(history)
        );

    } catch (err) {
        console.log(err);
    }
}

export function* onGetUserOrderHistoryStart() {
    yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY_START, getUserOrderHistory);
};

export function* updateOrderApprovalStatus({ payload }) {
    // console.log(payload)
    try {
        yield handleUpdateOrderApprovalStatus(payload);
    } catch (err) {
        console.log(err);
        console.log(payload)
    }
}

export function* onUpdateOrderApprovalStatusStart() {
    yield takeLatest(ordersTypes.UPDATE_ORDER_APPROVAL_STATUS, updateOrderApprovalStatus);
}

export function* saveOrder({ payload }) {
    try {
        const timestamps = new Date();
        yield handleSaveOrder({
            ...payload,
            orderUserID: auth.currentUser.uid,
            orderCreatedDate: timestamps,
            orderUserEmail: auth.currentUser.email
        });
        yield put(
            clearCart()
        )

    } catch (err) {
        // console.log(err);
    }
};

export function* onSaveOrderHistoryStart() {
    yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
};

export function* getOrderDetails({ payload }) {
    try {
        const order = yield handleGetOrder(payload);
        console.log(order)
        yield put(
            setOrderDetails(order)
        )

    } catch (err) {
        // console.log(err);
    }
}

export function* onGetOrderDetailsStart() {
    yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
};

export default function* ordersSagas() {
    yield all([
        call(onSaveOrderHistoryStart),
        call(onGetUserOrderHistoryStart),
        call(onGetOrderDetailsStart),
        call(onUpdateOrderApprovalStatusStart)
    ])
}