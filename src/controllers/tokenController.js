const Users = require('../models/userModel');
const jwt =  require('jsonwebtoken');
const { use } = require('../routes/tokenRoutes');

class tokenController {
    async store(req, res) {
        try{

            const { email = '', password = ''} = req.body;
        
            if(!email || !password){
                return res.status(401).json({
                    errors: ['Credencias inválidos']
                });
            }

            const user = await Users.findOne({ where: {email}});

            if(!user){
                return res.status(401).json({
                    errors: ['Credencias do usuario nâo existe']
                })
            }

            const password_hash = user.password_hash

            if(!(await Users.prototype.passwordIsValid(password, password_hash))) {
                return res.send('senha ivalida')
            }

            const { id } = user;

            const token = jwt.sign({id, email}, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPERATION })
            
            res.json({token, user:{ name: user.name, id, email}});


        }catch(e){
           return console.log(e)
        }
    }
}


module.exports = new tokenController();