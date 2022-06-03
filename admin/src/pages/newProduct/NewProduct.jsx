import axios from 'axios';
import React, { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Link } from 'react-router-dom';
import './newProduct.css';

export default function NewProduct() {
  const initialValues = { title: '', desc: '', img: '', ram: '', color: '', quantity: '' };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios
      .post('http://localhost:3001/api/createProduct', formValues)
      .then(res => {
        if (res.data.status === 'SUCCESS') {
          NotificationManager.success('Success message', 'Product Added');
          setFormValues(initialValues);
        } else {
          NotificationManager.error('Error message', 'Please Check it');
        }
      })
      .catch(err => {
        return err;
      });
  };

  return (
    <div className='newProduct'>
      <div className='productTitleContainer'>
        <h1 className='productTitle'>NEW PRODUCT</h1>
        <Link to='/products'>
          <button className='addProductButton' title='Back'>
            BACK
          </button>
        </Link>
      </div>
      <form className='addProductForm' onSubmit={handleSubmit}>
        <div className='addProductItem'>
          <label>Title</label>
          <input type='text' name='title' value={formValues.title} onChange={handleChange} required />
        </div>
        <div className='addProductItem'>
          <label>Description</label>
          <input type='text' name='desc' value={formValues.desc} onChange={handleChange} required />
        </div>
        <div className='addProductItem'>
          <label>Image URL</label>
          <input type='text' name='img' value={formValues.img} onChange={handleChange} required />
        </div>
        <div className='addProductItem'>
          <label>Ram</label>
          <input type='text' name='ram' value={formValues.ram} onChange={handleChange} required />
        </div>
        <div className='addProductItem'>
          <label>Color</label>
          <input type='text' name='color' value={formValues.color} onChange={handleChange} required />
        </div>
        <div className='addProductItem'>
          <label>Price</label>
          <input type='number' min='1' name='price' value={formValues.price} onChange={handleChange} required />
        </div>
        <div className='addProductItem'>
          <label>Quantity</label>
          <input type='number' min='1' max='50' name='quantity' value={formValues.quantity} onChange={handleChange} required />
        </div>
        <div className='addProductItem'>
          <label>Active</label>
          <select name='active' id='active'>
            <option value='yes'>Yes</option>
            <option value='no'>No</option>
          </select>
        </div>
        <button className='addProductButton' title='Create'>
          CREATE
        </button>
        <NotificationContainer />
      </form>
    </div>
  );
}
