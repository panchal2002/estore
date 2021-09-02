import { firestore } from '../../firebase/utils';

export const handleSaveOrder = order => {
    console.log(order)
    return new Promise((resolve, reject) => {
        firestore
            .collection('orders')
            .doc()
            .set(order)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const handleGetUserOrderHistory = (payload) => {
    return new Promise((resolve, reject) => {
        if (!payload.isAdmin) {
            let ref = firestore.collection('orders').orderBy('orderCreatedDate', 'desc');
            // console.log(ref)
            ref = ref.where('orderUserID', '==', payload.uid);

            ref
                .get()
                .then(snap => {
                    const data = [
                        ...snap.docs.map(doc => {
                            return {
                                ...doc.data(),
                                documentID: doc.id
                            }
                        })
                    ];

                    resolve({ data });
                })
                .catch(err => {
                    reject(err);
                });
        } else if (payload.isAdmin) {
            let ref = firestore.collection('orders').orderBy('orderCreatedDate', 'desc');
            // console.log(ref)

            ref
                .get()
                .then(snap => {
                    const data = [
                        ...snap.docs.map(doc => {
                            return {
                                ...doc.data(),
                                documentID: doc.id
                            }
                        })
                    ];

                    resolve({ data });
                })
                .catch(err => {
                    reject(err);
                });
        }


    });
};

export const handleGetOrder = orderID => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('orders')
            .doc(orderID)
            .get()
            .then(snap => {
                if (snap.exists) {
                    resolve({
                        ...snap.data(),
                        documentID: orderID
                    })
                }
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const handleUpdateOrderApprovalStatus = (payload) => {
    firestore.collection('orders').doc(payload.documentID).update({ approvalStatus: payload.approvalStatusText })
}

