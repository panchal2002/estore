import { auth, firestore } from './../../firebase/utils';

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: 'http://localhost:3000/login'
  };

  return new Promise((resolve, reject) => {
    auth.sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ['Email not found. Please try again.'];
        reject(err);
      });
  });
};

export const handleEditUserProfile = (payload) => {
  // console.log(payload.currentUser, payload.userName, payload.phone)
  firestore.collection('users').doc(payload.currentUser.id).update({ displayName: payload.userName, phone: payload.phone, profileImage: payload.profileImageUrl })
}