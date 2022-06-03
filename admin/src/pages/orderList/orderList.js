import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const User = styled.div`
  flex: 6;
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Board = styled.div`
  width: 97%;
  margin: 100px 0 30px 30px;
  overflow: auto;
  background: #f0f0ff;
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
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 600;
  background: #bbbaba;
  text-align: start;
  padding: 15px;
`;

const TableBody = styled.tbody``;

const TableBodyTd = styled.td`
  padding: 15px 15px;
`;

const HeaderFive = styled.h5`
  font-weight: 600;
  font-size: 14px;
`;

const Paragraph = styled.p`
  font-weight: 600;
  font-size: 15px;
  margin-left: 4px;
`;

const Active = styled.p`
  background: #d7fada;
  padding: 2px 10px;
  display: inline;
  border-radius: 40px;
  color: #2b2b2b;
`;

const OrderList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/overAllOrderList')
      .then(res => {
        return setProducts(res.data.data);
      })
      .catch(err => {
        return err;
      });
  }, []);
  return (
    <User>
      <h1 style={{ position: 'absolute', top: '3.5em', left: '10.5em' }}>ORDER LIST</h1>
      <Board>
        <Table width='100%'>
          <Thead>
            <TableRow>
              <TableData>ID</TableData>
              <TableData>Username</TableData>
              <TableData>Email</TableData>
              <TableData>Phonenumber</TableData>
              <TableData>Address</TableData>
              <TableData>City</TableData>
              <TableData>State</TableData>
              <TableData>Zipcode</TableData>
              <TableData>Orderdate</TableData>
              <TableData>Product</TableData>
              <TableData>Price</TableData>
              <TableData>Status</TableData>
            </TableRow>
          </Thead>

          {products != null ? (
            products.map((products, i) => {
              const orderDate = products.created_at != null ? products.created_at.split('T')[0].split('-').reverse().join('-') : products.created_at;
              return (
                <TableBody key={products.id}>
                  <TableRow>
                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>{products.id}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>{products.username}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>{products.email}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>{products.phonenumber}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>{products.address}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>{products.city}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>{products.state}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>{products.zipcode}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <Paragraph style={{ display: 'flex' }}>{orderDate}</Paragraph>
                    </TableBodyTd>

                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>{products.total_product}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>${products.order_total}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <Active>Pending</Active>
                    </TableBodyTd>
                  </TableRow>
                </TableBody>
              );
            })
          ) : (
            <TableBody key={products.id}>
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
                  <HeaderFive style={{ display: 'flex' }}></HeaderFive>
                </TableBodyTd>

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
                  <HeaderFive style={{ display: 'flex' }}></HeaderFive>
                </TableBodyTd>

                <TableBodyTd>
                  <Paragraph style={{ display: 'flex' }}></Paragraph>
                </TableBodyTd>

                <TableBodyTd>
                  <HeaderFive style={{ display: 'flex' }}></HeaderFive>
                </TableBodyTd>

                <TableBodyTd>
                  <HeaderFive style={{ display: 'flex' }}></HeaderFive>
                </TableBodyTd>

                <TableBodyTd>
                  <Active>Pending</Active>
                </TableBodyTd>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </Board>
    </User>
  );
};

export default OrderList;
