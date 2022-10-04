const { User } = require("../models");
const adapter = require("../external/apiadapter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SIGNATURE_KEY, USER_SERVICE_HOST } = process.env;
const api = adapter(USER_SERVICE_HOST);

module.exports = {
  register: async (req, res, next) => {
    try {
      const { nama, email, password, pekerjaan } = req.body;

      const existUser = await User.findOne({ where: { email: email } });
      if (existUser) {
        return res.status(409).json({
          status: false,
          message: "email already used!",
        });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        nama: nama,
        email: email,
        password: encryptedPassword,
        pekerjaan: pekerjaan,
      });

      return res.status(201).json({
        status: false,
        message: "success",
        data: {
          nama: user.nama,
          email: user.email,
          pekerjaan: user.pekerjaan,
        },
      });
    } catch (err) {
      if (err.code == "ECONNREFUSED") {
        err = new Error("service anvailable!");
        return next(err);
      }

      if (err.response) {
        const { status, data } = err.response;
        res.status(status).json(data);
      }

      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "email or password doesn't match!",
        });
      }
      const correct = await bcrypt.compare(password, user.password);
      if (!correct) {
        return res.status(400).json({
          status: false,
          message: "email or password doesn't match!",
        });
      }
      // generate token
      payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(payload, JWT_SIGNATURE_KEY);
      return res.status(200).json({
        status: "true",
        message: "success",
        data: {
          token: token,
        },
      });
    } catch (err) {
      if (err.code == "ECONNREFUSED") {
        err = new Error("service anvailable!");
        return next(err);
      }

      if (err.response) {
        const { status, data } = err.response;
        res.status(status).json(data);
      }

      next(err);
    }
  },
  readAllData: async (req, res) => {
    try {
      const userData = req.user;
      const user = await User.findAll();
      return res.status(200).json({
        status: "success",
        mesage: "Read all data success",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },
  readDetailUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findOne({
        where: { id: userId },
      });
      return res.status(200).json({
        status: "success",
        mesage: "Read Data",
        data: user,
      });
    } catch (error) {
      res.json(error).status(422);
    }
  },

  //ini aman
  registKelas: async (req, res, next) => {
    try {
      const { nama, deskripsi, mentor_id, level } = req.body;
      const { data } = await api.post("/kelas/regis", {
        nama,
        deskripsi,
        mentor_id,
        level,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: data.data,
      });
    } catch (err) {
      if (err.code == "ECONNREFUSED") {
        err = new Error("service anvailable!");
        return next(err);
      }

      if (err.response) {
        const { status, data } = err.response;
        res.status(status).json(data);
      }

      next(err);
    }
  },
  getKelas: async (req, res, next) => {
    try {
      const { data } = await api.get("/kelas");

      return res.status(201).json({
        status: true,
        message: "success",
        data: data.data,
      });
    } catch (err) {
      if (err.code == "ECONNREFUSED") {
        err = new Error("service anvailable!");
        return next(err);
      }

      if (err.response) {
        const { status, data } = err.response;
        res.status(status).json(data);
      }

      next(err);
    }
  },

  //ini aman
  getKelasById: async (req, res, next) => {
    try {
      const { mentorId } = req.params;
      const { data } = await api.get(`kelas/${mentorId}`);

      return res.status(201).json({
        status: true,
        message: "success",
        data: data.data,
      });
    } catch (err) {
      if (err.code == "ECONNREFUSED") {
        err = new Error("service anvailable!");
        return next(err);
      }

      if (err.response) {
        const { status, data } = err.response;
        res.status(status).json(data);
      }

      next(err);
    }
  },
  //ini aman
  registMentor: async (req, res, next) => {
    try {
      const { nama, pekerjaan } = req.body;
      const { data } = await api.post("/mentor", {
        nama,
        pekerjaan,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: data.data,
      });
    } catch (err) {
      if (err.code == "ECONNREFUSED") {
        err = new Error("service anvailable!");
        return next(err);
      }

      if (err.response) {
        const { status, data } = err.response;
        res.status(status).json(data);
      }

      next(err);
    }
  },
  //ini aman
  getMentor: async (req, res, next) => {
    try {
      const { data } = await api.get("/mentor");

      return res.status(201).json({
        status: true,
        message: "success",
        data: data.data,
      });
    } catch (err) {
      if (err.code == "ECONNREFUSED") {
        err = new Error("service anvailable!");
        return next(err);
      }

      if (err.response) {
        const { status, data } = err.response;
        res.status(status).json(data);
      }

      next(err);
    }
  },

  //ini aman
  getMentorById: async (req, res, next) => {
    try {
      const { mentorId } = req.params;
      const { data } = await api.get(`mentor/${mentorId}`);

      return res.status(201).json({
        status: true,
        message: "success",
        data: data.data,
      });
    } catch (err) {
      if (err.code == "ECONNREFUSED") {
        err = new Error("service anvailable!");
        return next(err);
      }

      if (err.response) {
        const { status, data } = err.response;
        res.status(status).json(data);
      }

      next(err);
    }
  },
  registKelasUser: async (req, res, next) => {
    try {
      const { user_id, kelas_id } = req.body;
      const { data } = await api.post("/kelasuser/create", {
        user_id,
        kelas_id,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: data.data,
      });
    } catch (err) {
      if (err.code == "ECONNREFUSED") {
        err = new Error("service anvailable!");
        return next(err);
      }

      if (err.response) {
        const { status, data } = err.response;
        res.status(status).json(data);
      }

      next(err);
    }
  },

  getKelasUser: async (req, res, next) => {
    try {
      const { data } = await api.get("/kelasuser/getall");

      return res.status(201).json({
        status: true,
        message: "success",
        data: data.data,
      });
    } catch (err) {
      if (err.code == "ECONNREFUSED") {
        err = new Error("service anvailable!");
        return next(err);
      }

      if (err.response) {
        const { status, data } = err.response;
        res.status(status).json(data);
      }

      next(err);
    }
  },
  getKelasUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data } = await api.get(`kelasuser/getdetail/${id}`);

      return res.status(201).json({
        status: true,
        message: "success",
        data: data.data,
      });
    } catch (err) {
      if (err.code == "ECONNREFUSED") {
        err = new Error("service anvailable!");
        return next(err);
      }

      if (err.response) {
        const { status, data } = err.response;
        res.status(status).json(data);
      }

      next(err);
    }
  },
};
