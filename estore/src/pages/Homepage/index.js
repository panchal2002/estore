import React, { useState, useEffect } from 'react';
import Directory from './../../components/Directory';
import './styles.scss';
import { useSelector } from 'react-redux';
import { checkUserIsAdmin } from '../../Utils';

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const Homepage = props => {
  const { currentUser } = useSelector(mapState);
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    setIsAdmin(checkUserIsAdmin(currentUser))
  }, [currentUser])
  // console.log(currentUser)

  return (
    <section className={!currentUser ? "hideAdminHomepage" : !isAdmin ? "hideAdminHomepage" : "homepage"}>
      <Directory />
    </section>
  );
};

export default Homepage;