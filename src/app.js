const express = require("express");
require("./db/conn");
const hbs = require("hbs")
//const {registerPartials} = require("hbs")
const path = require("path")
const User= require("./models/usermessage")
const app = express();
const port = process.env.port || 3000;

//setting the path
const staticPath= path.join(__dirname,"../public")
//views k jo path define kiya hai use aise set krna hoga taki express ko pata chal ske 
//ki vo kaha se get krna hai
const viewPath= path.join(__dirname,"../templates/views")
const partialPath= path.join(__dirname,"../templates/partials")

//middleware
//ab poora /node_module/boots... likhne k bajaye /css se use krskte
app.use("/css",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use("/js",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use("/jq",express.static(path.join(__dirname,"../node_modules/jquery/dist")));

//? app.post me jab post request kerte using postman..toh voh by default na toh json ko
//? samajhti aur naa hi yeh url encoded wala data samajhti hai..
//? matlab jo bhi ise data bhejoge..ise bydefault samajh nhi aata...
//? isko fix kerne ke lie body-parser package use hoga...yeh package 
//? hamari request ki body ko parse (convert) kerta hai... read kerta hai
//? is body parser ko fir ham app.use se express ke application me use ker skte..
//const bodyParser = require("body-parser");

//kyuki vo JSON file ko nhi smjh payega
app.use(express.urlencoded({extended:false}))

//html css aur bootstrap se static website banate waqt 
//aise uska path lekr use connect krskte hain express k saath aur host krskte
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", viewPath);

//partials set krna k liye registerPartials ek method hai usko use krte
//partials folder me hamlog ne partial codes likhe hain website k components k liye
//ex navbar ..taki poora code likhne k bajaye bs {{>navbar }} use kre
hbs.registerPartials(partialPath);

//routing
//app.get(path, callback)
app.get("/",(req,res)=>{
    //render is used to redirect (ise use krke iss file ko server k response pr show keskte)
    res.render("index");
})
// app.get("/contact",(req,res)=>{
//     res.render("contact");
// })
// app.get("/sejal",(req,res)=>{
//     res.send("Sejal");
// })

app.post("/contact", async(req,res) => {
    try {
        //res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error);
    }
})
//server create
app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
})