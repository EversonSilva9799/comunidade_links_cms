import Response from './../../models/Response';
import User from './../../models/user/User';

class AuthController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json(new Response(400, 'credencias incorretas', null));
      }

      if (!(await user.checkPassword(password))) {
        return res
          .status(400)
          .json(new Response(400, 'credencias incorretas', null));
      }

      const token = User.generateToken(user);

      return res.status(200).json(new Response(200, 'sucesso', { token }));
    } catch (err) {
      return res.status(500).json(new Response(500, 'erro', null));
    }
  }
}

export default new AuthController();
