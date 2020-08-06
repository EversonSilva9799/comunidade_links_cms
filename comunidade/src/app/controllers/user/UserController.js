const Response = require('./../../models/Response');
const User = require('./../../models/user/User');
const crypto = require('crypto');
const Mail = require('../../../lib/Mail');

class UserController {
  async index(req, res) {
    try {
      const users = await User.find().select('-password');

      return res.status(200).json(new Response(200, 'sucesso', users));
    } catch (err) {
      return res.status(500).json(new Response(500, 'erro', null));
    }
  }

  async store(req, res) {
    try {
      const { name, email, password } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res
          .status(400)
          .json(new Response(400, 'email já está sendo utilizado', null));
      }

      let code = crypto.randomBytes(30).toString('hex');

      const user = await User.create({
        name,
        email,
        password,
        codeActiveAccount: code,
      });

      await Mail.sendMail({
        to: `${user.name} <${user.email}>`,
        subject: 'Comunidade Links - Ativação de conta',
        html: `<h2>Clique no link para ativar sua conta</h2>
        <p>
          <a href="http://localhost:3000/api/contas/ativar/${code}">ATIVAR</a>
        </p>`,
      });

      return res
        .status(201)
        .json(
          new Response(201, 'Acesse seu email para ativar saua conta', null)
        );
    } catch (err) {
      return res
        .status(400)
        .json(new Response(400, 'Dados incorretos informados', err.message));
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const programmerDeleted = await User.deleteOne({ _id: id });

      if (programmerDeleted.deletedCount === 0) {
        return res
          .status(404)
          .json(new Response(404, 'recurso não encontrado', null));
      }

      return res.status(200).json(new Response(200, 'sucesso', null));
    } catch (err) {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .json(new Response(400, 'identificador inválido', null));
      }
      return res.status(500).json(new Response(500, 'erro', null));
    }
  }
}

module.exports = new UserController();
