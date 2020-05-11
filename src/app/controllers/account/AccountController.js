const User = require('../../models/user/User');
const Response = require('../../models/Response');
const crypto = require('crypto');
const Mail = require('../../../lib/Mail');

class AccountController {
  async get(req, res) {
    try {
      const { code } = req.params;

      const user = await User.findOne({ codeActiveAccount: code }).select(
        '-password'
      );

      if (!user) {
        return res
          .status(404)
          .json(new Response(404, 'Usuário não encontrado', null));
      }

      if (user.activated) {
        return res
          .status(400)
          .json(new Response(400, 'A conta já está ativada', null));
      }
      user.activated = true;
      await user.save();

      return res
        .status(200)
        .json(new Response(200, 'Conta ativada com sucesso'));
    } catch (err) {
      return res.status(500).json(new Response(500, 'Erro Interno', null));
    }
  }

  async post(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json(
          new Response(404, 'E-mail não encontrado na base de dados', null)
        );
    }

    let code = crypto.randomBytes(30).toString('hex');

    user.codeManageAccount = code;
    await user.save();

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Comunidade Link - Renovar senha',
      html: `<h2>Clique no link para escolher uma nova senha</h2>
        <p>
          <a href="http://localhost:3000/api/contas/senhas/${code}">Recuperar Senha</a>
        </p>`,
    });

    return res
      .status(201)
      .json(
        new Response(
          201,
          'Te enviamos um email para você recuperar a senha',
          code
        )
      );
  }

  async updatePass(req, res) {
    const { code } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ codeManageAccount: code });
    if (!user) {
      return res
        .status(404)
        .json(new Response(404, 'Código desconhecido', null));
    }

    user.password = password;
    user.codeManageAccount = '';
    user.save();

    return res
      .status(200)
      .json(new Response(200, 'Senha editada com sucesso', null));
  }
}

module.exports = new AccountController();
