const adapter = require('../external/apiadapter');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    USER_SERVICE_HOST,
    JWT_SECRET_KEY = 'hahaha'
} = process.env;

const api = adapter(USER_SERVICE_HOST);

module.exports = {
    register: async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            const { data } = await api.post('/create', { name, email, password });

            return res.status(201).json({
                status: true,
                message: 'success',
                data: data.data
            });
        } catch (err) {
            if (err.code == 'ECONNREFUSED') {
                err = new Error('service anvailable!');
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
            const { data } = await api.post('/find', { email });

            const user = data.data;
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                return res.status(400).json({
                    status: false,
                    message: 'wrong password!',
                    data: null
                });
            }

            const token = jwt.sign(user, JWT_SECRET_KEY);
            return res.status(200).json({
                status: true,
                message: 'success',
                data: { token }
            });

        } catch (err) {
            // handle error service unavailable
            if (err.code == 'ECONNREFUSED') {
                err = new Error('service anvailable!');
                return next(err);
            }

            // handle error dari service lain
            if (err.response) {
                const { status, data } = err.response;
                res.status(status).json(data);
            }

            next(err);
        }
    },


    test: async (req, res, next) => {
        try {
            // some process

            // cara 1
            // try {
            //     const { data } = await api.get('/test');

            //     return res.send("lakukan proses A");
            // } catch (err) {
            //     if (err.code == 'ECONNREFUSED') {
            //         err = new Error('service anvailable!');
            //         return next(err);
            //     }

            //     return res.send("lakukan proses B");
            // }

            // cara 2
            api.get('/test')
                .then(data => res.send("lakukan proses A"))
                .catch(err => {
                    if (err.code == 'ECONNREFUSED') {
                        err = new Error('service anvailable!');
                        return next(err);
                    }

                    res.send("lakukan proses B");
                });


            // // some process
        } catch (err) {
            next(err);
        }
    },
};