import { render } from 'ejs';
import express from 'express';
import configViewEngine from './configs/ViewEngine';
import initWebRoute from './route/web'
import { config } from 'process';
import pool from './configs/connectDB'
import initAPIRoute from './route/api'
//const express = require('express')    
//tao app
require('dotenv').config();
let morgan = require('morgan');
const path = require('path');
const app = express();
//tao cong
const port = process.env.PORT || 8080;
console.log("check port", port)
app.use((req, res, next) => {
    console.log('run into my middleware', req.method);
    next();//di tiep xuong cac dong code 
})
app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());//chuyen du lieu sang kieu JSON
//set up new Engine
configViewEngine(app);
//init web route  
initWebRoute(app);
initAPIRoute(app);
app.use((req, res) => {
    return res.render('404.ejs')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})