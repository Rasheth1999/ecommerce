import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const User = styled.div`
  flex: 6;
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Board = styled.div`
  width: 95%;
  margin: 30px 0 30px 30px;
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

const TopButton = styled.button`
  padding: 15px 15px;
  margin-right: 30px;
  border: none;
  border-radius: 10px;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Filter = styled.div`
  margin: 20px;
  margin-left: 87em;
`;

const LinkItem = { textDecoration: 'none', fontSize: ' 15px', color: '#554cd1', fontWeight: 600, display: 'flex', marginLeft: '5px' };

const Checkout = () => {
  const [first, setfirst] = useState();

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/viewUser')
      .then(res => {
        setfirst(res.data.data);
      })
      .catch(err => {
        return err;
      });
  }, []);

  return (
    <User>
      <h1 style={{ position: 'absolute', top: '3.5em', left: '10.5em' }}>USER LIST</h1>
      <Filter title='Add new user'>
        <Link to='/newuser'>
          <TopButton>ADD NEW USER</TopButton>
        </Link>
      </Filter>
      <Board>
        <Table width='100%'>
          <Thead>
            <TableRow>
              <TableData>ID</TableData>
              <TableData>Firstname</TableData>
              <TableData>Lastname</TableData>
              <TableData>Username</TableData>
              <TableData>Email</TableData>
              <TableData>Status</TableData>
              <TableData>Created Date</TableData>
              <TableData>Action</TableData>
            </TableRow>
          </Thead>

          {first != null ? (
            first.map((users, i) => {
              const createdDate = users.created_at != null ? users.created_at.split('T')[0].split('-').reverse().join('-') : users.created_at;
              return (
                <TableBody key={users.id}>
                  <TableRow>
                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>{users.id}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>{users.first_name}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>{users.last_name}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>{users.user_name}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <HeaderFive style={{ display: 'flex' }}>{users.email}</HeaderFive>
                    </TableBodyTd>

                    <TableBodyTd>
                      <Active>Active</Active>
                    </TableBodyTd>

                    <TableBodyTd>
                      <Paragraph style={{ display: 'flex' }}>{createdDate}</Paragraph>
                    </TableBodyTd>

                    <TableBodyTd>
                      <Link to={`/user/${users.id}`} style={LinkItem}>
                        Edit
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
                  <HeaderFive style={{ display: 'flex' }}></HeaderFive>
                </TableBodyTd>

                <TableBodyTd>
                  <HeaderFive style={{ display: 'flex' }}></HeaderFive>
                </TableBodyTd>

                <TableBodyTd>
                  <Active>Active</Active>
                </TableBodyTd>

                <TableBodyTd>
                  <Paragraph style={{ display: 'flex' }}></Paragraph>
                </TableBodyTd>

                <TableBodyTd>
                  <Link to='' style={LinkItem}>
                    Edit
                  </Link>
                </TableBodyTd>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </Board>
    </User>
  );
};

export default Checkout;
