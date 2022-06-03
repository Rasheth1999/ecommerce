import { Add, Remove } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbra';
import { mobile } from '../responsive';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
`;

const Title = styled.h1`
  font-weight: 600;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 15px;
  border: 2px solid #1976d2;
  border-radius: 15px;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #0d6efd;
    color: white;
  }
`;

const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: '5px 15px' })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: '20px' })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 600;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.type === 'total' && '500'};
  font-size: ${props => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span`
  font-weight: 500;
`;

const SummaryItemPrice = styled.span`
  font-weight: 500;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: 2px solid #1976d2;
  border-radius: 15px;
  background-color: white;
  font-weight: 500;

  &:hover {
    background-color: #0d6efd;
    color: white;
  }
`;

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const [cartItem, setCartItem] = useState([]);
  const remember = JSON.parse(localStorage.getItem('addedtocart'));
  const checkLoginUser = JSON.parse(localStorage.getItem('login'));
  let totalAmount = 0;

  useEffect(() => {
    const remember = JSON.parse(localStorage.getItem('addedtocart'));
    setCartItem(remember);
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    if (checkLoginUser === null) {
      const message = 'Please Login';
      NotificationManager.info(message);
    } else if (remember === null || remember.length === 0) {
      const message = 'Please Order';
      NotificationManager.info(message);
    } else {
      navigate('/checkout');
    }
  };

  const handleQuantity = type => {
    if (type === 'desc') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleDelete = () => {
    const removeItems = JSON.parse(localStorage.getItem('addedtocart'));
    removeItems.splice(0, 1);
    localStorage.setItem('addedtocart', JSON.stringify(removeItems));
    setCartItem(removeItems);
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <NotificationContainer />
      <Wrapper>
        <Title>MY ORDER</Title>
        <Top>
          <Link to='/'>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Items</TopText>
            <TopText>Your Wishlist</TopText>
          </TopTexts>
          <TopButton type='filled'>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {remember != null ? (
              cartItem.map(product => {
                totalAmount += product.price * product.quantity;
                return (
                  <Product key={product.id}>
                    <ProductDetail>
                      <Image src={product.img} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.title}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product.id}
                        </ProductId>
                        <ProductColor color={product.color} />
                        <ProductSize>
                          <b>Ram:</b> {product.ram}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Add onClick={() => handleQuantity('inc')} />
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <Remove onClick={() => handleQuantity('desc')} />
                      </ProductAmountContainer>
                      <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                      <br />
                      <TopButton type='filled' onClick={handleDelete}>
                        REMOVE
                      </TopButton>
                    </PriceDetail>
                  </Product>
                );
              })
            ) : (
              <Product>
                <ProductDetail>
                  <Image />
                  <Details>
                    <ProductName>
                      <b>Product:</b>
                    </ProductName>
                    <ProductId>
                      <b>ID:</b>
                    </ProductId>
                    <ProductColor />
                    <ProductSize>
                      <b>Ram:</b>
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount></ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>$ </ProductPrice>
                  <br />
                  <TopButton type='filled'>REMOVE</TopButton>
                </PriceDetail>
              </Product>
            )}

            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {totalAmount}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type='total'>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {totalAmount}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={handleClick}>PLACE ORDER</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
