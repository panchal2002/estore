import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { signUpUserStart } from './../../redux/User/user.actions';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr
});

const Signup = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  // If user successfully registered then reset the form inputs and redirect user to the homepage
  useEffect(() => {
    if (currentUser) {
      reset();
      history.push('/');
    }

  }, [currentUser]);


  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }

  }, [userErr]);

  //function to reset the form input
  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };

  // To handle the form when it will be submitted
  // After clicking on submit this function will dispatch the user details to register the user
  const handleFormSubmit = event => {
    event.preventDefault();
    dispatch(signUpUserStart({
      displayName,
      email,
      password,
      confirmPassword
    }));
  }

  // Auth wrapper or form heading
  const configAuthWrapper = {
    headline: 'Registration'
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">

        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return (
                <li key={index}>
                  {err}
                </li>
              );
            })}
          </ul>
        )}

        <form onSubmit={handleFormSubmit}>

          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full name"
            handleChange={e => setDisplayName(e.target.value)}
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={e => setPassword(e.target.value)}
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={e => setConfirmPassword(e.target.value)}
          />

          <Button type="submit">
            Register
          </Button>
        </form>

        <div className="links">
          <Link to="/login">
            LogIn
          </Link>
          {` | `}
          <Link to="/recovery">
            Reset Password
          </Link>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default Signup;
