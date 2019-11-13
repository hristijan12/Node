const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://dev:@cluster0-or99i.mongodb.net/employees?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true} )
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });

    const Employee = mongoose.model(
        'employee',
        new mongoose.Schema({
        first_name : String,
        last_name: String,
        job_title: String,
        salary: Number,
        email: String,
        hire_date: Date,
        birthday: Date,
       
        },
        {
            collection: "employees",
        })
    );


    var s = new Employee ({
        first_name : "Daniel",
        last_name: "Faviet",
        job_title: "Sales Analyst",
        salary: "44000",
        email: "daniel.faviet@adde.com",
        hire_date: new Date ("2013-03-06T13:03:00Z"),
        birthday: new Date ("1990-10-15T05:50:00Z")

    })

    s.save(err =>{
        if(err){
            console.log('could not save');
            return;
        }
        console.log('save successfull')
    });