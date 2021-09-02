import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import Button from '../forms/Button';
import FormInput from '../forms/FormInput';
import user from '../../assets/user.png'
import Modal from '../Modal';
import './styles.scss'
import { editUserProfile } from '../../redux/User/user.actions';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})
const EditAccount = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState)
    const [hideModal, setHideModal] = useState(true);
    const [userName, setUserName] = useState(currentUser.displayName)
    const [phone, setPhone] = useState(currentUser.phone)
    const [profileImage, setProfileImage] = useState("")
    const toggleModal = () => setHideModal(!hideModal);

    const configModal = {
        hideModal,
        toggleModal
    };

    const handleProfileImageChange = (files) => {
        setProfileImage(files)
    }

    async function handleProfileImageSave() {
        let bucketName = 'images';
        if (profileImage != "") {
            let file = profileImage[0];
            let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
            await storageRef.put(file);
        }
        let fileName = profileImage == "" ? "user.png" : profileImage[0].name;
        // console.log(profileImage, fileName)
        let firebaseStorageRef = firebase.storage().ref();
        let spaceRef = firebaseStorageRef.child(`images/${fileName}`);
        let piu = '';
        await spaceRef.getDownloadURL().then((url) => {
            piu = url;
        })

        return piu


    }

    const resetForm = () => {
        setHideModal(true);
        setUserName(currentUser.displayName);
        setPhone(currentUser.phone);
    };

    const handleSubmit = e => {

        e.preventDefault();
        handleProfileImageSave().then((piu) => {
            // console.log(piu);
            let profileImageUrl = piu.toString();
            const userCredentials = {
                userName,
                phone,
                profileImageUrl,
                currentUser
            }

            // console.log(userCredentials);
            dispatch(
                editUserProfile(userCredentials)
            );
            resetForm();
        })
    };
    return (
        <div className="accountSettings">
            <Modal {...configModal}>
                <div className="addNewProductForm">
                    <form onSubmit={handleSubmit}>

                        <h2>
                            Edit Profile
                        </h2>

                        <FormInput
                            label="Profile Image"
                            type="file"
                            handleChange={e => handleProfileImageChange(e.target.files)}
                        />

                        <FormInput
                            label="Display Name"
                            type="text"
                            value={userName}
                            handleChange={e => setUserName(e.target.value)}
                        />

                        <FormInput
                            label="Phone"
                            type="text"
                            value={phone}
                            handleChange={e => setPhone(e.target.value)}
                        />

                        <br />

                        <Button type="submit">
                            Save Changes
                        </Button>

                    </form>
                </div>
            </Modal>

            <h1>Account Settings</h1>
            <div className="profile">
                <div className="userProfileImage">
                    <img src={currentUser.profileImage}></img>
                </div>
                <div className="profileContent">
                    <div className="userProfileName">
                        <h2>Display Name: - </h2>
                        <h3> {currentUser.displayName}</h3>
                    </div>
                    <div className="userProfileEmail">
                        <h2>Email: -</h2>
                        <h3> {currentUser.email}</h3>
                    </div>
                    <div className="userProfilePhone">
                        <h2>Phone Number: -</h2>
                        <h3> {currentUser.phone}</h3>
                    </div>
                </div>
            </div>
            <div className="editProfileBtn">
                <Button onClick={() => toggleModal()}> Edit Profile</Button>
            </div>
        </div >
    )
}

export default EditAccount;
