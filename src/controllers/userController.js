const User = require('../models/userModel');
const { use } = require('../routes/userRoutes');


class userController {
    //index
    async index(req, res){
        try{
            const users = await User.findAll({ attributes: ['id', 'name' ,'email',] })
            return res.json(users)
        }catch(e){
            return res.status(400).json({
                erros: e.errors.map((err) => err.message),
            });
        }
    }
    //STore
    async store(req, res){
        try {
            const newUser = await User.create(req.body);
            return res.json(newUser)
        }catch (e) {
            return res.status(400).json({
                erros: e.errors.map((err) => err.message),
            });
        }
    }
    //show
    async show(req, res){
        try{
            const id_ = req.params.id
            if(!id_) {
                return res.status(400).json({
                    errors: ['Faltando Id']
                })
            }

            if(!Number(id_)){
                return res.status(400).json({
                    errors: ['Id inválido']
                });
            }

            const user = await User.findByPk(id_, {
                attributes: ["id", "name", "email"]
            });

            if(!user){
                return res.status(400).json({
                    erros: ['Usuario não existe']
                });
            }

            return res.json(user);
        }catch(e){
            return res.status(400).json({
                erros: e.errors.map((err) => err.message)
            });
            
        }
    }

    //delete
    async delete(req, res){
        try{
            const id_ = req.params.id
            if(!id_) {
                return res.status(400).json({
                    errors: ['Faltando Id']
                })
            }

            if(!Number(id_)){
                return res.status(400).json({
                    errors: ['Id inválido']
                });
            }

            const user = await User.findByPk(id_, {
                attributes: ["id", "name", "email"]
            });

            if(!user){
                return res.status(400).json({
                    erros: ['Usuario não existe']
                });
            }

            await user.destroy();

            return res.json("Apagado");
        }catch(e){
            return res.status(400).json({
                erros: e.errors.map((err) => err.message)
            });   
        }
    }


    //update
    async update(req, res){
        try{
            const id_ = req.params.id
            if(!id_) {
                return res.status(400).json({
                    errors: ['Faltando Id']
                })
            }

            if(!Number(id_)){
                return res.status(400).json({
                    errors: ['Id inválido']
                });
            }

            const user = await User.findByPk(id_);

            if(!user){
                return res.status(400).json({
                    erros: ['Usuario não existe']
                });
            }

            const newDates = await user.update(req.body);

            return res.json(newDates)

            return res.json("Apagado");
        }catch(e){
            return res.status(400).json({
                erros: e.errors.map((err) => err.message)
            });   
        }
    }

}

module.exports = new userController();