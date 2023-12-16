const Aluno = require('../models/alunoModel');

class alunoController {
    async index(req, res) {
        try{
            const list = await Aluno.findAll({
                attributes: ["id", "nome", "sobrenome", "email", "idade"]
            })
            return res.json(list)
        }catch(e){
            console.log(e)
        }
    }

    async store (req, res) {
        try{
            const aluno = await Aluno.create(req.body);
            return res.json(aluno);
        }catch(e) {
            return res.status(400).json({
                erros: e.errors.map((err) => err.message),
              });
        }
    }

    async show(req, res) {
        try{
            const id = req.params.id
            if(!id) {
                return res.status(400).json({
                    errors: ['Faltando Id']
                })
            }

            if(!Number(id)){
                return res.status(400).json({
                    errors: ['Id inválido']
                });
            }
            
            const aluno = await Aluno.findByPk(id, {
                attributes: ["id", "nome", "sobrenome", "email", "idade"]
            });

            if(!aluno){
                return res.status(400).json({
                    erros: ['Aluno não existe']
                });
            }

            return res.json(aluno);


        } catch(e){
            return res.status(400).json({
                erros: e.errors.map((err) => err.message),
            });
        }

    }

    async update (req, res) {
        try{
            const id = req.params.id
            if(!id) {
                return res.status(400).json({
                    errors: ['Faltando Id']
                })
            }

            if(!Number(id)){
                return res.status(400).json({
                    errors: ['Id inválido']
                });
            }
            
            const aluno = await Aluno.findByPk(id);



            if(!aluno){
                return res.status(400).json({
                    errors: ['Aluno não existe']
                })
            }

            const alunoAtualizado = await aluno.update(req.body);

            return res.json(alunoAtualizado)
        }catch(e){
            console.log(e)
        }
    }


    async delete (req, res) {
        try{
            const id = req.params.id
            if(!id) {
                return res.status(400).json({
                    errors: ['Faltando Id']
                })
            }

            if(!Number(id)){
                return res.status(400).json({
                    errors: ['Id inválido']
                });
            }

            const aluno = await Aluno.findByPk(id);

            if(!aluno){
                return res.status(400).json({
                    errors: ['Aluno não existe']
                })
            }

            await aluno.destroy()

            return res.json('Conta apagada')
        }catch(e){
            return res.status(400).json({
                erros: e.errors.map((err) => err.message),
            });
        }
    }

}
module.exports = new alunoController();