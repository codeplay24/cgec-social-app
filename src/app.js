const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const studentModel = require('../models/studentModel.js')
const compSciModel = require('../models/compSciModel.js')
const civilModel = require('../models/civilModel.js')
const electricalModel = require('../models/electricalModel.js')
const mechanicalModel = require('../models/mechanicalModel.js')
const electronicsModel = require('../models/electronicsModel.js')
const verifyModel = require('../models/verifyModel.js')
const postModel = require('../models/postModel.js')
const commentModel = require('../models/commentsModel.js')
const auth = require('../middleware/auth.js')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('../database/mongodb.js')

const app = express()
const viewsPath =path.join(__dirname, '../templates/views')
const pathExec = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

const hbs = exphbs.create({
  extname: "handlebars",
  defaultLayout: false,
  partialsDir: partialsPath,

  //helper onLoadFunction

  helpers:{
    commentLoader: function(comments, user, options){
      var commentHtml = ''
      comments.forEach((item, i) => {
        commentHtml+= '\n'+'<div class="eachComment">'
        commentHtml+= '\n' + '<h4>'+ item.userId + '</h4>'
        commentHtml+= '\n' + '<p>' + item.commentText + '</p>'
        if(item.userId===user){
          commentHtml+= '\n' + `<button type="button" name="button" onclick= "deleteComment('${item._id}')">Delete</button>`

        }
        commentHtml+='</div>'
      });
      return new Handlebars.SafeString(commentHtml)
    }
  }
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', viewsPath)

app.use(express.static(pathExec))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//hbs.registerPartials(partialsPath)



app.get('/signup',auth, (req,res)=>{
  if(req.user_name){
    res.redirect('/newsfeed')
    return
  }
  res.render('index')
})

app.get('/', auth,(req,res)=>{

  if(req.user_name){
    res.redirect('/newsfeed')
    return
  }
  res.render('index')
})

app.post('/submit', async (req,res)=>{
  try{
    const user = await studentModel.findOne({email_address:req.body.email_address})
    if(user){
      res.send('A account is already active with this email')
    }
    const student = new studentModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      roll_number: req.body.roll_number,
      email_address: req.body.email_address,
      user_name: req.body.user_name,
      Depertment: req.body.dept_selector,
      password: req.body.password,
    })
    await student.save()
    var username = req.body.user_name
    var id = username[0].charCodeAt(0)
    for(var i =1; i<username.length; i++){
      id+= '.'+username[i].charCodeAt(0)
    }
    const text1 = 'Thank you for signing up, this is the verification step. click on the given link \n'
    +'http://' + req.headers.host+'/verify'+'?id='+id
    const verifyData = new verifyModel({
      v_id:id,
      user_name: req.body.user_name
    })
    await verifyData.save()
    const transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:'rajdeepsarkar1d@gmail.com',
        pass:'official44'
      }
    })
    var mailOptions = {
      from:'rajdeepsarkar1d@gmail.com',
      to:req.body.email_address,
      subject:'Verification',
      text:text1
    }
    transporter.sendMail(mailOptions, (err,succ)=>{
      if(err){
        throw new Error('something bad happened while sending the mail')
      }
      console.log('email sent successfully')
    })
    res.redirect('/afterSignUp')
  }catch(e){
    console.log(e)
    res.redirect('/')
  }
})

app.get('/afterSignUp', (req,res)=>{
  res.render('afterSignUp')
})

app.get('/verify',auth, async(req,res)=>{
  if(req.user_name){
    res.redirect('/newsfeed')
    return
  }
  try{
    let qString = req.query.id
    const arr = qString.split('.')
    let username = String.fromCharCode(arr[0])
    arr.forEach((item, i) => {
      if(i!=0){
        username+=String.fromCharCode(item)
      }
    });

    const userNameCheck =await verifyModel.findOne({v_id:qString})
    if(!userNameCheck){
      throw new Error('You tryna cheat my nigga ?')
    }
    const user =await studentModel.findOne({user_name:username})
    const updatedUser = await studentModel.findOneAndUpdate({user_name:username}, {$set:{isVerified:true}},{new:true, useFindAndModify:true})
    res.render('login')
  }catch(e){
    res.status(400).send()
  }
})

app.post('/login', auth,async(req,res)=>{
  try{
    const username = req.body.user_name
    const password = req.body.password
    const user = await studentModel.findOne({user_name:username})

    if(!user){
      throw new Error('user not found')
    }
    const pass = user.password

    if(pass!==password){
      throw new Error('Password does not match the username')
    }
    await user.generateToken(req)
    res.status(200).cookie('jwt', req.token, {
      expires: new Date(new Date().getTime() + 3000 * 1000000),
      sameSite:'strict',
      httpOnly:true
    }).redirect('/newsFeed')
  }catch(e){
    res.status(404).send('hooop')
  }
})

app.get('/login',auth,async (req,res)=>{
  if(req.user_name){
    res.redirect('/newsfeed')
    return
  }
  res.render('login')
})




app.post('/requestdone', auth, async(req,res)=>{
  const postInstance = new postModel({
    user_name:req.user_name,
    depertment: req.body.Departments,
    semester: req.body.Semester,
    subject: req.body.Subject
  })
  await postInstance.save()
  res.redirect('/newsfeed')
})

app.get('/getpost', async(req,res)=>{
  const posts = await postModel.find({})
  res.send(posts)
})

app.get('/newsfeed', auth, (req,res)=>{
  if(!req.user_name){
    res.redirect('/login')
    return
  }
  res.render('newsFeed', {username:req.user_name})
})

app.post('/postComment',auth, async(req,res)=>{

})

app.post('/saveComment', auth, async(req,res)=>{
  const comment = new commentModel({
    postId:req.body.postId,
    userId:req.user_name,
    commentText: req.body.commentText
  })
  await comment.save()
  res.send('saved')
})




///xhr handler

app.post('/try', async(req,res)=>{
  try{
    const sem = req.body.sem
    const dept = req.body.dept
    const result = await compSciModel.findOne({semester: sem})
    res.status(200).send(result.subjects)
  }catch(e){
    res.status(404).send()
  }
})

app.post('/userNameCheck', async(req,res)=>{
  try{
    const username = req.body.user_name
    const user = await studentModel.findOne({user_name:username})
    if(user){
      res.status(400).send()
    }
    res.status(200).send()
  }catch(e){
      res.status(500).send()
  }
})

app.get('/openPost',auth, async(req,res)=>{
  if(!req.user_name){
    res.redirect('/login')
    return
  }
  try{
    const _id = req.query._id
    const post = await postModel.findOne({_id})
    if(!post){
      res.redirect('/newsfeed')
      return
    }
    const html = `${post.user_name} from ${post.depertment} requested a book for ${post.semester} on ${post.subject}.`
    var commentsOnThisPost = await commentModel.find({postId:post._id})
    commentsOnThisPost.reverse()
    let ownPost = false
    if(req.user_name===post.user_name){
      ownPost = true
    }
    res.render('openPost', {html:html, commentsOnThisPost:commentsOnThisPost, username:req.user_name, ownPost})
  }catch(e){
  }
})

app.get('/logout',auth, async(req,res)=>{
  try{
    const username = req.user_name
    const user = await studentModel.findOne({user_name:username})
    user.tokens = user.tokens.filter((token)=>{
      return token.token!==req.cookies.jwt
    })
    await user.save()
    res.clearCookie('jwt').status(200).send('cunt')
  }catch(e){

  }
})

app.post('/deletePost', auth, async(req,res)=>{
  try{
    const postId = req.body.postId
    const post = await postModel.findByIdAndDelete(postId)
    res.send('deleted')
  }catch(e){

  }
})

app.post('/deleteComment', auth, async(req,res)=>{
  try{
    const commentId = req.body.commentId
    const comment =await commentModel.findByIdAndDelete(commentId)
    res.status(200).send()
  }catch(e){
    console.log('catch');
  }
})



app.listen(5000)
console.log('The site is up for real')
