// const express = require("express");
// const app = express();
// const zod = require("zod");
// app.use(express.json());

// const schema = zod.array(zod.number());

// function validateInput(obj){
//   const schema = zod.object({
//     email: zod.string().email(),
//     password: zod.string().min(8),
//   })
//   const response = schema.safeParse(obj);
//   return response;
// }

// app.post("/health-check", (req, res) =>{
//   const kidneys = req.body.kidneys;
//   const response = schema.safeParse(kidneys);
//   res.send(response);

//   // const kidneysLenght = kidneys.length;
//   // res.send("you have "+ kidneysLenght + " kidneys");
// })

// app.post('/validate',(req,res)=>{
//   const response = validateInput(req.body);
//   if(!response.success){
//     res.status(400).send(response.error.message);
//     return;
//   }
//   else{
//      res.send(response);
//   }
// })
// app.use((err,req, res,next) => res.json({error: "something went wrong"}));  
// app.listen(3000);
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
return !!ALL_USERS.find(user => user.username === username && user.password === password);

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
    res.json({
      users: ALL_USERS.filter(user => user.username === username),
    });
    // return a list of users other than this username
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000);