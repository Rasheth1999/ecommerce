import Rating from '@mui/material/Rating';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbra';
import './ViewOrderList.css';

const User = styled.div``;

const Board = styled.div`
  width: 100%;
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

const ViewOrderList = () => {
  const location = useLocation();
  const [order, setOrder] = useState([]);
  const [value, setValue] = React.useState(3);
  var totalAmount = 0;

  useEffect(() => {
    const path = location.pathname.split('/')[3];
    axios
      .get('http://localhost:3001/api/vieworderlist/' + path)
      .then(res => {
        return setOrder(res.data.data);
      })
      .catch(err => {
        return err;
      });
  }, [location.pathname]);

  return (
    <div>
      <Announcement />
      <Navbar />
      <br />
      <h1 style={{ textAlign: 'center', fontWeight: 700 }}>VIEW ORDER</h1>
      <div className='gallery'>
        {order != null ? (
          order.map((products, i) => {
            return (
              <div className='content' key={products.userid}>
                <img src={products.img} alt='' className='img' />
                <h3>{products.title}</h3>
                <p className='p'>{products.desc}</p>
                <h6>$ {products.price}</h6>
                <Rating
                  name='simple-controlled'
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </div>
            );
          })
        ) : (
          <div className='content'>
            <img src='' alt='' className='img' />
            <p></p>
            <h6>$ </h6>
            <Rating
              name='simple-controlled'
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
        )}
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

              {order.map(product => {
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
              })}
              <TableRow>
                <TableBodyTd>
                  <HeaderFive style={GrandTotal}>Status</HeaderFive>
                </TableBodyTd>

                <TableBodyTd>
                  <HeaderFive style={GrandTotal}>Delivery Soon</HeaderFive>
                </TableBodyTd>
              </TableRow>
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
        <Link to='/'>
          <button className='button'>CONTINUE SHOPPING</button>
        </Link>
      </div>
    </div>
  );
};

export default ViewOrderList;
