

exports.homeRoutes = (req, res) =>{
    res.render('index');
}

exports.company_form = (req, res) =>{
    res.render('company_form');
}

exports.employee_form = (req, res) =>{
    res.render('employee_form');
}

exports.company_signin = (req, res) =>{
    res.render('company_signin');
}

exports.employee_signin = (req, res) =>{
    res.render('employee_signin');
}

