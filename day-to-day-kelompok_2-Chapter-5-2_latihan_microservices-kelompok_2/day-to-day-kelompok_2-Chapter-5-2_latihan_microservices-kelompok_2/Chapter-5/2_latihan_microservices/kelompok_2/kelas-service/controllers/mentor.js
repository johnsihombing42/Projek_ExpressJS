const {mentor, kelas} = require('../models');

module.exports = {
  createMentor : async (req, res,next) => {

    try {
      const { nama, pekerjaan } = req.body;
      const newMentor = await mentor.create({
        nama,
        pekerjaan,
      });
      return res.status(200).json({
        status: true,
        message: "success",
        data: newMentor,
      });
    } catch (error) {
      next(error);
    }
  },

  findMentor : async (req, res,next) => {
    try {
      const { mentorId } = req.params;
      const mentorDetail = await mentor.findOne({
        where: {id: mentorId},
        include:{
          model: kelas,
          as: 'kelas_mentor',
          attributes: ['nama', 'deskripsi', 'mentor_id', 'level']
        }
      });
      if (!mentorDetail) {
        return res.status(404).json({
          status: false,
          message: "failed",
          data: null,
        });
      }
      return res.status(200).json({
        status: true,
        message: "success",
        data: mentorDetail,
      });
    } catch (error) {
      console.log(error);
    }
  },
  findAllMentor : async(req, res,next) => {
    try {
      const allMentor = await mentor.findAll();
      if (allMentor.length < 1) {
        return res.status(404).json({
          status: false,
          message: "failed",
          data: null,
        });
      }
      return res.status(404).json({
        status: true,
        message: "success",
        data: allMentor,
      });
    } catch (error) {
      next(error);
    }
  },
};
