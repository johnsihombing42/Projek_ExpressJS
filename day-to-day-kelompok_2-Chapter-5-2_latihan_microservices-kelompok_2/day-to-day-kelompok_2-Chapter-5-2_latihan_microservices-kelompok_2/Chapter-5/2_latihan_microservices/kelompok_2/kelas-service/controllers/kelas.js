const { kelas, mentor, kelas_user } = require('../models');

module.exports = {
    kelasCreate: async (req, res, next) => {
        try {
        const { nama, deskripsi, mentor_id, level } = req.body;

        const kelas1 = await kelas.findOne({
            where: {
                mentor_id: mentor_id,
            }
        })
        if (kelas1) {
            return res.status(500).json({
                status: false,
                message: `mentor dengan id ${mentor_id} sudah ada`,
                data: null
            })
        }

        const kelas2 = await kelas.create({
            nama,
            deskripsi,
            mentor_id,
            level
        })

        return res.status(200).json({
            status: true,
            message: 'mentor telah di tambahkan',
            data: {
                nama: kelas2.nama,
                deskripsi: kelas2.deskripsi,
                mentor_id: kelas2.mentor_id,
                level: kelas2.level
            }
        })

    }catch (err) {
        next(err);
    }
    },

    kelasFind: async (req, res, next) => {
        try {
        const { mentorId } = req.params;

        const kelas1 = await kelas.findOne({
            where: { mentor_id: mentorId },
            include: [{
                model: mentor,
                as: 'mentor',
                attributes: ['nama', 'pekerjaan']
            },
            {
                model: kelas_user,
                as: 'kelas_user',
                attributes: ['user_id', 'kelas_id']
            }]
        })
        if (!kelas1) {
            return res.status(404).json({
                status: false,
                message: `mentor dengan id ${mentorId} tidak di temukan!`,
                data: null
            })

        }
        return res.status(200).json({
            status: false,
            message: 'data berhasil di dapatkan!',
            data: kelas1
        })
    }catch (err) {
        next(err);
    }
    },

    kelasAll: async (req, res, next) => {
         
        try { 
            const users = await kelas.findAll();
    
        users.forEach(element => {
        console.log(element.get())
        });
 
 
         return res.status(200).json({
             status: 'success',
             message: 'berhasil dapat data',
             data: users
         })
     }catch (err) {
         next(err);
     }  
    }
}
