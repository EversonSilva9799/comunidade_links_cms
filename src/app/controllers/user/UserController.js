const Response = require('./../../models/Response');
const User = require('./../../models/user/User');

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

      const user = await User.create({ name, email, password });

      return res.status(201).json(new Response(201, 'sucesso', user));
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .json(new Response(400, 'Dados incorretos informados', null));
      }
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
