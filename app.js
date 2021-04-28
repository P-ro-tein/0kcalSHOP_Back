const express = require("express");
const app = express();
const port = 9000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { User } = require("./models/User");
const {Product} = require("./models/Product");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path');
const { auth } = require("./middleware/auth");
const nunjucks = require('nunjucks');


app.use(
  cors({
    origin: true,
    credentials: true, //도메인이 다른경우 서로 쿠키등을 주고받을때 허용해준다고 한다
  })
);

app.set('view engine', 'html');

nunjucks.configure(path.resolve(__dirname,'views'), {
  express: app,
  watch: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
//mongodb 사이트에서 카피한 주소
const dbAddress =
'mongodb+srv://EomYoosang:TlnXvxAlD3rRmdKz@cluster0.jkful.mongodb.net/0kcalSHOP?retryWrites=true&w=majority';
mongoose
  .connect(dbAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use('/', require('./routes/users'));
app.use('/product',require('./routes/product'))
app.use((err,req,res,next)=>{
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(port, () => console.log(`listening on port ${port}`));