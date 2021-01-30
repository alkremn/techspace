import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../actions/authActions';
import { mainButtonColor, googleButtonColor } from '../styles/colors';
import { Input } from 'semantic-ui-react';
import { GiMicroscope } from 'react-icons/gi';
import { FcGoogle } from 'react-icons/fc';
import Button from '../components/common/Button';
import { motion, } from 'framer-motion';

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      history.push('/dashboard');
    }
  }, [history, user]);

  const loginHandler = e => {
    e.preventDefault();
    dispatch(loginAction(email, password));
  };

  return (
    <div className='login'>
        <motion.div
          key='loginDiv'
          className='login__container'
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ scale: 0.3, opacity: 0 }}
        >
          <GiMicroscope className='login__icon' />
          <h1 className='login__header'>Tech Space</h1>
          <form className='login__form' action='/api/login' method='POST'>
            <Input
              id='email'
              value={email}
              size='huge'
              className='login__input'
              placeholder='email'
              type='email'
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              id='password'
              size='huge'
              value={password}
              className='login__input'
              placeholder='password'
              variant='outlined'
              onChange={e => setPassword(e.target.value)}
              type='password'
            />
            <Button
              color={mainButtonColor}
              type='submit'
              onClick={e => loginHandler(e)}
              loading={loading}
            >
              Log In
            </Button>
          </form>
          <div className='login__form-divider'>
            <span>or</span>
          </div>
          <form
            className='login__google-form'
            action='http://localhost:5000/api/v1/auth/google'
            method='GET'
          >
            <Button className='login__google-button' color={googleButtonColor}>
              <FcGoogle className='login__google-icon' />
              Log In With Google
            </Button>
          </form>
        </motion.div>
    </div>
  );
};

export default LoginPage;
