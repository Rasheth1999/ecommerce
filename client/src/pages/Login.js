import axios from 'axios';
import React, { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f3f6f9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 900px;
  height: 500px;
  display: flex;
  border-radius: 10px;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const Title = styled.h1`
  font-size: 40px;
  margin-top: 0;
  position: absolute;
  top: 7.5em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  outline: none;
  border: none;
  width: 370px;
  padding: 15px;
  border-radius: 10px;
  background-color: #edf5f3;
  margin: 20px 0;
  font-size: 14px;
  top: 10px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  padding: 12px 0;
  background-color: #1976d2;
  color: white;
  margin: 10px;
  border-radius: 20px;
  width: 180px;
  font-weight: bold;
  font-size: 14px;
  position: absolute;
  top: 42em;
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1976d2;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const RightTitle = styled.h1`
  margin-top: 0;
  color: white;
  font-size: 40px;
  align-self: center;
`;

const ButtonWhite = styled.button`
  border: none;
  outline: none;
  padding: 12px 0;
  background-color: white;
  border-radius: 20px;
  width: 180px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
`;

const getFormValues = () => {
  const storedValues = localStorage.getItem('login');
  if (!storedValues)
    return {
      username: '',
    };
  return JSON.parse(storedValues);
};

const Login = () => {
  const initialValues = { username: '' };
  const [formValues, setFormValues] = useState(initialValues, getFormValues);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await axios
      .post('http://localhost:3001/api/login', formValues)
      .then(res => {
        localStorage.setItem('loginDetails', JSON.stringify(res.data.result));
        if (res.data.data === true) {
          Swal.fire('Good job!', 'You Successful LoggedIn!', 'success');
          localStorage.setItem('login', JSON.stringify(formValues));
          return navigate('/');
        } else {
          const message = res.data.message;
          NotificationManager.error(message);
        }
      })
      .catch(err => {
        return err;
      });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Form onSubmit={handleSubmit}>
            <Title>SIGN IN</Title>
            <Input placeholder='UserName' name='username' required onChange={handleChange} />
            <Input placeholder='Password' name='password' type='password' required onChange={handleChange} />
            <Button>LOGIN</Button>
          </Form>
        </Left>
        <RightContainer>
          <RightTitle>New User?</RightTitle>
          <Link to='/register'>
            <ButtonWhite type='button' className='white_btn'>
              Sign Up
            </ButtonWhite>
          </Link>
        </RightContainer>
        <NotificationContainer />
      </Wrapper>
    </Container>
  );
};

export default Login;
