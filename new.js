// const zod = require( 'zod' );

// function validateInput(obj){
//   const schema = zod.object({
//     email: zod.string().email(),
//     password: zod.string().min(8),
//   })
//   const response = schema.safeParse(obj);
//   console.log(response);
// }
// validateInput({
//   email: 'tzirw@example.com',
//   password: '12345678'
// });
// function kiratsAsyncFunction() {
//   let p = new Promise(function(resolve) {
//     // do some async logic here
//     resolve("hi there!")
//   });
//   return p;
// }

// function main() {
//   kiratsAsyncFunction().then(function(value) {
//       console.log(value);
//   });
// }

// main();
const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  // write logic to return true or false if this user exists
  // in ALL_USERS array
let Exists = false;
  for(let i=0; i<ALL_USERS.length; i++){
    if(ALL_USERS[i].username === username && ALL_USERS[i].password === password){
      Exists = true;
    }
  }
  return Exists;

}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000)