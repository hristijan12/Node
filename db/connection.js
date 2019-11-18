const mongoose = require('mongoose');
const uri = 'mongodb+srv://{username}:{password}@{host}/{dbname}?retryWrites=true&w=majority'

const init = () => {
mongoose.connect(parseCString(config), {useNewUrlParser: true, useUnifiedTopology: true} )
    .then(res => {
        // console.log(res);
    })
    .catch(err => {
        console.log(err);
    });
}

const parseCString = (config) => {
    var cs = uri.replace('{username}', config.username);
    cs = uri.replace('{password}', config.username);
    cs = uri.replace('{host}', config.username);
    cs = uri.replace('{dbname}', config.username);
    return cs;
}
module.exports = {init};