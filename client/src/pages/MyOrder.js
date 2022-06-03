import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbra';

const User = styled.div``;

const Board = styled.div`
  width: 80%;
  margin: 30px 50px 30px 200px;
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

const Active = styled.p`
  background: #1976d2;
  text-transform: capitalize;
  padding: 2px 10px;
  display: inline;
  border-radius: 40px;
  color: white;
`;

const Title = styled.h1`
  font-weight: 600;
  text-align: center;
`;

const LinkItem = { textDecoration: 'none', fontSize: ' 15px', color: '#554cd1', fontWeight: 600, display: 'flex', marginLeft: '5px' };

const MyOrder = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const loginDetails = JSON.parse(localStorage.getItem('loginDetails'));
    const path = loginDetails[0].id;
    axios
      .get('http://localhost:3001/api/getorderlist/' + path)
      .then(res => {
        return setOrder(res.data.data);
      })
      .catch(err => {
        return err;
      });
  }, []);
  return (
    <User>
      <Announcement />
      <Navbar />
      <br />
      <br />
      <Title>ORDER LIST</Title>
      <Board>
        <Table width='100%'>
          <Thead>
            <TableRow>
              <TableData>Order ID</TableData>
              <TableData>Order Date</TableData>
              <TableData>Product</TableData>
              <TableData>Total Price</TableData>
              <TableData>Status</TableData>
              <TableData>Action</TableData>
            </TableRow>
          </Thead>

          {order != null ? (
            order.map((products, i) => {
              var orderId,
                orderTotal = 0,
                orderTotalCount = 0,
                orderDate = '',
                orderStatus = '';
              products.forEach(product => {
                orderId = product.orderid;
                orderTotal += product.total;
                orderTotalCount += 1;
                orderDate = product.orderdate != null ? product.orderdate.split('T')[0].split('-').reverse().join('-') : product.orderdate;
                orderStatus = product.status;
              });
              return (
                <TableBody key={orderId}>
                  <TableRow>
                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>{orderId}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>{orderDate}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>{orderTotalCount}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>${orderTotal}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <Active>{orderStatus}</Active>
                    </TableBodyTd>

                    <TableBodyTd>
                      <Link to={`vieworder/${orderId}`} style={LinkItem}>
                        View
                      </Link>
                    </TableBodyTd>
                  </TableRow>
                </TableBody>
              );
            })
          ) : (
            <TableBody>
              <TableRow>
                <TableBodyTd>
                  <HeaderFive style={{ display: 'flex' }}></HeaderFive>
                </TableBodyTd>

                <TableBodyTd>
                  <HeaderFive style={{ display: 'flex' }}></HeaderFive>
                </TableBodyTd>

                <TableBodyTd>
                  <HeaderFive style={{ display: 'flex' }}></HeaderFive>
                </TableBodyTd>

                <TableBodyTd>
                  <HeaderFive style={{ display: 'flex' }}>$</HeaderFive>
                </TableBodyTd>

                <TableBodyTd>
                  <Active></Active>
                </TableBodyTd>

                <TableBodyTd>
                  <Link to='' style={LinkItem}>
                    View
                  </Link>
                </TableBodyTd>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </Board>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </User>
  );
};

export default MyOrder;
