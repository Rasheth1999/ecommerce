import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Products from '../../components/product/Products';

const Container = styled.div`
  flex: 6;
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const TopButton = styled.button`
  margin-top: 10px;
  padding: 17px 50px;
  border: none;
  border-radius: 10px;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Option = styled.option``;

const ProductList = () => {
  const [filters, setFilters] = useState({});

  const handleFilters = e => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Title>MOBILES VIEW</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Mobile:</FilterText>
          <Select name='color' onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select name='size' onChange={handleFilters}>
            <Option disabled>RAM</Option>
            <Option>4GB</Option>
            <Option>6GB</Option>
            <Option>8GB</Option>
            <Option>10GB</Option>
            <Option>12GB</Option>
          </Select>
        </Filter>
        <Filter title='Add New Products'>
          <Link to='/newproduct'>
            <TopButton>ADD NEW PRODUCT</TopButton>
          </Link>
        </Filter>
      </FilterContainer>
      <Products />
    </Container>
  );
};

export default ProductList;
