import * as Yup from 'yup';

class ShelterValidation {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      address: Yup.string().required(),
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
      email: Yup.string()
        .email()
        .required(),
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

export default new ShelterValidation();
