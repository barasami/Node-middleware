const express=require('express')
const logEvents=require('./middleware/logEvents')
const app=express()
const cors=require('cors')
const path=require('path')
const fs=require('fs')


const PORT=process.env.PORT || 5300

//custom middleware

app.use((req,res,next)=>{
    logEvents(`${req.method}\t ${req.headers.origin}\t ${req.url}`,'myLogger.txt')
    console.log(`${req.method}\t ${req.path}`);
    next()
})

app.use(cors())

//built in middleware..it handles form data
app.use(express.urlencoded({extended:false}))

//for json data
app.use(express.json())

//static files
app.use(express.static(path.join(__dirname,'./public')))

app.get('^/$ |/index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views/subviews','index.html'))
})
app.get('/new(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views/subviews','new-page.html'))
})
app.get('/old-page(.html)?',(req,res)=>{
    res.redirect(301,path.join(__dirname,'views/subviews','new-page.html'))
})

app.get('/*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views/subviews','404.html'))
})


app.listen(PORT,()=>{
    console.log('my server');
})
