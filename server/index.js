require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router=require('./Router/router')
require('./db/dbConnection')

const mealserver=express()
mealserver.use(cors())
mealserver.use(express.json())
mealserver.use(router)

const PORT=process.env.PORT||9000

mealserver.listen(PORT,()=>{
    console.log(`mealserver running  at ${PORT} and waiting for client request`);
    
})
mealserver.get('/', (req, res) => {
  res.send('Server Running');
});