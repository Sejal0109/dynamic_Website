const mongoose = require("mongoose");

//creating a database
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://0.0.0.0:27017/sejal_db", {
    
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> {
    console.log("connection successful");
}).catch((err)=>{
    console.log("galatttt--------------------------------------------------");
    console.log(err);
})

