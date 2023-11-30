const express = require('express');
const app = express();
const port = 8081;

app.use(express.json());

const knex = require('knex')(require('./knexfile.js')["development"])

const cors = require("cors");
const { add } = require('lodash');
const allowedOrigins = ["http://localhost:3000","http://localhost:8081", "http://localhost:3001"];

    app.use(
        cors({
            origin: function(origin, callback) {
                if (!origin) return callback(null, true);
                if (allowedOrigins.indexOf(origin) === -1) {
                    var msg =
                        "The CORS policy for this site does not " +
                        "allow access from the specified Origin.";
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            }
        })
    ); 


app.listen(port, ()=>{
    console.log(`Your Knex and Express application are running successfully on port ${port}`);
})

app.get('/', (req, res) =>{
    res.send(`Application up and running on port ${port}`)
})


app.get('/todo', (req, res) =>{
    knex('todo')
        .select('*')
        .orderBy('todo_ID', 'desc')
        .then(data => {
            res.status(200).json(data);
        })
})

//Add Method (Create)

app.post('/todo', async(req, res) =>{
    const maxIdQuery = await knex('todo').max('todo_ID as maxId').first()

    await knex('todo').insert({
        todo_ID: maxIdQuery.maxId + 1,
        task: req.body.task
    })
    .then(()=>{
        knex('todo')
        .select('*')
        .then(data => {
            res.json(data);
        })
    })
})

//Delete Method (Delete)

app.delete('/todo/:id', function(req,res){
    knex('todo').where('todo_ID', req.params.id)
    .del()
    .then(()=>{
        knex('todo')
        .select('*')
        .then(data => {
            res.json(data);
        })
    })
})

//update Method

app.put('/todo/:id', (req,res) =>{
    knex('todo').where('todo_ID', req.params.id)
        .update({
            task: req.body.task
        })
        .then(function(){
            knex('todo')
            .select('*')
            .then(data =>{
                res.json(data);
            })
        })
})