const express=require('express');
const router=express.Router();

const courses=[
    {
        id:1,
        name:"course1",
        teacher:"Ali"
    },
    {
        id:2,
        name:"course2",
        teacher:"Qasim"
    },
    {
        id:3,
        name:"course3",
        teacher:"Imran"
    }
]


router.get("/", (req, res) => {
    res.json(courses)
})
//Get a sepecific course
router.get("/:year/:month", (req, res) => {
    res.json(req.params);
})
router.get("/:id", (req, res) => {

    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if(!course){
        return res.status(404).json({message:"Course not found"});
    }
    //console.log(typeof(course.id),typeof(req.params.id),typeof(parseInt(req.params.id)))
    res.json(course)
})

router.post("/",(req,res)=>{
    const schema={
        name:Joi.string().min(3).required(),
        teacher:Joi.string().min(3).required()
    }

    const result=Joi.validate(req.body, schema);
    if(result.error){
        return res.status(400).json(result.error.details[0].message);
    }
    const course={
        id:courses.length+1,
        name:req.body.name,
        teacher:req.body.teacher
    }
    courses.push(course);
    res.status(200).json(course)
})
//Update route handler
router.put('/:id',(req, res) => {
    const schema={
        name:Joi.string().min(3).required(),
        teacher:Joi.string().min(3).required()
    }
    const result=Joi.validate(req.body, schema);
    if(result.error){
        return res.status(400).json(result.error.details[0].message);
    }
    let course=courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        return res.status(404).json({"error": "Course not found"});
    }
    course={
        id:course.id,
        name:req.body.name,
        teacher:req.body.teacher
    }
    return res.json(course);
    
})
router.delete("",(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if(!course){
        return res.status(404).json({message:"Course not found"});
    }
    courses.splice(courses.indexOf(course),1);
    res.status(200).json(course)
})



module.exports=router;