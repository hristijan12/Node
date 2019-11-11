const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://dev:aiypwzqp2438@cluster0-or99i.mongodb.net/school?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true} )
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });

    const Student = mongoose.model(
        'student',
        new mongoose.Schema({
        first_name : String,
        last_name: String,
        average_grade: String,
        courses: Array,
        email: String,
        birthday: Date
       
        },
        {
            collection: "students",
        })
    );


    var s = new Student ({
        first_name : "Trajko",
        last_name: "Trajkovski",
        average_grade: "4.2",
        courses: ["biology, sport"],
        email: "trajko.trajkovski@asdsa.com",
        birthday: new Date ("1998-06-06T12:50:00Z")

    })

    s.save(err =>{
        if(err){
            console.log('could not save');
            return;
        }
        console.log('save successfull')
    });