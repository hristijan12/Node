const randomstring = require('')
const UploadFile = (req, res) => {
    var file = req.files.file;

    if(file.size > 10 * 1024 * 1024){
        return res.status(500).send('filesize too big')
    }
    var allowedTypes = [
    'image/png' , 
    'image/jpg' ,
    'image/jpeg',
    'image/pjpeg',
    'image/gif'
];

if(allowedTypes.indexOf(file.mimetype) == -1) {
    return res.status(500).send('File type not on the list');
}

var prefix = randomstring.generate({
    length: 10,
    charset: 'alphanumeric'
});


    file.mv('./uploads/e', err => {
        if(err){
            console.log(err)
            return res.status(500).send('Internal Server Error');
        }
        return res.status(200).send('ok');
    });
}

module.exports = {
    UploadFile
}

//http://127.0.0.1:8002/api/v1/upload