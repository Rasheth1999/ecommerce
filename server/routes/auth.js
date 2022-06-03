const router = require('express').Router();
const db = require('./db-config');
const bcrypt = require('bcrypt');
const { request } = require('express');

//REGISTER
const register = async (req, res) => {
  var params = req.body;
  const hashedPassword = bcrypt.hashSync(params.password, 10);
  var postData = {
    first_name: params.firstname,
    last_name: params.lastname,
    user_name: params.username,
    email: params.email,
    password: hashedPassword,
  };

  const isValue = await validate(params);
  if (Object.keys(isValue).length === 0) {
    db.query(`INSERT INTO test SET ?`, postData, (err, result, fields) => {
      if (err) {
        res.json(err);
      }
      res.json(result);
    });
  } else {
    res.json({ status: 'FAILED', message: 'error', data: isValue });
  }
};
const checkUserExists = username =>
  new Promise((resolve, reject) => {
    db.query(`SELECT EXISTS(SELECT * FROM test WHERE user_name = ?) AS user`, username, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

const validate = async values => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  let queryResult = await checkUserExists(values.username);

  if (queryResult[0].user === 1) {
    errors.username = 'Username already exists';
  }

  if (!values.firstname) {
    errors.firstname = 'Firstname is required!';
  }

  if (!values.username) {
    errors.username = 'Username is required!';
  }

  if (!values.email) {
    errors.email = 'Email is required!';
  }

  if (!regex.test(values.email)) {
    errors.email = 'This is not a valid email format!';
  }

  if (!values.password) {
    errors.password = 'Password is required!';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be more than 6 characters!';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Password is required!';
  } else if (values.confirmPassword.length < 6) {
    errors.confirmPassword = 'ConfirmPassword must be more than 6 characters!';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Password do not match!';
  }
  return errors;
};
//LOGIN

const login = async (req, res) => {
  const errors = {};
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    db.query(`SELECT * FROM test WHERE user_name = ?`, [username], (error, result, fields) => {
      if (error) {
        res.json(error);
      }
      if (result.length == 0) {
        res.json({ message: 'User does not exist' });
      } else {
        const hashPassword = result[0].password;
        bcrypt.compare(password, hashPassword, function (err, answer) {
          if (err) {
            res.json(err);
          }
          if (answer) {
            res.json({ status: 'SUCCESS', message: 'success', data: answer, result });
          } else {
            res.json({ message: 'password do not match' });
          }
        });
      }
    });
  }
};

//PROFILE
const profile = async (req, res) => {
  let username = req.body.remember.username;
  db.query(`SELECT * FROM test WHERE user_name = ?`, [username], (error, result, fields) => {
    if (error) {
      res.json(error);
    }
    res.json({ status: 'SUCCESS', message: 'success', data: result });
  });
};

//PROFILE UPDATE
const profileUpdate = async (req, res) => {};

//VIEW USER
const viewUser = async (req, res) => {
  db.query(`SELECT * FROM test`, (error, result, fields) => {
    if (error) {
      res.json(error);
    }
    res.json({ status: 'SUCCESS', message: 'success', data: result });
  });
};

//GET SINGLE USER
const getSingleUser = async (req, res) => {
  let pathLocation = req.params.id;
  db.query(`SELECT * FROM test WHERE id = ?`, [pathLocation], (err, result, fields) => {
    if (err) {
      res.json(err);
    }
    const userList = JSON.parse(JSON.stringify(result));
    res.json({ status: 'SUCCESS', message: 'success', data: userList });
  });
};

module.exports = {
  register,
  login,
  profile,
  profileUpdate,
  viewUser,
  getSingleUser,
};
