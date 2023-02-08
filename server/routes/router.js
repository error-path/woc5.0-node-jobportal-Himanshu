const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller_employee = require('../controller/controller_employee');
const controller_company = require('../controller/controller_company');
var Userdb_1 = require('../model/model_company');
var Userdb_2 = require('../model/model_employee');

route.get('/', services.homeRoutes);

route.get('/company_form', services.company_form);

route.get('/employee_form', services.employee_form);

route.get('/company_signin', services.company_signin);

route.get('/employee_signin', services.employee_signin);


// API for employee
// route.post('/employee_form/api/users', controller_employee.create_employee);
route.post('/employee_form/api/users', async (req, res) => {

    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    try {

        // new user
        const user = new Userdb_2({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            cpassword: req.body.cpassword,
            batch: req.body.batch,
            cpi: req.body.cpi,
            age: req.body.age,
            techstack: req.body.techstack,
            gender: req.body.gender
        })

        // save user in the database
        user
            .save(user)



        const comp_data = await Userdb_1.find( // used as array in eligible_companies.ejs
            {
                "$and": [
                    { req_cpi: { $lte: user.cpi } }
                ]
            })
        
        res.status(201).render("eligible_companies", {comp_data: comp_data ,user_id:usermail._id});


    }


    catch (error) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a create operation"
        });
    }


})


// route.get('/employee_form/api/users', controller_employee.find_employee);

route.get('/employee_signin/api/users/update_employee/:id', async(req, res)=>{

    const id = req.params.id;

    // const data = Userdb_2.findById(id);
    Userdb_2.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                // res.send(data)
                res.status(201).render("update_employee", {user_data: data });
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })

})

route.get('/employee_form/api/users/delete_employee/:id', (req, res) => {

    const id = req.params.id;
    

    Userdb_2.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                
                res.status(200).redirect('/');

            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });

})

route.get('/employee_signin/api/users/delete_employee/:id', (req, res) => {

    const id = req.params.id;
    

    Userdb_2.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                
                res.status(200).redirect('/');

            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });

})


// API for company
route.post('/company_form/api/users', async (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    try{

        // new user
        const user = new Userdb_1({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            cpassword : req.body.cpassword,
            req_cpi : req.body.cpi,
            req_age : req.body.age,
            website : req.body.website,
            position : req.body.position,
            package : req.body.package,
            description : req.body.description,
        })
    
        // save user in the database
        user
            .save(user)
            
                
                const user_data = await Userdb_2.find( // used as array in eligible_employee.ejs
                    {
                        "$and": [
                            { cpi: { $gte: user.req_cpi } }
                        ]
                    })
                
                res.status(201).render("eligible_employee", { user_data: user_data ,comp_id:usermail._id});
            
    }

    catch (error){
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        };
})



// route.get('/company_form/api/users', controller_company.find_company);
route.get('/company_signin/api/users/update_company/:id', async(req, res)=>{

    if(req.params.id){
        const id = req.params.id;

        Userdb_1.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.status(201).render("update_company",{comp_data:data});
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb_1.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }


})


route.post("/company_signin/api/users/update_company/:id", async(req,res)=>{
    
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    try{
        const id = req.params.id;
        // const updates = req.body; 
        Userdb_1.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        
        
        
        const user_data = await Userdb_2.find( // used as array in eligible_employee.ejs
        {
            "$and": [
                { cpi: { $gte: req.body.req_cpi } }
            ]
        })
        
        res.status(201).render("eligible_employee", { user_data: user_data ,comp_id:req.params.id});
        
    }
            
    


        catch(error){
            res.status(500).send({ message : "Error Update user information"})
        }

    
})



route.get('/company_signin/api/users/delete_company/:id', async(req, res)=>{

    const id = req.params.id;

    Userdb_1.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.status(200).redirect('/')
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });

})

route.get('/company_form/api/users/delete_company/:id', async(req, res)=>{

    const id = req.params.id;

    Userdb_1.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.status(200).redirect('/')
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });

})

route.post('/company_signin/api/users', async (req, res) => {

    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    try {
        const email = req.body.email;
        const password = req.body.password;

        const usermail = await Userdb_1.findOne({ email: email });

        if (usermail.password === password) {

            // res.status(201).redirect('/');
            const user_data = await Userdb_2.find( // used as array in eligible_employee.ejs
                {
                    "$and": [
                        { cpi: { $gte: usermail.req_cpi } }
                    ]
                })
            res.status(201).render("eligible_employee", { user_data: user_data ,comp_id:usermail._id});

        }
        else {
            res.send("Password is wrong!!");
        }

    }

    catch (error) {
        res.status(400).send("Invalid Email");
    }
}
);


route.post('/employee_signin/api/users', async (req, res) => {


    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    try {
        const email = req.body.email;
        const password = req.body.password;

        const usermail = await Userdb_2.findOne({ email: email });

        if (usermail.password === password) {

            const comp_data = await Userdb_1.find( // used as array in eligible_companies.ejs
                {
                    "$and": [
                        { req_cpi: { $lte: usermail.cpi } }
                    ]
                })
                // console.log(user_id);
            res.status(201).render("eligible_companies", {comp_data: comp_data ,user_id:usermail._id});

        }

        else {
            res.send("Password is wrong!!");
        }

    }

    catch (error) {
        res.status(400).send("Invalid Email");
    }
}
);




module.exports = route