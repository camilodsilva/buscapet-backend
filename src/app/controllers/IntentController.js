import Pet from '../models/Pet';
import Intent from '../models/Intent';

class IntentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const intents = await Intent.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Pet,
          as: 'pet',
          attributes: ['name', 'age', 'family', 'breed'],
        },
      ],
    });

    return res.json(intents);
  }

  async store(req, res) {
    const { pet_id } = req.body;

    const petExists = await Pet.findByPk(pet_id);

    if (!petExists) {
      return res.status(400).json({ error: 'Pet not found' });
    }

    const intentExists = await Intent.findOne({
      where: {
        pet_id,
        user_id: req.userId,
      },
    });

    if (intentExists) {
      return res
        .status(401)
        .json({ error: 'Intent already belongs to the user and the pet' });
    }

    const intent = await Intent.create({
      user_id: req.userId,
      pet_id,
    });

    return res.json(intent);
  }

  async delete(req, res) {
    const { id } = req.params;

    const intent = await Intent.findByPk(id);

    if (!intent) {
      return res.status(400).json({ error: 'Intent not found' });
    }

    await intent.destroy();

    return res.json(intent);
  }
}

export default new IntentController();
