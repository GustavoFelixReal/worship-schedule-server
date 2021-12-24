import User from "../models/User";

import bcrypt from "bcrypt";
import * as Yup from "yup";

export default {
  async index(req, res) {
    try {
      const schema = Yup.object().shape({
        churchId: Yup.number().required(),
      });

      await schema.validate(req.params, { abortEarly: false });
    } catch (err) {
      res.status(406).json(err.errors);
    }

    try {
      const users = await User.findAll({ 
        attributes: { exclude: ['password'] } 
      });

      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  },

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        userName: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6).max(12),
        churchId: Yup.number().required()
      });

      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(406).json(err.errors);
    }

    try {
      const { name, userName, email, password, churchId } = req.body;

      const user = await User.create({
        name,
        userName,
        email,
        password: bcrypt.hash(password, 10),
        churchId,
      });

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  },

  async find(req, res) {
    try {
      const schema = Yup.object().shape({
        churchId: Yup.number().required(),
      });

      await schema.validate(req.params, { abortEarly: false });
    } catch (err) {
      res.status(406).json(err.errors);
    }

    try {
      const { churchId, userId } = req.params;

      const user = await User.findOne({ 
        where: { 
          id: userId,
          churchId: churchId
        }, 
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  },
};
