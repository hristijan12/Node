const mUsers = require('../models/users')
const vUsers = require('../validators/users')
const validator = require('node-input-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const config = require('../config/index.js')
const randomstring = require('randomstring');



const register = (req, res) => {
    var v = new validator.Validator(req.body, vUsers.createUser)
    v.check()
    .then(matched => {
        if(matched) {
            bcrypt.genSalt(10, function(err, salt) {
                if(err){
                    throw new Error (err);
                    return;
                }    
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    if(err){
                        throw new Error(err);
                        return;
                    }
                    var confirm_hash = randomstring.generate({
                        length: 30,
                        charset: 'alphanumeric'
                    });
                    return mUsers.createUser({
                        ...req.body, 
                        password: hash,
                        confirm_hash: confirm_hash,
                        confirmed: false
                    });
                    // Store hash in your password DB.
                });
            });

            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(config.getConfig('mailer').key);
            const msg = {
                to: req.body.email,
                from: 'hristijan.taseski@yahoo.com',
                subject: 'thanks for registering',
                text: 'thanks for registering',
                html: `<a href="http://localhost:8001/api/v1/confirm/${confirm_hash}">Thanks for registering</a>`
            };
            sgMail.sned(msg);
            return;
    } else {
        throw new Error('Validation failed')
    }
})
    .then(() => {
        return res.status(201).send('user created')
        
    })
    .catch(err => {
        console.log(err)
        return res.status(500).send(v.errors)
    });
}
const login = (req, res) => {
    mUsers.getUserPasswordByEmail(req.body.email)
    .then((data) => {
        bcrypt.compare(req.body.password, data.password, function(err, rez) {
            if(err){
                return res.status(500).send('could not compare password');
            }
            if(rez){
                // return res.status(200).send('ok');
                var tokenData = {
                    id: data._id,
                    full_name: `${data.first_name} ${data.last_name}`,
                    email: data.email
                };
                var token = jwt.sign(tokenData, config.getConfig('jwt').key);
                return res.status(200).send({jwt: token});
            }
            return res.status(404).send('not found');
        });
    })

const confirm = (req, res) => {
    var hash = req.params.confirm_hash;
    mUsers
    return res.status(200).send('ok');
 
}
const renew = (req, res) => {
    return res.status(200).send(req.user)
}
const resetLink = (req, res) => {
    return res.status(200).send('ok')
}
const resetPassword = (req, res) => {
    return res.status(200).send('ok')
}   
const changePassword = (req, res) => {
    return res.status(200).send('ok')
}   

module.exports = {
    register,
    login,
    renew,
    resetLink,
    resetPassword,
    changePassword,
    confirm
    
}