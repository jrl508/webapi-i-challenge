// implement your API here
const express = require('express');

//import methods from db.js
const db = require('./data/db');

const server = express();

// middleware used to parse json during POST
server.use(express.json());

//
server.get ('/', (req,res) => {
    res.send('Hello web 20 node edition')
});

// READ database
server.get('/users', (req,res) => {
    db.find()
        .then( users => {
            res.status(200).json(users);
        })
        .catch(err =>{
            res.status(500).json({ error: "The users information could not be retrieved." })
        });
});

server.get('/users/:id', (req,res) => {
    const { id } = req.params;
    db.findById(id)
        .then( user => {
            if(user){
                res.status(200).json(user);
            } else{
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
        })
        .catch(err =>{
            res.status(500).json(err)
        });
});
// CREATE database object
server.post('/users', (req,res) => {
    const userInfo = req.body;
    
    if(userInfo.name && userInfo.bio){
        db.insert(userInfo)
            .then( user => {
                res.status(201).json(user);
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the user to the database" })
            })
    } else{
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }

})


const port = 5000;
server.listen(port, () => console.log(`running on port ${port}`))