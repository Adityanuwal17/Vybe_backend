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
