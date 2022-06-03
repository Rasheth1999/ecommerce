const express = require('express');
const mysql = require('mysql');
const db = require('./routes/db-config');
const app = express();
const cookie = require('cookie-parser');
const PORT = 3001;
const { register, login, profile, profileUpdate, viewUser, getSingleUser } = require('./routes/auth');
const { createProduct, getProduct, getSingleProduct, updateProduct } = require('./routes/product');
const { orderDetails, getOrderList, viewOrderList, overAllOrderList } = require('./routes/order');

app.set('view engine', 'ejs');
app.use(cookie());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

db.connect(err => {
  DATABASE_HOST = 'localhost';
  DATABASE_USER = 'root';
  DATABASE_PASSWORD = 'root';
  DATABASE = 'sample';
});

app.post('/api/register', register, (req, res) => {
  res.status(400).send({ errors });
});

app.post('/api/login', login, (req, res) => {
  res.status(400).send({ errors });
});

app.post('/api/profile', profile, (req, res) => {
  res.status(400).send({ errors });
});

app.get('/api/viewUser', viewUser, (req, res) => {
  res.status(400).send({ errors });
});

app.get('/api/getSingleUser/:id', getSingleUser, (req, res) => {
  res.status(400).send({ errors });
});

app.post('/api/profileUpdate', profileUpdate, (req, res) => {
  res.status(400).send({ errors });
});

app.post('/api/createProduct', createProduct, (req, res) => {
  res.status(400).send({ errors });
});

app.get('/api/getProduct', getProduct, (req, res) => {
  res.status(400).send({ errors });
});

app.get('/api/getSingleProduct/:id', getSingleProduct, (req, res) => {
  res.status(400).send({ errors });
});

app.post('/api/updateProduct/:id', updateProduct, (req, res) => {
  res.status(400).send({ errors });
});

app.post('/api/orderdetails', orderDetails, (req, res) => {
  res.status(400).send({ errors });
});

app.get('/api/getorderlist/:id', getOrderList, (req, res) => {
  res.status(400).send({ errors });
});

app.get('/api/vieworderlist/:id', viewOrderList, (req, res) => {
  res.status(400).send({ errors });
});

app.get('/api/overAllOrderList', overAllOrderList, (req, res) => {
  res.status(400).send({ errors });
});

app.listen(PORT);
