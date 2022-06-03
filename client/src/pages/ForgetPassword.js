import React from 'react';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('https://wallpaperaccess.com/full/323408.jpg') center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: '75%' })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 900;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const ForgetPassword = () => {
  return (
    <Container>
      <Wrapper>
        <Title>FORGET PASSWORD</Title>
        <Form>
          <Input placeholder='UserName' name='username' required />
          <Input placeholder='Password' name='password' type='password' required />
          <Input placeholder='Confirm Password' name='confirmPassword' type='password' required />
          <Button>UPDATE</Button>
          <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
            SIGN IN!
          </Link>
        </Form>
        <NotificationContainer />
      </Wrapper>
    </Container>
  );
};

export default ForgetPassword;
