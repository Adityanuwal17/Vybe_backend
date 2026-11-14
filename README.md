# Express js

- Order of writing the route matters
  /hello
  /hello/test

this order will show different than:
/hello/test
/hello

- route patterns:

/abc

/ab?c => abc, ac

/ab+c => abc, abbbbbc

/ab\*cd => abcd, abxyzcd ( stars with ab end ends with cd)

/a(bc)?d => bc is optional, so abcd, ad

- regex

- /a/ => /a, /cab (letter a should presend)
- /\*fly&/ => (if end with a fly it will work)

- One route can have multiple route handlers
- we can use the other route handler by call the next()

app.get(
"/user",
(req, res, next) => {
//res.send({ firstName: "Aditya", lastName: "Nuwal" });
next();
},
(req, res, next) => {
//res.send("2nd response");
next();
},
(req, res, next) => {
res.send("3rd response");
},

);

- The functions in middle are known as Middlewares
- so on api call, it goes throught the chain of Middlewares until it reached
  the final one which sends the response, the final on is called request handler
- Middlewares are usually used to write with app.use and for common functions which
  are going to be used for every get/put/post etc...
  example: "/admin => middleware which an have the auth logic
  /admin/getAllData => auth will be done in the /admin and getting data logic will be here
  code becomes cleaner

# Vybe

- create a cluster on mongo DB
- install mongoose library and connect with the connection string with database:- Vybe
- once database is successfully connected then to app.listen

- create User Schema and crearte the User model with mongoose in the models folder

- create post /signup Api to add data to database
- push documents using API calls with postmane
- error handling using try cathc

- middleware to convert the data from request to js object and put it in body
  app.use(express.json());

- make your signup API dynamic to receive data from the end user

# schema Validations and Data sanitization

- add required, uniques, trim, min, minLength, trim
- add default
- create custum validate function for gender
- imporve the DB scehma - PUT all appropraite validation on each feild in schema
- add timestamps to the User Schema

- add api level validation on Patch and sign up post api
- Add Api validations for each field

# validator package from npm for easier validations

- validate data with helper functions for sign up

# Bcrypt library from npm to encrypt passwords

- create a password hash using bscrypt.hash
- save the user with encrypted password

- create login api
- use bcrypt.compare to compare password and throw error if anything invalid
- never reveal more information to the user

# Jwt tokens, authentication, cookie parse

- install cookie-parser and jsonwebtoken
- send a dummy cookie to user when login
- create a get /profile api and check if you get the cookie back
- In login api, after email password validation, create a jwt token and send it user in cookie
- read the cookie inside the profile api and find the logged in user

- write the user auth middleware
- add the user auth middleware in profile api and a new send connection request api
- set the expiry of jwt token and cookies

- refactoring code using mongoose schema and set the jwt token there
- also do it for validating password

# Vybe APIs:

## authRouter:

- POST /signup
- POST /login
- POST /logout

## profileRouter:

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password :- Forgot password API

## connectionRequestRouter:

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter:

- GET /user/connections
- GET /user/requests/
- GET /user/feed -> gets you the profiles of other users on the platform

- Using Express.Router()
- create routes folder for managing auth, profile, request routers
- create authRouter, profileRouter, requestRouter
- import these routers in app.js

- create POST /logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password API => forgot password API
- \*make your sure to validate all data in every POST, PATCH requests\*

- Read more about indexes in mongoose, mongoDB and advantages and disadvantages

- create Connection Request Schema
- send connection Request API
- validation of data and think aboout all corner cases
- Use of $or and $and queries in mongoose
- \*checkout Logical quesries in mongoDB\*
- schema.pre("save") function
- compound indexing in connection request schema
