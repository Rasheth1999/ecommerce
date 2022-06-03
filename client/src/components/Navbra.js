import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Containers = styled.div`
  height: 70px;
  ${mobile({ height: '50px' })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '10px 0px' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  color: #1976d2;
  ${mobile({ display: 'none' })};
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  cursor: pointer;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: '50px' })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '24px' })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;

const Navbra = props => {
  const [quantity, setQuantity] = useState([]);
  const addCart = JSON.parse(localStorage.getItem('addedtocart'));
  const remember = JSON.parse(localStorage.getItem('login'));
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/');
  };

  const profileHandler = () => {
    navigate('/profile');
  };

  const viewMyOrder = () => {
    if (remember === null) {
      const message = 'Please Login';
      NotificationManager.info(message);
    } else {
      navigate('/myorder');
    }
  };

  useEffect(() => {
    const cartNumber = addCart != null ? addCart.length : 0;
    setQuantity(cartNumber);
  }, [addCart, quantity]);

  return (
    <div>
      <Containers>
        <NotificationContainer />
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input placeholder='Search' />
              <SearchIcon style={{ color: '#1976d2', fontSize: 16 }} />
            </SearchContainer>
          </Left>
          <Center>
            <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
              <Logo>MOBILE SHOWROOM.</Logo>
            </Link>
          </Center>
          <Right>
            <Link to='/cart' style={{ color: 'black' }} title='Goto Cart'>
              <MenuItem>
                <Badge badgeContent={quantity} style={{ color: '#1976d2' }} color='primary'>
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </MenuItem>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <FormatListBulletedRoundedIcon onClick={viewMyOrder} style={{ cursor: 'pointer', color: '#1976d2' }} />
            &nbsp;&nbsp;&nbsp;
            {remember != null ? (
              <div>
                <Dropdown style={{ backgroundColor: '#1976d2', borderRadius: '20px' }}>
                  <Dropdown.Toggle>{remember.username}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={profileHandler}>
                      <AccountCircleIcon />
                      &nbsp;&nbsp; Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={logoutHandler}>
                      <LogoutRoundedIcon />
                      &nbsp;&nbsp;Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <Link to='/login' style={{ color: 'black' }} title='Login'>
                <MenuItem>
                  <LoginTwoToneIcon style={{ color: '#1976d2' }} />
                </MenuItem>
              </Link>
            )}
          </Right>
        </Wrapper>
      </Containers>
    </div>
  );
};

export default Navbra;
