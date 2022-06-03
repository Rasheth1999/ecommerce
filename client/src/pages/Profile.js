import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NotificationContainer } from 'react-notifications';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbra';
import Newsletter from '../components/Newsletter';

const Body = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  background-size: cover;
  color: #333;
  font-size: 15px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
`;

const Inner = styled.div`
  padding: 20px;
  background: #f3f6f9;
  max-width: 900px;
  margin: auto;
  display: flex;
`;

const ImageHolder = styled.div`
  width: 50%;
`;

const Form = styled.form`
  width: 50%;
  padding-top: 50px;
  padding-left: 45px;
  padding-right: 45px;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-size: 30px;
  text-align: center;
  margin-bottom: 28px;
  font-weight: 700;
`;

const FormGroup = styled.form`
  display: flex;
`;

const Input = styled.input`
  width: 50%;
  border: 1px solid #333;
  border-top: none;
  border-right: none;
  border-left: none;
  display: block;
  height: 40px;
  padding: 0;
  margin-bottom: 30px;
  background-color: #f3f6f9;
  font-size: 16px;
  &:focus {
    outline: none;
  }
  &:first-child {
    margin-right: 15px;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: 100%;
`;

const FormWrapper = styled.div`
  position: relative;
`;

const FormControl = styled.input`
  border: 1px solid #333;
  border-top: none;
  border-right: none;
  border-left: none;
  display: block;
  width: 100%;
  font-size: 16px;
  height: 40px;
  padding: 0;
  margin-bottom: 30px;
  background-color: #f3f6f9;
  &:focus {
    outline: none;
  }
`;

const Select = styled.select`
  font-size: 16px;
  font-family: arial;
  cursor: pointer;
  padding-left: 20px;
  color: gray;
  border: 1px solid #333;
  border-top: none;
  border-right: none;
  border-left: none;
  display: block;
  width: 100%;
  height: 40px;
  padding: 0;
  margin-bottom: 30px;
  background-color: #f3f6f9;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  margin-left: 7em;
  margin-top: 1.5em;
  padding: 15px 40px;
  font-size: 16px;
  border: 2px solid #1976d2;
  border-radius: 12px;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: #0d6efd;
    color: white;
  }
`;

const Profile = () => {
  const initialValues = { first_name: '', last_name: '', user_name: '', email: '' };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
  };

  useEffect(() => {
    const remember = JSON.parse(localStorage.getItem('login'));
    axios
      .post('http://localhost:3001/api/profile', { remember })
      .then(res => {
        res.data.data.map(item => {
          let profile_temp = item;
          return setFormValues(profile_temp);
        });
      })
      .catch(err => {
        return err;
      });
  }, []);

  return (
    <div>
      <Announcement />
      <Navbar />
      <br />
      <br />
      <br />
      <Body>
        <Wrapper>
          <Inner>
            <ImageHolder>
              <Image src='https://w0.peakpx.com/wallpaper/260/449/HD-wallpaper-spider-man-red-note-material-black-hotel-bolt-galaxy-funny-ultra.jpg' alt='' />
            </ImageHolder>
            <Form onSubmit={handleSubmit}>
              <Title>My Profile</Title>
              <FormGroup>
                <Input type='text' placeholder='First Name' name='first_name' onChange={handleChange} value={formValues.first_name} />
                <Input type='text' placeholder='Last Name' name='last_name' onChange={handleChange} value={formValues.last_name} />
              </FormGroup>
              <FormWrapper>
                <FormControl type='text' placeholder='User Name' name='user_name' onChange={handleChange} value={formValues.user_name} />
              </FormWrapper>
              <FormWrapper>
                <FormControl type='email' placeholder='Email Address' name='email' onChange={handleChange} value={formValues.email} />
              </FormWrapper>
              <FormWrapper>
                <Select>
                  <option value='' disabled selected>
                    Gender
                  </option>
                  <option value='male'>Male</option>
                  <option value='femal'>Female</option>
                  <option value='other'>Other</option>
                </Select>
              </FormWrapper>
              <FormWrapper>
                <FormControl type='password' placeholder='Password' />
              </FormWrapper>
              <FormWrapper>
                <FormControl type='password' placeholder='Confirm Password' />
              </FormWrapper>
              <Button>UPDATE</Button>
            </Form>
            <NotificationContainer />
          </Inner>
        </Wrapper>
      </Body>
      <br />
      <br />
      <br />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Profile;
