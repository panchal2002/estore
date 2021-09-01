import React from 'react';
import {
    TableContainer, Table, TableHead,
    TableRow, TableBody, TableCell
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateOrderApprovalStatus } from '../../redux/Orders/orders.actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../forms/Button';

const columns = [
    {
        id: 'orderCreatedDate',
        lable: 'Order Date'
    },
    {
        id: 'documentID',
        lable: 'Order ID'
    },
    {
        id: 'orderTotal',
        lable: 'Amount'
    },
    {
        id: 'approvalAction',
        lable: ''
    }
];

const styles = {
    fontSize: '16px',
    cursor: 'pointer',
    width: '10%'
};


const OrderHistory = ({ orders }) => {
    const history = useHistory();
    const dispatch = useDispatch();


    const handleApprovalCancelAction = (documentID, approvalStatusText) => {
        // console.log(approvalStatusText)
        const configApprovalStatus = {
            documentID: documentID,
            approvalStatusText: approvalStatusText
        }
        dispatch(
            updateOrderApprovalStatus(configApprovalStatus)
        );
        toast.success("Refresh the page to save changes!");

    }

    const approvedStyle = {
        position: 'absolute',
        top: '0',
        fontSize: '.9rem',
        background: '#5cb85c',
        color: 'white',
        padding: '0 3px',
        borderRadius: '10px',
    }

    const canceledStyle = {
        position: 'absolute',
        top: '0',
        fontSize: '.9rem',
        background: '#ff0000ad',
        color: 'white',
        padding: '0 3px',
        borderRadius: '10px',

    }

    const deliveredStyle = {
        position: 'absolute',
        top: '0',
        fontSize: '.9rem',
        background: 'orange',
        color: 'white',
        padding: '0 3px',
        borderRadius: '10px',
    }

    function toDateTime(secs) {
        var t = new Date(secs * 1000); // Epoch
        return t.toLocaleString();
    }

    const formatText = (columnName, columnValue, approvalStatusValue) => {
        switch (columnName) {
            case 'orderTotal':
                return `₹${columnValue}`;
            case 'orderCreatedDate':
                return <div style={{ position: "relative" }}>{toDateTime(columnValue.seconds).split(",")[0]} <span style={approvalStatusValue == 'Approved' ? approvedStyle : approvalStatusValue == 'Delivered' ? deliveredStyle : canceledStyle}>{approvalStatusValue}</span></div>
            default:
                return columnValue;
        }
    };

    return (
        <>
            <ToastContainer position="top-center" fontSize="1.4rem" autoClose={10000} style={{ fontSize: "1.4rem" }} />
            <TableContainer>
                <Table>

                    <TableHead>
                        <TableRow>
                            {columns.map((column, pos) => {
                                const { lable } = column;

                                return (
                                    <TableCell
                                        key={pos}
                                        style={styles}
                                    >
                                        {lable}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {(Array.isArray(orders) && orders.length > 0) && orders.map((row, pos) => {
                            const { documentID } = row;

                            return (
                                <TableRow
                                    key={pos}
                                >

                                    {columns.map((column, pos) => {
                                        const columnName = column.id;
                                        const columnValue = row[columnName];
                                        const approvalStatusValue = row['approvalStatus'];
                                        const formattedText = formatText(columnName, columnValue, approvalStatusValue);
                                        if (columnName != 'approvalAction') {
                                            return (
                                                <TableCell
                                                    key={pos}
                                                    style={styles}
                                                    onClick={() => history.push(`/order/${documentID}`)}
                                                >
                                                    {formattedText}
                                                </TableCell>
                                            )
                                        } else {

                                            return (
                                                <TableCell
                                                    key={pos}
                                                    style={styles}
                                                >
                                                    <Button onClick={() => handleApprovalCancelAction(documentID, 'Canceled')}>Cancel</Button>
                                                </TableCell>
                                            )
                                        }
                                    })}

                                </TableRow>
                            )
                        })}

                    </TableBody>

                </Table>
            </TableContainer>
        </>
    )
}

export default OrderHistory;