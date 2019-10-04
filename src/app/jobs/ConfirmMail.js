import Mail from '../../lib/Mail';

class ConfirmMail {
  get key() {
    return 'ConfirmEmail';
  }

  async handle({ data }) {
    const { user } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Confirmação de Cadastro',
      template: 'confirm',
      context: {
        name: user.name,
        email: user.email,
      },
    });
  }
}

export default new ConfirmMail();
