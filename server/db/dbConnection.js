const mongoose=require('mongoose')
const CONNECTION_STRING=process.env.connection_string
mongoose.connect(CONNECTION_STRING).then(req=>{
    console.log("Server connection successfull");
    
}).catch(err=>{
    console.log("connection failed",err);
    
})