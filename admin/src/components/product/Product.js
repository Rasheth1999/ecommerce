import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import 'react-notifications/lib/notifications.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0ff;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const handleClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't delete this product!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
      }
    });
  };
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon title='Edit'>
          <Link to={`/product/${item.id}`}>
            <ModeEditOutlineOutlinedIcon style={{ textDecoration: 'none', color: 'black' }} />
          </Link>
        </Icon>
        <Icon title='Delete' onClick={handleClick}>
          <DeleteOutlinedIcon />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
