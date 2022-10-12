const { User } = require('../db/models');
const bcrypt = require('bcrypt');
const { response } = require('express');

module.exports = {
    findOne: async (req, res, next) => {
        try {
            const where = {};
            const { id, email } = req.body;
            if (id) {
                where.id = id;
            }
            if (email) {
                where.email = email;
            }

            const user = await User.findOne({ where });
            if (!user) {
                return req.status(400).json({
                    status: false,
                    message: 'not found!',
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password
                }
            });
        } catch (err) {
            next(err);
        }
    },

    create: async (req, res, next) => {
        try {
            const { name, email, password } = req.body;

            const exist = await User.findOne({ where: { email } });
            if (exist) {
                return res.status(400).json({
                    status: false,
                    message: 'email already used!',
                    data: null
                });
            }

            const encrypted = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: encrypted
            });

            return res.status(201).json({
                status: true,
                message: 'success',
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (err) {
            next(err);
        }
    }
};