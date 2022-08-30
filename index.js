const Joi = require('joi');
const express = require('express');
const app = express();


app.use(express.json())





const courses = [
   {id:1, name:"courses1"},
   {id:2, name:"courses2"},
   {id:3, name:"courses3"},
]

app.get('/', (req,res) =>{
    res.send('Hello world');
})

app.get('/api/courses',(req,res) =>{
    res.send(courses);
})

//Route app/courses
// app.get('/api/posts/:year/:month', (req,res) => {
//     res.send(req.query);
// });


app.get('/api/courses/:id', (req,res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id))
   if(!course) return   res.status(404).send('The course with the given ID was not found...');
   res.send(course);
});



app.post('/api/courses', (req,res) => {
    const { error } = validateCourses(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    if (result.error){
        //400Bad Request
        res.status(404).send(result.error.details[0].message)
        return;
    }

    const course = {
        id:courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id',(rq,res) => {
    const courses = courses .find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found...');
    
    const { error } = validateCourses(req.body);
    if(error)   return  res.status(400).send(error.details[0].message);
        

    courses.name= req.body.name;
    res.send(course)
})

app.delete('api/courses/:id', (req,res) =>{
    const courses = courses .find(c => c.id === parseInt(req.params.id));
    if(!course)  return res.status(404).send('The course with the given ID was not found...');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(courses);
});



//PORT 
const port = process.env.PORT || 3000;
app.listen (port, () => console.log(`Listening on port ${port}....`))