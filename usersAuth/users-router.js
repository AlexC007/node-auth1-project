const express = require('express');
const Users = require('./usersAuth-model');
const router = express.Router();
//const validate = require('../middleware')

  router.post('/api/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user) {
          res.status(200).json({ message: `` });
        } else {
          res.status(401).json({ message: `` });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });

    res.status(200).json({ message: `` });
  

  });
  
    
  router.post('/register', (req, res) => {
    let user = req.body;
  
    Users.add(user)
      .then(added => {
        res.status(201).json(added);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  
  
  
  router.get('/users',(req, res) => {
  
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });