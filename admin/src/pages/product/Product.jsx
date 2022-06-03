import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Link, useLocation } from 'react-router-dom';
import './product.css';

export default function Product() {
  const location = useLocation();

  const initialValues = { title: '', desc: '', img: '', ram: '', color: '', quantity: '' };
  const [product, setProduct] = useState(initialValues);

  const handleChange = e => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async e => {
    const pathLocation = location.pathname.split('/')[2];
    e.preventDefault();
    axios
      .post('http://localhost:3001/api/updateProduct/' + pathLocation, product)
      .then(res => {
        if (res.data.status === 'SUCCESS') {
          NotificationManager.success('Success message', 'Product updated');
        } else {
          NotificationManager.error('Error message', 'Please check it');
        }
      })
      .catch(err => {
        return err;
      });
  };

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

  function nFormatter(num, digits = 1) {
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
  }

  const [lineChart, setLineChart] = useState({
    series: [
      {
        name: 'Amount',
        data: [1000000, 2500000, 18000000, 4000000, 1500000, 32500000, 6000000, 10000000, 15000000, 3000000, 4500000, 10000000],
      },
    ],
    options: {
      chart: {
        height: 100,
        type: 'line',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
          offsetX: 0,
          offsetY: 0,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisBorder: {
          show: true,
          color: '#f7f7f7',
          offsetX: 0,
          offsetY: 0,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          rotate: -45,
          rotateAlways: false,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: false,
          minHeight: undefined,
          maxHeight: 120,
          style: {
            colors: '#858997',
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        labels: {
          formatter: function (val: number, index: any) {
            return `$${nFormatter(val)}`;
          },
          style: {
            colors: '#858997',
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
          },
        },
        axisBorder: {
          show: true,
          color: '#f7f7f7',
          offsetX: -1,
          offsetY: 0,
        },
      },
    },
  });
  console.log(setLineChart);

  return (
    <div className='product'>
      <div className='productTitleContainer'>
        <h1 className='productTitle'>EDIT PRODUCT</h1>
        <Link to='/newproduct'>
          <button className='addProductButton' title='Add New Products'>
            ADD NEW PRODUCT
          </button>
        </Link>
      </div>
      <div className='productTop'>
        <div className='productTopLeft'>
          <ReactApexChart options={lineChart.options} series={lineChart.series} type='line' height={250} />
        </div>
        <div className='productTopRight'>
          <div className='productInfoTop'>
            <img src={product.img} alt='' className='productInfoImg' />
            <span className='productName'>{product.title}</span>
          </div>
          <div className='productInfoBottom'>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Description:</span>
              <span className='productInfoValue'>{product.desc}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Ram:</span>
              <span className='productInfoValue'>{product.ram}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Color:</span>
              <span className='productInfoValue'>{product.color}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Price:</span>
              <span className='productInfoValue'>$ {product.price}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Quanity:</span>
              <span className='productInfoValue'>{product.quantity}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='productBottom'>
        <form className='addProductForm' onSubmit={handleSubmit}>
          <div className='addProductItem'>
            <label>Title</label>
            <input type='text' name='title' value={product.title} onChange={handleChange} required />
          </div>
          <div className='addProductItem'>
            <label>Description</label>
            <input type='text' name='desc' value={product.desc} onChange={handleChange} required />
          </div>
          <div className='addProductItem'>
            <label>Image URL</label>
            <input type='text' name='img' value={product.img} onChange={handleChange} required />
          </div>
          <div className='addProductItem'>
            <label>Ram</label>
            <input type='text' name='ram' value={product.ram} onChange={handleChange} required />
          </div>
          <div className='addProductItem'>
            <label>Color</label>
            <input type='text' name='color' value={product.color} onChange={handleChange} required />
          </div>
          <div className='addProductItem'>
            <label>Price</label>
            <input type='number' name='price' value={product.price} onChange={handleChange} required />
          </div>
          <div className='addProductItem'>
            <label>Quantity</label>
            <input type='number' min='1' max='50' name='quantity' value={product.quantity} onChange={handleChange} required />
          </div>
          <button className='addProductButton' title='Update'>
            UPDATE
          </button>
          <NotificationContainer />
        </form>
      </div>
    </div>
  );
}
