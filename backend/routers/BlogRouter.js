const express = require('express')
const router = express.Router();
const path = require('path');

router.route('/home').get((req, res)=>{
    try{
        const filePath = path.resolve(__dirname, '../frontend/main.html');
        res.status(200).sendFile(filePath)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

router.route('/login').get((req, res)=>{
    try{
        const filePath = path.resolve(__dirname, '../frontend/login.html');
        res.status(200).sendFile(filePath)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

router.route('/signup').get((req, res)=>{
    try{
        const filePath = path.resolve(__dirname, '../frontend/signup.html');
        res.status(200).sendFile(filePath)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

router.route('/page').get((req, res)=>{
    try{
        const filePath = path.resolve(__dirname, '../frontend/page.html');
        res.status(200).sendFile(filePath)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

router.route('/createArticle').get((req, res)=>{
    try{
        const filePath = path.resolve(__dirname, '../frontend/article.html');
        res.status(200).sendFile(filePath)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
module.exports = router