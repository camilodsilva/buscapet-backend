import User from '../models/User';

class UserController {
  async store(req, res) {
    const { email } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return res
        .status(401)
        .json({ error: 'Can not register the same email twice' });
    }

    const { id, name } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res
          .status(401)
          .json({ error: 'Can not register the same email twice' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
