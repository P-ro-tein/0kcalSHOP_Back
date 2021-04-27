const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");



//메인페이지
router.use("/", express.static(path.resolve(__dirname,"../public","main")));
router.get("/", auth, (req, res) => {
    if(!req.user){
        res.render('login');
    }else if(req.user.role===1){
        res.send('manager');
    }else{
        res.render('profile');
    }
});


//회원가입페이지
router.use("/register",express.static(path.resolve(__dirname,"../public","register")));
router.get("/register",(req, res) => {
    res.sendFile(path.resolve(__dirname,'../views','register','register.html'));
});

//회원가입 post요청 처리
router.post("/register", (req, res) => {
    //post로 넘어온 데이터를 받아서 DB에 저장해준다
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).redirect('/register/done');
  });
})

//회원가입완료페이지
router.get("/register/done",(req, res) => {
    res.sendFile(path.resolve(__dirname,'../views','register','register_done.html'));
});

//로그인 post요청 처리
router.post("/login", (req, res) => {
  //로그인을할때 아이디와 비밀번호를 받는다
    console.log(req.body);
    User.findOne({ id: req.body.id }, (err, user) => {

      console.log(user);
      user
        .comparePassword(req.body.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.json({
              loginSuccess: false,
              message: "비밀번호가 일치하지 않습니다",
            });
          }
          //비밀번호가 일치하면 토큰을 생성한다
          //해야될것: jwt 토큰 생성하는 메소드 작성
          user
            .generateToken()
            .then((user) => {
              res.cookie("x_auth", user.token).status(200).redirect('/');
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        })
        .catch((err) => res.json({ loginSuccess: false, err }));
    });
  });


//auth 가져와 토큰으로 확인
router.get("/auth", auth, (req, res) => {
    //auth 미들웨어를 통과한 상태 이므로
    //req.user에 user값을 넣어줬으므로
    res.status(200).json({
      _id: req._id,
      id: req.id,
      isAdmin: req.user.role === 09 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image,
    });
  });


//logout 요청처리
router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: ""}, (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.clearCookie("x_auth");
      return res.status(200).redirect('/');
    });
  });
module.exports = router;