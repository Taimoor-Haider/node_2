const startupDebugger=require("debug")('app:startup');
const dbDebugger=require("debug")("app:db");
const express=require("express");
const Joi=require("joi");
const dotenv=require("dotenv");
const logger=require("./middleware/logger");
const auth=require("./middleware/authentication");
const morgan=require("morgan");
const courses=require("./routes/courses");
const home=require("./routes/home");
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))

dotenv.config()
app.use(logger);
app.use(auth);

app.use("/", home);
app.use('/api/courses',courses)

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('tiny'));
    startupDebugger("Development");
}

const port=process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`App is running on the port ${port}`)
})