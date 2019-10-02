import * as Yup from 'yup';

class PetValidation {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      age: Yup.number().integer(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (validationExcepion) {
      const errors = validationExcepion.errors.map(e => e);

      return res
        .status(400)
        .json({ error: 'Validation fails', messages: errors });
    }
  }

  async update(req, res, next) {
    const schema = Yup.object().shape({
      age: Yup.number().integer(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (validationExcepion) {
      const errors = validationExcepion.errors.map(e => e);

      return res
        .status(400)
        .json({ error: 'Validation fails', messages: errors });
    }
  }
}

export default new PetValidation();
