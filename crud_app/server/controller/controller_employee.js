var Userdb = require('../model/model_employee');
// const axios = require('axios');

// create and save new user
exports.create_employee = (req,res)=>{

    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : req.body.password,
        cpassword : req.body.cpassword,
        batch : req.body.batch,
        cpi : req.body.cpi,
        age : req.body.age,
        techstack : req.body.techstack,
        gender : req.body.gender
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            res.send(data)
            // res.redirect('/add-user');
            
            // axios.get('http://localhost:3000/employee_form/api/users')
            // .then(function(response){
            //     console.log(response.data);
            //     res.render('show_employee', { users : response.data });
            // })
            // .catch(err =>{
            //     res.send(err);
            // })
            
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find_employee = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

}

// Update a new idetified user by user id
exports.update_employee = (req, res)=>{

    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })

}

// Delete a user with specified user id in the request
exports.delete_employee = (req, res)=>{

    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });

}


