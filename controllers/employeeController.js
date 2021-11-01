const Employee = require('../models/Employee');
var cors = require('cors');
class EmployeesController {

    getAll(req, res, next) {
        Employee.find().exec((err, response) => {
            if (err) return next(err);
            res.send({'message':response ,'status':200});
        })
        
    }

    post(req, res, next) {
        let body = (req.body);
        let post = new Employee(body);
        console.log(post);
        post.save((err, response) => {
            if (err) return next(err);
            console.log(response);
            res.send({'message':response ,'status':200});
        });
    }

    put(req, res, next) {
        let { id } = req.params;
        let body = req.body;
        Employee.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    delete(req, res, next) {
        let { id } = req.params;
        Employee.findByIdAndDelete({ _id: id }, (err, response) => {
            console.log(response);
            if (err) return next(err);
            res.send({'message':response ,'status':200});
        })
    }
    search(req,res,next){
        var regex = new RegExp(req.params.firstname,'i');
        Employee.find({firstname:regex}).exec((err, response) => {
            if (err) return next(err);
            res.send({'message':response ,'status':200});
            }   )    
        }
}

const employeesController = new EmployeesController();
module.exports = employeesController;