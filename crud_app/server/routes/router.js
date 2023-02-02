const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller_employee = require('../controller/controller_employee');
const controller_company = require('../controller/controller_company');
var Userdb_1 = require('../model/model_company');
var Userdb_2 = require('../model/model_employee');

route.get('/',services.homeRoutes);

route.get('/company_form',services.company_form);

route.get('/employee_form',services.employee_form);

route.get('/company_signin',services.company_signin);

route.get('/employee_signin',services.employee_signin);


// API for employee
route.post('/employee_form/api/users', controller_employee.create_employee);
route.get('/employee_form/api/users', controller_employee.find_employee);
route.put('/employee_form/api/users/:id', controller_employee.update_employee);
route.delete('/employee_form/api/users/:id', controller_employee.delete_employee);


// API for company
route.post('/company_form/api/users', controller_company.create_company);
route.get('/company_form/api/users', controller_company.find_company);
route.put('/company_form/api/users/:id', controller_company.update_company);
route.delete('/company_form/api/users/:id', controller_company.delete_company);

route.post('/company_signin/api/users', async (req, res)=>{

        if(!req.body){
            return res
                .status(400)
                .send({ message : "Data to update can not be empty"})
        }

        try{
            const email = req.body.email;
            const password = req.body.password;

            const usermail = await Userdb_1.findOne({email:email});
            
            if(usermail.password === password){
                res.status(201).redirect('/');
            }
            else{
                res.send("Password is wrong!!");
            }

        }

        catch(error){
            res.status(400).send("Invalid Email");
        }
    }
);


route.post('/employee_signin/api/users', async (req, res)=>{


    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    try{
        const email = req.body.email;
        const password = req.body.password;

        const usermail = await Userdb_2.findOne({email:email});
        
        if(usermail.password === password){
            
            const comp_data = await Userdb_1.find( // used as array in eligible_companies.ejs
            {
            "$and":[
            {req_cpi:{$lte:usermail.cpi}}
            ]})
            res.status(201).render("eligible_companies",{comp_data:comp_data});

        }
                   
        else{
            res.send("Password is wrong!!");
        }

    }

    catch(error){
        res.status(400).send("Invalid Email");
    }
}
);




module.exports = route