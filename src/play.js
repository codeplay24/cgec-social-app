// const compSciModel = require('../models/compSciModel.js')
// const civilModel = require('../models/civilModel.js')
// const electricalModel = require('../models/electricalModel.js')
// const mechanicalModel = require('../models/mechanicalModel.js')
// const electronicsModel = require('../models/electronicsModel.js')
// const mongoose = require('mongoose')
// require('../database/mongodb.js')
//
//
//
// const fun = async()=>{
//   console.log('running')
//   const sem1Subjects = new compSciModel({
//     semester:"sem7",
//     subjects:"Quantum Computing(PEC-CS701A),Cloud Computing(PEC-CS701B),Digital Signal Processing(PEC-CS701C)"
//     +","
//   })
//
//   await sem1Subjects.save()
// }
//
// fun()

//
// const nodeRSA = require('node-rsa')
// const key = new nodeRSA({b: 512})
//
// const text = 'rajdeep';
// const encrypted = key.encrypt(text, 'base64');
// console.log(encrypted);
// const decrypted = key.decrypt(encrypted, 'utf8');
// console.log(decrypted);
//
// const nodemailer = require("nodemailer");
//
// var transporter = nodemailer.createTransport({
//   service:'gmail',
//   auth:{
//     user:'rajdeepsarkar1d@gmail.com',
//     pass:'official44'
//   }
// })
//
// var mailOptions = {
//   from:'rajdeepsarkar1d@gmail.com',
//   to:'rajsarkar97@gmail.com',
//   subject:'verification',
//   text:'click on this link below to get verified\n'
//   +'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host+'\/signup'
// }
//
// transporter.sendMail(mailOptions, (err,info)=>{
//   if(err){
//     console.log(err)
//   }else{
//     console.log('worked')
//   }
// })






//
// const express = require('express')
// const cookieParser = require('cookie-parser')
//
// const app = express()
//
// app.use(cookieParser())
//
// app.get('/', (req,res)=>{
//   try{
//     let str = 'accessToken'
//     res.status(200).cookie('accessToken', str, {
//       expires: new Date(new Date().getTime() + 30 * 1000),
//   		sameSite: 'strict',
//   		httpOnly: true
//     }).send('cookie created')
//   }catch(e){
//     res.status(500).send('something fishy is going on')
//   }
// })
//
// app.get('/cookie', (req,res)=>{
//   res.send(req.cookies)
// })
//
// app.listen(5000)
// console.log('started')












// const jwt = require('jsonwebtoken')
//
// const token = jwt.sign({username: 'rahul'}, 'secretKey')
//
// const data = jwt.verify(token, 'secretKey')
// console.log(data)




// const express = require('express')
// const app = express()
//
// app.get('/home', (req,res)=>{
//   res.redirect('/SecondHome')
// })
//
// app.get('/SecondHome', (req,res)=>{
//   res.send('SecondHome')
// })
//
//
// app.listen(5000)


const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({
    extname: "handlebars",
    defaultLayout: false,
  }))
app.set('view engine', 'handlebars')

app.get('/', (req,res)=>{
  res.render('index')
})

app.get('/about', (req,res)=>{
  res.render('about')
})

app.listen(5000, ()=>{
  console.log('running')
})
