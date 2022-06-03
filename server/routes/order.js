const router = require('express').Router();
const db = require('./db-config');
const { request } = require('express');

//ORDER
const orderDetails = async (req, res) => {
  let { id, first_name, last_name, user_name } = req.body.loginDetails[0];
  let myOrderList = req.body.cartArray;
  let { phonenumber, email, address, city, state, zipcode } = req.body.formValues;
  let userid = id;
  var orderid;
  await db.query(`INSERT INTO myorder SET ?`, { userid, phonenumber, email, address, city, state, zipcode }, (err, result, fields) => {
    if (err) {
      res.json(err);
    }
    orderid = result.insertId;
    myOrderList.forEach(async e => {
      const productid = e.productid;
      const price = e.price;
      const quantity = e.quantity;
      await db.query(`INSERT INTO myorderlist SET ?`, { orderid, productid, price, quantity }, (err, answer, fields) => {
        if (err) {
          res.json(err);
        }
      });
    });
    res.json({ status: 'SUCCESS', message: 'success', data: result });
  });
};

//GET ALL ORDER LIST
const getOrderList = async (req, res) => {
  const orderItem = [];
  let userid = req.params.id;
  await db.query(`SELECT * FROM myorder WHERE userid = ? `, [userid], async (error, result, fields) => {
    if (error) {
      res.json(error);
    }
    var resultArray = [];
    const waitMap = await new Promise((resolve, reject) => {
      result.forEach(async (item, index) => {
        const orderid = item.id;
        await db.query(`SELECT id, quantity, productid, status, orderid, orderdate,(price* quantity) as total FROM myorderlist WHERE orderid = ?`, [orderid], (error, answer, fields) => {
          if (error) {
            res.json(error);
          }
          const orderItem = JSON.parse(JSON.stringify(answer));
          resultArray.push(orderItem);
          if (index === result.length - 1) {
            resolve('');
          }
        });
      });
    });
    res.json({ status: 'SUCCESS', message: 'success', data: resultArray });
  });
};

//VIEW ORDER LIST
const viewOrderList = async (req, res) => {
  let pathLocation = req.params.id;
  await db.query(
    `SELECT myorder.*, myorderlist.orderid, myorderlist.price, (myorderlist.price * myorderlist.quantity) as total, myorderlist.quantity, myorderlist.status, product.title, product.desc, product.img, product.ram, product.color, product.price  FROM myorder INNER JOIN myorderlist ON myorder.id = myorderlist.orderid INNER JOIN product ON myorderlist.productid = product.id WHERE myorder.id = ?`,
    [pathLocation],
    async (err, result, fields) => {
      if (err) {
        res.json(err);
      }
      const orderList = JSON.parse(JSON.stringify(result));
      res.json({ status: 'SUCCESS', message: 'success', data: orderList });
    }
  );
};

//ADMIN PAGE VIEW ORDER LIST
const overAllOrderList = async (req, res) => {
  await db.query(
    `SELECT myorder.*, (SELECT sum(myorderlist.quantity*myorderlist.price) FROM myorderlist where orderid=myorder.id) as order_total ,(SELECT COUNT(orderid) FROM myorderlist WHERE orderid=myorder.id) as total_product,
    (SELECT user_name FROM test WHERE test.id=myorder.userid) as username FROM myorder`,
    async (err, result, fields) => {
      if (err) {
        res.json(err);
      }
      const orderList = JSON.parse(JSON.stringify(result));
      res.json({ status: 'SUCCESS', message: 'success', data: orderList });
    }
  );
};

module.exports = { orderDetails, getOrderList, viewOrderList, overAllOrderList };
