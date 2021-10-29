import Church from "../models/Church";

export default {
  async index(req, res) {
    const churches = await Church.findAll();

    return res.json(churches);
  },

  async store(req, res) {
    try {
      const { name } = req.body;

      const church = await Church.create({ name });

      return res.json(church);
    } catch (error) {
      return res.status(406).json({ error: "Erro ao inserir na base de dados" });
    }
  },
};
