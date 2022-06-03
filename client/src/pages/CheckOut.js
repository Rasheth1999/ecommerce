import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbra';

const User = styled.div`
  flex: 1;
`;

const Board = styled.div`
  width: 97%;
  margin: 0 50px 30px 0;
  overflow: auto;
  background: #d3e5f7;
  border-radius: 8px;
`;

const Table = styled.table`
  border-collapse: collapse;
`;

const Thead = styled.thead``;

const TableRow = styled.tr`
  border-bottom: 1px solid #eef0f3;
`;

const TableData = styled.td`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
  background: #1976d2;
  color: white;
  text-align: start;
  padding: 15px;
`;

const TableBody = styled.tbody``;

const TableBodyTd = styled.td`
  padding: 15px 15px;
`;

const HeaderFive = styled.h5`
  font-weight: 600;
  font-size: 15px;
`;

const GrandTotal = { display: 'flex', fontSize: '17px', fontWeight: 600 };

const CheckOut = () => {
  const [cartItem, setCartItem] = useState([]);
  const initialValues = { phonenumber: '', email: '', address: '', city: '', state: '', zipcode: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const remember = JSON.parse(localStorage.getItem('addedtocart'));
  const loginDetails = JSON.parse(localStorage.getItem('loginDetails'));
  const addToCart = JSON.parse(localStorage.getItem('addedtocart'));
  const cartArray = [];
  addToCart.map(e => {
    e.productid = e.id;
    delete e.id;
    return cartArray.push(e);
  });

  let totalAmount = 0;

  const navigate = useNavigate();

  useEffect(() => {
    const remember = JSON.parse(localStorage.getItem('addedtocart'));
    setCartItem(remember);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const finalValues = validate(formValues);
    if (Object.keys(finalValues).length === 0) {
      await axios
        .post('http://localhost:3001/api/orderdetails', { loginDetails, formValues, cartArray })
        .then(res => {
          if (res.data.status === 'SUCCESS') {
            localStorage.removeItem('addedtocart');
            Swal.fire('Good job!', 'Your Order Successful!', 'success');
            return navigate('/');
          } else {
            const message = 'Something went Wrong';
            NotificationManager.error(message);
          }
        })
        .catch(err => {
          return err;
        });
    }
  };

  const validate = value => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPhone = /^[0-9]{10}$/;
    if (!value.phonenumber) {
      const message = (errors.phonenumber = 'Please enter phonenumber');
      NotificationManager.error(message);
    } else if (!regexPhone.test(value.phonenumber)) {
      const message = (errors.phonenumber = 'Please enter valid phonenumber');
      NotificationManager.error(message);
    }
    if (!value.email) {
      const message = (errors.email = 'Please enter email');
      NotificationManager.error(message);
    } else if (!regex.test(value.email)) {
      const message = (errors.email = 'Please enter valid email');
      NotificationManager.error(message);
    }
    if (!value.address) {
      const message = (errors.address = 'Please enter address');
      NotificationManager.error(message);
    }
    if (!value.city) {
      const message = (errors.city = 'Please enter city');
      NotificationManager.error(message);
    }
    if (!value.state) {
      const message = (errors.state = 'Please enter state');
      NotificationManager.error(message);
    }
    if (!value.zipcode) {
      const message = (errors.zipcode = 'Please enter zipcode');
      NotificationManager.error(message);
    }
    return errors;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <Announcement />
      <Navbar />
      <NotificationContainer />
      <br />
      <div>
        <div>
          <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>PLACE ORDER</h3>
        </div>
      </div>

      <div className='py-4'>
        <form>
          <div style={{ paddingLeft: '50px' }}>
            <div className='row'>
              <div className='col-md-7'>
                <div className='card'>
                  <div className='card-header'>
                    <h4 className='fw-bolder'>ADDRESS DETAILS</h4>
                  </div>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='form-group mb-3'>
                          <label className='form-label'>Phone Number</label>
                          <input type='text' name='phonenumber' className='form-control' value={formValues.phonenumber} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='form-group mb-3'>
                          <label className='form-label'>Email Address</label>
                          <div className='input-group'>
                            <span className='input-group-text'>@</span>
                            <input type='email' name='email' className='form-control' value={formValues.email} onChange={handleChange} required />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-12'>
                        <div className='form-group mb-3'>
                          <label className='form-label'>Full Address</label>
                          <input type='text' name='address' className='form-control' value={formValues.address} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <div className='form-group mb-3'>
                          <label className='form-label'>City</label>
                          <input type='text' name='city' className='form-control' value={formValues.city} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <div className='form-group mb-3'>
                          <label className='form-label'>State</label>
                          <input type='text' name='state' className='form-control' value={formValues.state} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <div className='form-group mb-3'>
                          <label className='form-label'>Zip Code</label>
                          <input type='text' name='zipcode' className='form-control' value={formValues.zipcode} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className='form-check mx-3'>
                        <input type='checkbox' className='form-check-input' id='same-address' />
                        <label className='form-check-label'>Remember me</label>
                      </div>
                      <div className='col-md-12'>
                        <div className='form-group text-end'>
                          <button type='button' className='btn btn-primary' onClick={handleSubmit}>
                            PLACE ORDER
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <User>
                <Board>
                  <Table width='100%'>
                    <Thead>
                      <TableRow>
                        <TableData>Productname</TableData>
                        <TableData>Price</TableData>
                        <TableData>Quanity</TableData>
                        <TableData>Total</TableData>
                      </TableRow>
                    </Thead>

                    {remember != null ? (
                      cartItem.map(product => {
                        totalAmount += product.price * product.quantity;
                        return (
                          <TableBody key={product.id}>
                            <TableRow>
                              <TableBodyTd>
                                <HeaderFive>{product.title}</HeaderFive>
                              </TableBodyTd>

                              <TableBodyTd>
                                <HeaderFive>${product.price}</HeaderFive>
                              </TableBodyTd>

                              <TableBodyTd>
                                <HeaderFive>{product.quantity}</HeaderFive>
                              </TableBodyTd>

                              <TableBodyTd>
                                <HeaderFive>${product.price * product.quantity}</HeaderFive>
                              </TableBodyTd>
                            </TableRow>
                          </TableBody>
                        );
                      })
                    ) : (
                      <TableBody>
                        <TableRow>
                          <TableBodyTd>
                            <HeaderFive></HeaderFive>
                          </TableBodyTd>

                          <TableBodyTd>
                            <HeaderFive>$</HeaderFive>
                          </TableBodyTd>

                          <TableBodyTd>
                            <HeaderFive></HeaderFive>
                          </TableBodyTd>

                          <TableBodyTd>
                            <HeaderFive>$</HeaderFive>
                          </TableBodyTd>
                        </TableRow>
                      </TableBody>
                    )}
                    <TableRow>
                      <TableBodyTd>
                        <HeaderFive style={GrandTotal}>Grand Total</HeaderFive>
                      </TableBodyTd>

                      <TableBodyTd>
                        <HeaderFive style={GrandTotal}>${totalAmount}</HeaderFive>
                      </TableBodyTd>
                    </TableRow>
                  </Table>
                </Board>
              </User>
            </div>
          </div>
        </form>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default CheckOut;
