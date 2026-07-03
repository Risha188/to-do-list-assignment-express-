const express = require('express');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/", (req,res)=>{
    res.status(200).send("Home Page");
})

app.use("/tasks", tasksRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port number: ${PORT}`);
})
