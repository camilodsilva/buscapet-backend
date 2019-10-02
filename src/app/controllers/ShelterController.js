import User from '../models/User';
import Shelter from '../models/Shelter';

class ShelterController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const shelters = await Shelter.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id', 'name', 'address', 'email'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(shelters);
  }

  async store(req, res) {
    const { name, address, email } = req.body;

    const checkEmailExists = await Shelter.findOne({
      where: {
        email,
        user_id: req.userId,
      },
    });

    if (checkEmailExists) {
      return res
        .status(401)
        .json({ error: 'Can not register the same email twice' });
    }

    const shelter = await Shelter.create({
      name,
      address,
      email,
      user_id: req.userId,
    });

    return res.json(shelter);
  }

  async update(req, res) {
    const { id } = req.params;
    const { email } = req.body;

    const shelter = await Shelter.findByPk(id);

    if (!shelter) {
      return res.status(400).json({ error: 'Shelter not found' });
    }

    if (shelter.email !== email) {
      const checkEmailExists = await Shelter.findOne({
        where: {
          email,
          user_id: req.userId,
        },
      });

      if (checkEmailExists) {
        return res
          .status(401)
          .json({ error: 'Can not register the same email twice' });
      }
    }

    const shelterUpdate = await shelter.update(req.body);

    return res.json(shelterUpdate);
  }

  async delete(req, res) {
    const { id } = req.params;

    const shelter = await Shelter.findByPk(id);

    if (!shelter) {
      return res.status(400).json({ error: 'Shelter not found' });
    }

    return res.json(shelter);
  }
}

export default new ShelterController();
