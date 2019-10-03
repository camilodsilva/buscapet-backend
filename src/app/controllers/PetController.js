import Pet from '../models/Pet';
import Shelter from '../models/Shelter';
import User from '../models/User';
import File from '../models/File';

/**
 * todo:
 * [ ] pet avatar
 */
class PetController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { shelter_id } = req.body;

    const pets = await Pet.findAll({
      where: {
        shelter_id,
      },
      attributes: ['id', 'name', 'age', 'family', 'breed'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Shelter,
          as: 'shelter',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['name', 'email'],
            },
          ],
        },
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(pets);
  }

  async store(req, res) {
    const { shelter_id } = req.body;

    const checkShelterExists = await Shelter.findByPk(shelter_id);

    if (!checkShelterExists) {
      return res.status(400).json({ error: 'Shelter not found' });
    }

    const pet = await Pet.create(req.body);

    return res.json(pet);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, age, family, breed, shelter_id, avatar_id } = req.body;

    const pet = await Pet.findByPk(id);

    if (!pet) {
      return res.status(400).json({ error: 'Pet not found' });
    }

    const checkShelterExists = await Shelter.findByPk(shelter_id);

    if (!checkShelterExists) {
      return res.status(400).json({ error: 'Shelter not found' });
    }

    const petUpdate = await pet.update({
      name,
      age,
      family,
      breed,
      shelter_id,
      avatar_id,
    });

    return res.json(petUpdate);
  }

  async delete(req, res) {
    const { id } = req.params;

    const pet = await Pet.findByPk(id);

    if (!pet) {
      return res.status(400).json({ error: 'Pet not found' });
    }

    await pet.destroy();

    return res.json(pet);
  }
}

export default new PetController();
