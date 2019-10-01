import * as Yup from 'yup';

class UserValidation {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
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

  async update(req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
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

export default new UserValidation();
