import { Add, Remove } from '@material-ui/icons';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import TwitterIcon from '@mui/icons-material/Twitter';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbra';
import Newsletter from '../components/Newsletter';
import { addProduct } from '../redux/cartRedux';

const CardWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;
`;

const ProductImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ImgDisplay = styled.div`
  overflow: hidden;
`;

const ImgShowCase = styled.div`
  display: flex;
  width: 100%;
  transition: all 0.5s ease;
`;

const Image = styled.img`
  display: block;
`;

const ProductContent = styled.div`
  padding: 2rem 1rem;
`;

const ProductTitle = styled.h2`
  font-size: 3rem;
  text-transform: capitalize;
  font-weight: 700;
  position: relative;
  color: #12263a;
  margin: 3rem 0;
`;

const ProductRating = styled.div`
  color: #ffc107;
`;

const ProductRatingSpan = styled.span`
  font-weight: 600;
  color: #252525;
  margin-left: 10px;
`;

const ProductPrice = styled.div`
  margin: 1rem 0;
  font-size: 1.3rem;
  font-weight: 700;
`;

const ProductPriceSpan = styled.span`
  color: #1976d2;
`;

const ProductDetailsTitle = styled.h2`
  text-transform: capitalize;
  color: #12263a;
`;

const ProductDetailsPara = styled.p`
  font-size: 1rem;
  padding: 0.3rem;
`;

const ProductDetailsUl = styled.ul`
  margin: 1rem 0;
  font-size: 0.9rem;
`;

const ProductDetailsLi = styled.li`
  margin: 0;
  list-style: none;
  background: url(https://raw.githubusercontent.com/prabinmagar/product-detail-card-slider/master/shoes_images/checked.png) left center no-repeat;
  background-size: 18px;
  padding-left: 1.7rem;
  margin: 0.4rem 0;
  font-weight: 600;
  opacity: 0.9;
`;

const ProductDetailsSpan = styled.span`
  font-weight: 400;
`;

const Button = styled.button`
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

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10em;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 2px solid #1976d2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 15px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;

const Body = styled.div``;

const ProductList = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const loginDetails = JSON.parse(localStorage.getItem('loginDetails'));

  useEffect(() => {
    const path = location.pathname.split('/')[2];
    axios
      .get('http://localhost:3001/api/getSingleProduct/' + path)
      .then(res => {
        window.scrollTo(0, 0);
        const data = res.data.data;
        data.map(item => {
          let output = item;
          return setProduct(output);
        });
      })
      .catch(err => {
        return err;
      });
  }, [location.pathname]);

  const handleQuantity = type => {
    if (type === 'desc') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = addCart => {
    if (loginDetails === null) {
      const message = 'Please Login';
      NotificationManager.info(message);
    } else {
      const getItem = JSON.parse(localStorage.getItem('addedtocart') || '[]');
      setCartItems(getItem.length);
      let isProductExist = false;
      for (var i = 0; i < getItem.length; ++i) {
        if (getItem[i].id === product.id) {
          getItem[i].quantity = getItem[i].quantity + quantity;
          isProductExist = true;
          break;
        }
      }
      if (!isProductExist) {
        getItem.push({ ...product, quantity: quantity });
      }

      localStorage.setItem('addedtocart', JSON.stringify(getItem));
      dispatch(addProduct({ product, quantity, price: product.price * quantity }));
    }
  };

  return (
    <Body>
      <NotificationContainer />
      <Announcement />
      <Navbar cartItems={cartItems} />
      <CardWrapper>
        <Card>
          <ProductImg>
            <ImgDisplay>
              <ImgShowCase style={{ height: '80%', position: 'absolute', top: '150px', width: '20%', left: '15em' }}>
                <Image src={product.img} alt='' />
              </ImgShowCase>
            </ImgDisplay>
          </ProductImg>
          <ProductContent>
            <ProductTitle>{product.title}</ProductTitle>
            {product.desc}
            <ProductRating>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarHalfIcon />
              <StarBorderIcon />
              <ProductRatingSpan>3.7</ProductRatingSpan>
            </ProductRating>
            <ProductPrice>
              <p>
                Price: <ProductPriceSpan>${product.price} (5% off)</ProductPriceSpan>
              </p>
            </ProductPrice>
            <div>
              <ProductDetailsTitle>about this product: </ProductDetailsTitle>
              <ProductDetailsPara>Most ecommerce businesses use responsive design to rearrange elements of their desktop product pages for mobile devices. But mobile visitors benefit from small optimizations that make outsized improvements in add-to-cart and conversion metrics.</ProductDetailsPara>
              <ProductDetailsPara>I spent years building mobile shopping experiences for Walmart. In this post, I’ll review tactics to improve sales from mobile product pages.</ProductDetailsPara>
              <ProductDetailsUl>
                <ProductDetailsLi>
                  Color: <ProductDetailsSpan>{product.color}</ProductDetailsSpan>
                </ProductDetailsLi>
                <ProductDetailsLi>
                  Ram: <ProductDetailsSpan>{product.ram}</ProductDetailsSpan>
                </ProductDetailsLi>
                <ProductDetailsLi>
                  Available: <ProductDetailsSpan>in stock</ProductDetailsSpan>
                </ProductDetailsLi>
                <ProductDetailsLi>
                  Category: <ProductDetailsSpan>Mobiles</ProductDetailsSpan>
                </ProductDetailsLi>
                <ProductDetailsLi>
                  Shipping Fee: <ProductDetailsSpan>Free</ProductDetailsSpan>
                </ProductDetailsLi>
              </ProductDetailsUl>
            </div>
            <AddContainer>
              <AmountContainer style={{ margin: '1em 3em' }}>
                <Remove onClick={() => handleQuantity('desc')} />
                <Amount>{quantity}</Amount>
                <Add onClick={() => handleQuantity('inc')} />
              </AmountContainer>
              <Button onClick={handleClick}>ADD TO CART</Button>
            </AddContainer>
            <br />
            <SocialContainer>
              <h4 style={{ marginTop: '6px' }}>Share At: </h4>&nbsp;&nbsp;&nbsp;
              <SocialIcon color='3B5999'>
                <FacebookIcon />
              </SocialIcon>
              <SocialIcon color='E4405F'>
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon color='55ACEE'>
                <TwitterIcon />
              </SocialIcon>
              <SocialIcon color='E60023'>
                <LinkedInIcon />
              </SocialIcon>
            </SocialContainer>
          </ProductContent>
        </Card>
      </CardWrapper>
      <br />
      <br />
      <br />
      <br />
      <Newsletter />
      <Footer />
    </Body>
  );
};

export default ProductList;
