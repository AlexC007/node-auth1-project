const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const Users = require('./usersAuth/usersAuth-model');
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
 
server.get('/', (req, res) => {
  res.send("Let's see if we're working");
});

server.post('/api/login', Authenticate, (req, res) => {
    let {username} = req.headers;
    res.status(200).json({ message: `You have logged in, ${username}!` });
  });

  
server.post('/api/register', Authenticate, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.add(user)
    .then(added => {
      res.status(201).json(added);
    })
    .catch(error => {
      res.status(500).json({errorMessage:"Oh no try again!!!"});
    });
});





server.get('/api/users',Authenticate, (req, res) => {

  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send({errorMessage:"That didn't work"}));
});


function Authenticate (req, res, next) {
  const {username, password} = req.headers;


  if (username && password) {
   Users.findBy({username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(401).json({message: "You shall not Pass"});
      }
    })
    .catch(err => {
      res.status(500).json({message:"Try again"});
    });
  } else {
    res.status(400).json({message:"Please fill in the spaces provided for Username & Password"});
  }
}

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
