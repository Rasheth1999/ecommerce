const router = require('express').Router();
const { request } = require('express');
const db = require('./db-config');

//CREATE PRODUCT
const createProduct = async (req, res) => {
  var params = req.body;
  var postData = {
    title: params.title,
    desc: params.desc,
    img: params.img,
    ram: params.ram,
    color: params.color,
    price: params.price,
    quantity: params.quantity,
  };
  db.query(`INSERT INTO product SET ?`, postData, (err, result, fields) => {
    if (err) {
      res.json(err);
    }
    res.json({ status: 'SUCCESS', message: 'success', data: result });
  });
};

//GET ALL PRODUCT
const getProduct = async (req, res) => {
  db.query(`SELECT * FROM product `, (error, result, fields) => {
    if (error) {
      res.json(error);
    }
    res.json({ status: 'SUCCESS', message: 'success', data: result });
  });
};

//GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
  let pathLocation = req.params.id;
  db.query(`SELECT * FROM product WHERE id = ?`, [pathLocation], (err, result, fields) => {
    if (err) {
      res.json(err);
    }
    res.json({ status: 'SUCCESS', message: 'success', data: result });
  });
};

//UPDATE PRODUCT
const updateProduct = async (req, res) => {
  var params = req.body;
  var postData = {
    title: params.title,
    desc: params.desc,
    img: params.img,
    ram: params.ram,
    color: params.color,
    price: params.price,
    quantity: params.quantity,
  };
  db.query(`UPDATE product SET ? WHERE id = ?`, [postData, params.id], (err, result, fields) => {
    if (err) {
      res.json(err);
    }
    res.json({ status: 'SUCCESS', message: 'success', data: result });
  });
};

module.exports = {
  createProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
};
