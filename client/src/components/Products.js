import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/getProduct')
      .then(res => {
        return setProducts(res.data.data);
      })
      .catch(err => {
        return err;
      });
  }, []);
  return (
    <Container>
      {products.map(item => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
