import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import UserProfile from './../UserProfile';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import './styles.scss';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const VerticalNav = ({ children }) => {
    const { currentUser } = useSelector(mapState);
    const [menuActive, setMenuActive] = useState(false);

    const handleMenuActive = () => {
        setMenuActive(!menuActive);
    }
    const configUserProfile = {
        currentUser
    }

    return (
        <div className="verticalNav">

            {/* <UserProfile {...configUserProfile} /> */}

            <div className={menuActive ? "menu active" : "menu"} onChange={() => { handleMenuActive() }}>
                <UserProfile {...configUserProfile} />
                <div className="hamburgar" onClick={() => { handleMenuActive() }}>
                    {!menuActive && <FaIcons.FaBars className="icons" style={{ fontSize: "2.5rem" }} />}
                    {menuActive && <ImIcons.ImCross className="icons" style={{ fontSize: "2.5rem" }} />}
                </div>
                {children}
            </div>
        </div>
    );
}

export default VerticalNav;