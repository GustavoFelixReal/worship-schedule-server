import User from "../models/User";

export default {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    try {
      const { name, userName, email, password, churchId } = req.body;

      const user = await User.create({
        name,
        userName,
        email,
        password,
        churchId,
      });

      return res.json(user);
    } catch {
      return res
        .status(406)
        .json({ error: "Erro ao inserir na base de dados" });
    }
  },

  async find(req, res) {
    try {
      const { churchId, userId } = req.params;

      const user = await User.findByPk(userId, { where: { churchId: churchId, userId: userId } });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado"});
      }

      return res.json({ user: user });
    } catch {
      return res
        .status(406)
        .json({ error: "Erro ao procurar usuário na base de dados" });
    }
  },
};
