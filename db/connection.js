const mongoose = require('mongoose');

const init = () => {
mongoose.connect('mongodb+srv://dev:aiypwzqp2438@cluster0-or99i.mongodb.net/videoteka?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true} )
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = {init};