const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://dev:@cluster0-or99i.mongodb.net/school?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true} )
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
        first_name : "James",
        last_name: "Jameson",
        average_grade: "6.5",
        courses: ["chemistry, math"],
        email: "james.jameson@asdsa.com",
        birthday: new Date ("1997-03-06T05:50:00Z")

    })

    s.save(err =>{
        if(err){
            console.log('could not save');
            return;
        }
        console.log('save successfull')
    });