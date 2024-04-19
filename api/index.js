const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');
require('dotenv').config();
const app=express();
const Transaction= require('./models/Transaction.js');

app.use(cors());
app.use(express.json());

app.get('/api/test',(req, res)=>{
    res.json('test okayish');
});

app.post('/api/transaction', async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Request body:', req.body);
    const {name, description, datetime, price}= req.body;
    const transaction = await Transaction.create({name, description, datetime, price})

    res.json(transaction);
});

app.get('/api/transaction', async(req,res)=>{
await mongoose.connect(process.env.MONGO_URL);
const transactions = await Transaction.find();
res.json(transactions);
});

app.listen(4040, () => {
    console.log('Server is running on port 4040');
  });