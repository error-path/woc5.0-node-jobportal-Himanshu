var Userdb = require('../model/model_employee');
// var Userdb_1 = require('../model/model_company');
// const axios = require('axios');

// retrieve and return all users/ retrive and return a single user
// exports.find_employee = (req, res)=>{

//     if(req.query.id){
//         const id = req.query.id;

//         Userdb.findById(id)
//             .then(data =>{
//                 if(!data){
//                     res.status(404).send({ message : "Not found user with id "+ id})
//                 }else{
//                     res.send(data)
//                 }
//             })
//             .catch(err =>{
//                 res.status(500).send({ message: "Erro retrieving user with id " + id})
//             })

//     }else{
//         Userdb.find()
//             .then(user => {
//                 res.send(user)
//             })
//             .catch(err => {
//                 res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
//             })
//     }

// }

// Update a new idetified user by user id
// exports.update_employee = (req, res)=>{

//     if(!req.body){
//         return res
//             .status(400)
//             .send({ message : "Data to update can not be empty"})
//     }

//     const id = req.params.id;
//     Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
//         .then(data => {
//             if(!data){
//                 res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
//             }else{
//                 res.send(data)
//             }
//         })
//         .catch(err =>{
//             res.status(500).send({ message : "Error Update user information"})
//         })

// }




