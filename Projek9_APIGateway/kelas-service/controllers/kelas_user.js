const {kelas_user, kelas, mentor} = require('../models');

module.exports = {
    create: async (req, res, next) => {
        try {
            const { user_id, kelas_id} = req.body;

            const exist = await kelas_user.findOne({ where: { user_id: user_id } });
            if (exist) {
                return res.status(404).json({
                    status: false,
                    message: `User with id ${user_id} is already take a class`,
                    data: null
                });
            }

            const kelas = await kelas_user.create({
                kelas_id,
                user_id,
            });

            return res.status(201).json({
                status: true,
                message: "success",
                data: kelas
            });

        } catch (err) {
            next(err);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const kelas = await kelas_user.findAll();

            return res.status(200).json({
                status: true,
                message: "success",
                data: kelas
            });
        } catch (err) {
            next(err);
        }
    },
    getDetail: async (req, res, next) => {
        try {
            const { id } = req.params;

            const findKelas = await kelas_user.findOne({
                where: { id: id },
                include: {
                    model: kelas,
                    as: 'kelas',
                    attributes: ['nama', 'deskripsi', 'mentor_id', 'level']
                }
            });
            if (!findKelas) {
                return res.status(404).json({
                    status: false,
                    message: `Kelas with id ${id} is doesn't exist`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: "success",
                data: findKelas
            });

        } catch (err) {
            next(err);
        }
    }
}