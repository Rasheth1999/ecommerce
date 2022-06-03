import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1976d2;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const WhiteButton = styled.button`
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

const GreenButton = styled.button`
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
  cursor: pointer;
`;

const Right = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Title = styled.h1`
  font-size: 25px;
  margin-top: 0;
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
  margin: 5px 0;
  font-size: 14px;
`;

const Register = () => {
  const initialValues = { firstname: '', lastname: '', username: '', email: '', password: '', confirmPassword: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const error = {};
    setFormErrors(error);
    setIsSubmit(true);
    if (Object.keys(error).length === 0) {
      await axios
        .post('http://localhost:3001/api/register', formValues)
        .then(response => {
          if (response.data.status === 'FAILED') {
            const message = response.data.data;
            for (var key of Object.keys(message)) {
              NotificationManager.error(message[key]);
            }
          } else {
            Swal.fire('Good job!', 'You Register is Success!', 'success');
            return navigate('/login');
          }
        })
        .catch(err => {
          return err;
        });
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors, isSubmit]);

  return (
    <Container>
      <Wrapper>
        <Left className='left'>
          <h1 style={{ color: 'white' }}>Welcome Back</h1>
          <Link to='/login'>
            <WhiteButton type='button'>Sign in</WhiteButton>
          </Link>
        </Left>
        <Right>
          <Form onSubmit={handleSubmit}>
            <Title>SIGN UP</Title>
            <Input name='firstname' placeholder='First Name' value={formValues.firstname} onChange={handleChange} required />
            <Input name='lastname' placeholder='Last Name' value={formValues.lastname} onChange={handleChange} />
            <Input name='username' placeholder='User Name' value={formValues.username} onChange={handleChange} required />
            <Input name='email' placeholder='Email' value={formValues.email} onChange={handleChange} required />
            <Input name='password' type='password' placeholder='Password' value={formValues.password} onChange={handleChange} required />
            <Input name='confirmPassword' type='password' placeholder='Confirm Password' value={formValues.confirmPassword} onChange={handleChange} required />
            <GreenButton>REGISTER</GreenButton>
          </Form>
        </Right>
        <NotificationContainer />
      </Wrapper>
    </Container>
  );
};

export default Register;
